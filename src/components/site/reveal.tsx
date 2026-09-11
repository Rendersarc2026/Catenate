"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type RevealProps = React.ComponentProps<"div"> & {
  /** Cascade the children in rather than the block as a whole. */
  stagger?: boolean
  /** Delay between children, in ms. Only applies with `stagger`. */
  step?: number
  /**
   * Skip the default fade-up and only toggle `is-visible`, leaving the
   * entrance to the caller's own CSS. For blocks that animate their parts
   * separately, where a wrapper fade would muddy the choreography.
   */
  bare?: boolean
}

type Entry = { stagger: boolean; step: number; show: () => void }

/*
 * Every Reveal on the page shares one IntersectionObserver. Twenty-odd blocks
 * used to mean twenty-odd observers, each with its own callback and its own
 * set of tracked rects for the browser to keep in step. One observer watching
 * twenty targets is a single intersection pass.
 */
const entries = new WeakMap<Element, Entry>()
let observer: IntersectionObserver | null = null

function shared() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (records) => {
      for (const record of records) {
        if (!record.isIntersecting) continue
        const entry = entries.get(record.target)
        observer?.unobserve(record.target)
        entries.delete(record.target)
        if (!entry) continue

        if (entry.stagger) {
          const children = record.target.children
          for (let i = 0; i < children.length; i++) {
            ;(children[i] as HTMLElement).style.transitionDelay = `${i * entry.step}ms`
          }
        }
        entry.show()
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  )
  return observer
}

/* ------------------------------------------------------------------ *
 * Line splitting
 * ------------------------------------------------------------------ */

/** Headings and body copy are the only things worth masking line by line. */
const SPLIT_SELECTOR = "h1,h2,h3,h4,h5,h6,p"

/** Milliseconds between one line cresting and the next. */
const LINE_STEP = 75
/** Milliseconds between one word and the next — this is the wave itself. */
const WORD_STEP = 38
/*
 * How far the ripple is allowed to travel along a line. Past this the rest of
 * the words crest together, so a long line of body copy does not trail.
 */
const WAVE_REACH = 9
/** Milliseconds between non-text blocks (buttons, imagery) fading in. */
const BLOCK_STEP = 70
/*
 * A long block — four paragraphs, say — would otherwise leave its closing
 * lines waiting well over a second. Past this point the cascade stops
 * lengthening and the tail arrives together.
 */
const MAX_DELAY = 900

/**
 * Text that is clamped, or that carries markup of its own, is left alone —
 * `-webkit-line-clamp` counts line boxes, which nested blocks destroy, and
 * re-parenting inline children would drop their styling and event handlers.
 */
function isSplittable(el: HTMLElement) {
  if (el.children.length > 0) return false
  if (!el.textContent?.trim()) return false
  if (el.closest("[data-no-split]")) return false
  const clamp = getComputedStyle(el).webkitLineClamp
  return clamp === "none" || clamp === ""
}

/**
 * Rewrites an element's text as one masked block per rendered line, with each
 * word inside rising and levelling out a beat after the one before it — the
 * crest travels along the line, then on to the next. Lines are measured from
 * the live layout, so the break points are whatever the browser actually chose.
 */
function splitElement(el: HTMLElement, delay: number): number {
  const text = el.dataset.rvText ?? el.textContent ?? ""
  el.dataset.rvText = text

  // Words first, so the browser can tell us where it put each one.
  const probes: HTMLElement[] = []
  el.textContent = ""
  for (const token of text.split(/(\s+)/)) {
    if (!token) continue
    if (/^\s+$/.test(token)) {
      el.append(document.createTextNode(token))
      continue
    }
    const probe = document.createElement("span")
    probe.textContent = token
    el.append(probe)
    probes.push(probe)
  }

  // Group the words by the line box they landed in.
  const lines: string[][] = []
  let top: number | null = null
  for (const probe of probes) {
    const y = Math.round(probe.getBoundingClientRect().top)
    if (top === null || Math.abs(y - top) > 1) {
      lines.push([probe.textContent ?? ""])
      top = y
    } else {
      lines[lines.length - 1].push(probe.textContent ?? "")
    }
  }

  el.textContent = ""
  for (const words of lines) {
    const mask = document.createElement("span")
    mask.className = "rv-line"

    words.forEach((word, index) => {
      if (index > 0) mask.append(document.createTextNode(" "))

      const span = document.createElement("span")
      span.className = "rv-word"
      span.textContent = word
      span.style.setProperty(
        "--rv-delay",
        `${Math.min(delay, MAX_DELAY) + Math.min(index, WAVE_REACH) * WORD_STEP}ms`
      )
      mask.append(span)
    })

    el.append(mask)
    delay += LINE_STEP
  }

  return delay
}

/**
 * Walks a revealed block in document order, masking the text it finds and
 * fading everything else in behind it, so an eyebrow, a headline and a button
 * arrive in the order they are read.
 */
function splitLines(root: HTMLElement): boolean {
  let delay = 0
  let split = false

  const walk = (node: HTMLElement) => {
    for (const child of Array.from(node.children) as HTMLElement[]) {
      if (child.matches(SPLIT_SELECTOR) && isSplittable(child)) {
        delay = splitElement(child, delay)
        split = true
      } else if (child.querySelector(SPLIT_SELECTOR)) {
        walk(child)
      } else {
        child.classList.add("rv-fade")
        child.style.setProperty("--rv-delay", `${Math.min(delay, MAX_DELAY)}ms`)
        delay += BLOCK_STEP
      }
    }
  }

  walk(root)
  return split
}

/**
 * Reveals a block the first time it enters the viewport, then stops observing.
 *
 * Text inside is measured into its rendered lines and each line rises out of
 * its own mask in turn; anything that is not text fades up in the same order.
 * Motion is suppressed wholesale by the reduced-motion rules in globals.css.
 */
export function Reveal({
  className,
  stagger = false,
  step = 80,
  bare = false,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  /*
   * Held in state rather than toggled on the node: React owns `className`, so
   * an imperatively added class is wiped by any later re-render that changes
   * the prop — leaving an already-revealed block stuck at opacity 0.
   */
  const [visible, setVisible] = React.useState(false)
  const splittable = !stagger && !bare

  /* `null` until the split has been attempted; the block stays hidden until
   * then, so a line never misses its own entrance by being measured late. */
  const [lines, setLines] = React.useState<boolean | null>(() =>
    !splittable ? false : null
  )

  React.useEffect(() => {
    const el = ref.current
    if (!el || !splittable) return

    let cancelled = false
    /* Lines are measured from the live layout, so the web font has to be the
     * one the visitor will actually read — otherwise the breaks shift under
     * the masks the moment it swaps in. */
    const measure = () => {
      const node = ref.current
      if (cancelled || !node) return
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setLines(false)
        return
      }
      try {
        setLines(splitLines(node))
      } catch {
        /* A block that cannot be measured still has to be readable. */
        setLines(false)
      }
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => measure())
    } else {
      const frame = requestAnimationFrame(measure)
      return () => {
        cancelled = true
        cancelAnimationFrame(frame)
      }
    }

    return () => {
      cancelled = true
    }
  }, [splittable])

  /* Re-measure on width changes: a narrower column breaks the copy elsewhere. */
  React.useEffect(() => {
    const el = ref.current
    if (!el || !lines) return

    let width = el.clientWidth
    let frame = 0

    const observer = new ResizeObserver(() => {
      if (el.clientWidth === width) return
      width = el.clientWidth
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => splitLines(el))
    })

    observer.observe(el)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [lines])

  React.useEffect(() => {
    const el = ref.current
    if (!el || visible || lines === null) return

    const io = shared()
    entries.set(el, { stagger, step, show: () => setVisible(true) })
    io.observe(el)

    return () => {
      entries.delete(el)
      io.unobserve(el)
    }
  }, [stagger, step, visible, lines])

  return (
    <div
      ref={ref}
      className={cn(
        !bare && (stagger ? "reveal-stagger" : "reveal"),
        lines && "reveal-lines",
        visible && "is-visible",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
