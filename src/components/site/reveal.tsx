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

/**
 * Fades a block up the first time it enters the viewport, then stops observing.
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

  React.useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const io = shared()
    entries.set(el, { stagger, step, show: () => setVisible(true) })
    io.observe(el)

    return () => {
      entries.delete(el)
      io.unobserve(el)
    }
  }, [stagger, step, visible])

  return (
    <div
      ref={ref}
      className={cn(
        !bare && (stagger ? "reveal-stagger" : "reveal"),
        visible && "is-visible",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
