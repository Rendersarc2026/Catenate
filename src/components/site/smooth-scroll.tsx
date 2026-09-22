"use client"

import Lenis from "lenis"
import { usePathname } from "next/navigation"
import * as React from "react"

import { jumpTo, setActiveLenis } from "@/lib/scroll-jump"

/*
 * The page is placed before the scroll-driven sections prime themselves, and
 * they prime from a passive effect — so this has to be a layout effect, which
 * React runs first. Guarded because the component still renders on the server.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

/** How the browser opened this document. Fixed for its lifetime. */
function openedBy() {
  const entry = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined
  return entry?.type
}

/** Clearance kept above a section a fragment names, for the header. */
const HEADER_GAP = 80

/*
 * Following a fragment: how long the target is kept under watch, and how many
 * frames it has to hold still before the page is left alone. See `follow`.
 */
const FOLLOW_MS = 1500
const STEADY_FRAMES = 3

/** The furthest down the page can currently sit. */
function furthest() {
  return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
}

/** Where the page has to sit for `selector` to be read, or null if it is not in yet. */
function anchorTop(selector: string) {
  const el = document.querySelector(selector)
  if (!el) return null

  const at = el.getBoundingClientRect().top + window.scrollY - HEADER_GAP
  return Math.min(Math.max(at, 0), furthest())
}

/*
 * The scroll map is mirrored into session storage, because the map itself only
 * lives as long as the document does. A phone drops a backgrounded page far
 * more readily than a desktop browser: the trip back to it then builds it
 * again from scratch — `popstate` belongs to the document that was thrown
 * away, so it never fires, and everything this component remembered is gone —
 * where the same back on a desktop is served from memory. Session storage is
 * per tab and outlives the document, so a rebuilt page still knows where its
 * reader was.
 */
const STORE = "catenate:scroll-positions"

function readStored(): [string, number][] {
  try {
    const raw = window.sessionStorage.getItem(STORE)
    if (!raw) return []
    return Object.entries(JSON.parse(raw) as Record<string, number>)
  } catch {
    /* Blocked, or something else in the slot: the map simply starts empty. */
    return []
  }
}

function writeStored(positions: Map<string, number>) {
  try {
    window.sessionStorage.setItem(
      STORE,
      JSON.stringify(Object.fromEntries(positions))
    )
  } catch {
    /* A full quota or a blocked store; this document still has its own map. */
  }
}

/*
 * The route the document opened on, and whether the reader has since moved off
 * it. Module scope rather than refs: React mounts every effect twice in
 * development, and a ref consumed by the throwaway first pass leaves the
 * second — the one that sticks — believing the document has already been
 * placed once. These reset when the document does, which is what is actually
 * being asked.
 */
let entryPath: string | null = null
let navigatedAway = false

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = React.useRef<Lenis | null>(null)

  /*
   * Where each route was left, so back and forward return to it. Kept by hand
   * because scroll restoration is off: see the effect below.
   */
  const positions = React.useRef(new Map<string, number>())
  /** The route on screen, for the handler below. Set as each one is placed. */
  const route = React.useRef(pathname)
  /** Set by `popstate`, so the next reset knows it is a back or a forward. */
  const popped = React.useRef(false)

  /*
   * The map the last document in this tab left behind, for a back the browser
   * could not serve from memory. A layout effect, and declared above the
   * placement below, so the positions are in hand before the page is placed
   * for the first time.
   */
  useIsomorphicLayoutEffect(() => {
    for (const [path, at] of readStored()) {
      if (!positions.current.has(path)) positions.current.set(path, at)
    }
  }, [])

  /*
   * Written out where a phone will actually let us: a page the system drops
   * may never run another line of ours, and the last thing it is given is the
   * chance to hide. The placement below files it again on every route change,
   * because an in-app navigation never hides the page at all.
   */
  React.useEffect(() => {
    const save = () => writeStored(positions.current)
    const onHidden = () => {
      if (document.visibilityState === "hidden") save()
    }

    window.addEventListener("pagehide", save)
    document.addEventListener("visibilitychange", onHidden)
    return () => {
      window.removeEventListener("pagehide", save)
      document.removeEventListener("visibilitychange", onHidden)
    }
  }, [])

  /*
   * Where each route is, filed as the reader scrolls rather than as the route
   * is torn down. By the time a teardown runs the incoming page is already in
   * the document, and a shorter one clamps the scroll — so the position filed
   * against the route being left is the clamped one, and coming back lands
   * short of what the reader was reading. `route` rather than
   * `location.pathname` for the same reason: the router has already moved on.
   */
  React.useEffect(() => {
    const onScroll = () => positions.current.set(route.current, window.scrollY)

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    /*
     * A reload opens the page at the top, so the browser is told not to put
     * the old position back. Doing it this way rather than scrolling to the
     * top ourselves is what keeps it clean: the browser simply never moves,
     * so there is no moment where the reader sees the page somewhere else
     * first. Back and forward are served from the map above instead.
     */
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }


    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    /*
     * `lerp` rather than `duration`: duration mode replays a fixed 1.4s easing
     * curve from wherever the last wheel event landed, so a run of events
     * restarts the curve over and over and the page arrives late and floaty.
     * Lerp mode chases a moving target and is scaled by real elapsed time, so
     * it tracks the wheel closely and behaves the same at 60Hz and 144Hz.
     */
    const lenis = new Lenis({
      lerp: 0.06,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      /* Touch devices already scroll smoothly, and doubling it up adds lag. */
      syncTouch: false,
      infinite: false,
    })

    lenisRef.current = lenis
    setActiveLenis(lenis)

    let frameId: number | null = null

    function raf(time: number) {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    frameId = requestAnimationFrame(raf)

    // Handle internal hash anchor clicks smoothly with Lenis
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a")
      if (!target) return
      const href = target.getAttribute("href")
      if (!href) return

      if (href.startsWith("#") && href.length > 1) {
        const el = document.querySelector(href)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el as HTMLElement, { offset: -HEADER_GAP, duration: 1.1 })
        }
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        const hash = href.substring(1)
        const el = document.querySelector(hash)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el as HTMLElement, { offset: -HEADER_GAP, duration: 1.1 })
        }
      } else if (
        href === window.location.pathname ||
        (href === "/" && window.location.pathname === "/")
      ) {
        // Clicking a link to the current page smoothly returns to top
        lenis.scrollTo(0, { duration: 0.8 })
      }
    }

    document.addEventListener("click", onAnchorClick)

    return () => {
      document.removeEventListener("click", onAnchorClick)
      if (frameId !== null) cancelAnimationFrame(frameId)
      lenis.destroy()
      lenisRef.current = null
      setActiveLenis(null)
    }
  }, [])

  /* Notes a back or a forward, so the placement below can tell one apart. */
  React.useEffect(() => {
    const onPopState = () => {
      popped.current = true
    }

    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  /*
   * Places the page on every navigation.
   *
   * A layout effect, not a passive one: each scroll-driven section primes
   * itself against the current scroll position from its own passive effect,
   * and React runs those after this. Placing the page here means they prime
   * where the reader is about to be, rather than priming at the top and then
   * smoothing across the whole page once this moves it — which is what made
   * the home page lurch after a back.
   *
   * `jumpTo` rather than a bare `scrollTo` for the same reason it exists: it
   * keeps Lenis' own target in step, so the next wheel tick does not drag the
   * page back, and it marks the position as one the page moved to, so the
   * header does not read it as the reader scrolling and slide away.
   */
  useIsomorphicLayoutEffect(() => {
    if (entryPath === null) entryPath = pathname
    else if (pathname !== entryPath) navigatedAway = true

    /* Still on the route the document opened with. */
    const opening = !navigatedAway

    const restoring = popped.current
    popped.current = false

    /* Carried over for a document the browser has to build again. */
    writeStored(positions.current)

    const opened = openedBy()

    /*
     * A reload opens at the top, whatever fragment is still sitting in the
     * address bar from earlier. Restoration is off, so a reload without one
     * never moves at all; the zero below is what overrides the browser's own
     * jump to a fragment, which restoration has no say over.
     */
    const reloaded = opening && opened === "reload"

    /*
     * A back or a forward the browser could not serve from memory, so it built
     * the document again. It is the ordinary way back onto a page from a
     * phone, and nothing in this document announces it: the `popstate` above
     * fired in the page that was dropped. Reading it from the navigation entry
     * is what makes a back behave the same on a phone as on a desktop —
     * otherwise it is indistinguishable from a reload here, and the reader is
     * put back at the top of the page rather than where they were reading.
     */
    const rebuilt = opening && opened === "back_forward"

    /* A back or a forward onto this route, from either side of a rebuild. */
    const returning = restoring || rebuilt

    /*
     * The fragment to honour, if this navigation is one that asks for it. Only
     * a reload's is stale — a back's fragment is part of the entry the reader
     * asked for, and is the best guess left once the map above has none.
     */
    const hash = window.location.hash
    const wanted = !reloaded && hash.length > 1 ? hash : null

    /* Where the reader was, for a back or a forward onto this route. */
    const left = returning ? positions.current.get(pathname) : undefined

    /*
     * Where the page should sit, measured afresh every time it is asked: a
     * route that is still arriving is a few hundred pixels tall, and both a
     * fragment and a remembered position mean something different against it
     * than against the finished page.
     *
     * `null` leaves the page where the browser put it — a back onto a route
     * this tab has neither a position nor a fragment for, where any guess
     * would be worse than none.
     */
    const place = (): number | null => {
      if (reloaded) return 0
      if (left !== undefined) return Math.min(left, furthest())
      if (wanted) return anchorTop(wanted)
      if (returning) return null
      return 0
    }

    /*
     * Neither a fragment nor a remembered position can be honoured in one
     * measurement. The route this effect runs for is often still arriving —
     * the section a fragment names is not in the document yet, and the page is
     * too short to hold a deep position at all — and once it is there, the
     * sections above it settle over the next few frames, so a position taken
     * too early lands short. That is what left a link to a section on the home
     * page sitting on the hero, and a back onto it high of where it was left.
     *
     * So the target is followed rather than jumped to: every frame it is
     * worked out again and the page moved onto it, until both it and the
     * page's height hold still, the watch runs out, or the reader takes the
     * page over themselves.
     */
    const follow = () => {
      const until = performance.now() + FOLLOW_MS
      let height = -1
      let steady = 0
      let frame: number | null = null
      let done = false

      const release = () => {
        if (done) return
        done = true
        if (frame !== null) cancelAnimationFrame(frame)
        window.removeEventListener("wheel", release)
        window.removeEventListener("touchmove", release)
        window.removeEventListener("keydown", release)
      }

      const step = () => {
        const at = place()

        /* A page still growing under the target has not settled on one. */
        const now = document.documentElement.scrollHeight
        if (now !== height) {
          height = now
          steady = 0
        }

        if (at !== null) {
          if (Math.abs(at - window.scrollY) >= 1) {
            steady = 0
            jumpTo(at)
          } else if (++steady >= STEADY_FRAMES) {
            return release()
          }
        }

        if (performance.now() >= until) return release()
        frame = requestAnimationFrame(step)
      }

      /*
       * The reader moving the page themselves ends the watch at once.
       * `touchmove` rather than `touchstart`: a finger landing on a phone is
       * not the reader scrolling, and the tap that opened the page often
       * arrives here, which abandoned the placement before it had run.
       */
      window.addEventListener("wheel", release, { passive: true })
      window.addEventListener("touchmove", release, { passive: true })
      window.addEventListener("keydown", release)
      frame = requestAnimationFrame(step)

      return release
    }

    route.current = pathname

    const to = place()
    let frameId: number | null = null
    let release: (() => void) | null = null

    if (to !== null) jumpTo(to)

    if (wanted || left !== undefined) {
      release = follow()
    } else if (to !== null) {
      /*
       * Reinforce once the route's layout has flushed: a page whose height is
       * still settling measures short, and a deep position would land high.
       */
      frameId = requestAnimationFrame(() => jumpTo(to))
    }

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      release?.()
    }
  }, [pathname])

  return <>{children}</>
}
