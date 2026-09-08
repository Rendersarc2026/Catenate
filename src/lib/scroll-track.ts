"use client"

/*
 * One scroll listener, one rAF loop, for every scroll-driven section on the
 * page.
 *
 * Each section used to own a `scroll` listener that measured its track with
 * `getBoundingClientRect()` *inside the handler*, then wrote styles from a
 * `requestAnimationFrame` callback. Six sections doing that interleaves reads
 * and writes six times over: every read after a write forces the browser to
 * flush layout again, so the cost grew with the number of sections rather than
 * with the work any one of them does.
 *
 * Here the listener only marks the page dirty. The frame then runs in two
 * passes — every track measures, then every track paints — so a frame costs
 * one layout flush no matter how many sections are running.
 *
 * Two other things fall out of centralising it:
 *
 * - Smoothing is frame-rate independent. The old `current += (target -
 *   current) * 0.14` moves twice as fast on a 120Hz display as on a 60Hz one
 *   and stutters whenever a frame runs long. The decay here is derived from
 *   elapsed time, so a track takes the same wall-clock time to settle on any
 *   display.
 * - A track that is nowhere near the viewport is skipped entirely, rather than
 *   measuring and repainting itself while the reader is four sections away.
 */

/** Time constant, in seconds, matching the old 0.14-per-frame lerp at 60Hz. */
export const SMOOTH_DEFAULT = 0.11

export type ScrollTrackOptions = {
  /** The tall element whose passage through the viewport drives the beat. */
  element: HTMLElement
  /**
   * Paints one frame. Called with the smoothed progress, never with a raw
   * scroll position — so a section's own code stays free of timing concerns.
   */
  paint: (value: number) => void
  /**
   * Reshapes raw 0..1 track progress before it is smoothed, for sections that
   * animate a position along a list rather than a plain fraction.
   */
  map?: (progress: number) => number
  /** Seconds for the smoothed value to close ~63% of the gap. 0 disables it. */
  smoothing?: number
  /** How far outside the viewport the track stays live. */
  rootMargin?: string
}

type Track = {
  options: ScrollTrackOptions
  current: number
  target: number
  /** Painted at least once, so the first frame does not animate in from 0. */
  primed: boolean
  live: boolean
  settled: boolean
}

const tracks = new Set<Track>()

let frame: number | null = null
let lastTime = 0
let dirty = true
let listening = false

/** Progress of a track's own scroll, 0 before it starts, 1 once it is done. */
function measure(track: Track) {
  const rect = track.options.element.getBoundingClientRect()
  const scrollable = rect.height - window.innerHeight
  const raw = scrollable <= 0 ? 0 : Math.min(Math.max(-rect.top / scrollable, 0), 1)
  track.target = track.options.map ? track.options.map(raw) : raw
}

function tick(now: number) {
  frame = null

  /*
   * Clamped: coming back to a backgrounded tab hands us a delta of seconds,
   * which would snap every track to its target in one visible jump.
   */
  const delta = Math.min((now - lastTime) / 1000, 0.05)
  lastTime = now

  // Pass one — read. Every measurement happens before any style is written,
  // so the frame costs a single layout flush.
  if (dirty) {
    dirty = false
    for (const track of tracks) {
      if (track.live) measure(track)
    }
  }

  // Pass two — write.
  let running = false
  for (const track of tracks) {
    if (!track.live) continue

    const smoothing = track.options.smoothing ?? SMOOTH_DEFAULT
    const gap = track.target - track.current

    if (!track.primed || smoothing <= 0 || Math.abs(gap) < 0.0004) {
      track.current = track.target
    } else {
      track.current += gap * (1 - Math.exp(-delta / smoothing))
      running = true
    }

    if (track.primed && track.settled && track.current === track.target) continue

    track.options.paint(track.current)
    track.primed = true
    track.settled = track.current === track.target
  }

  if (running || dirty) schedule()
}

function schedule() {
  if (frame !== null) return
  lastTime = performance.now()
  frame = requestAnimationFrame(tick)
}

function onScroll() {
  dirty = true
  schedule()
}

function listen() {
  if (listening) return
  listening = true
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })
}

function unlisten() {
  if (!listening || tracks.size > 0) return
  listening = false
  window.removeEventListener("scroll", onScroll)
  window.removeEventListener("resize", onScroll)
  if (frame !== null) {
    cancelAnimationFrame(frame)
    frame = null
  }
}

/**
 * Drives `paint` from `element`'s progress through the viewport. Returns the
 * teardown.
 */
export function createScrollTrack(options: ScrollTrackOptions) {
  const track: Track = {
    options,
    current: 0,
    target: 0,
    primed: false,
    live: true,
    settled: false,
  }

  tracks.add(track)
  listen()

  /*
   * Off screen the track is skipped outright — no measure, no paint. It is
   * measured once on the way out so it holds its correct end state, and the
   * smoothing is dropped on the way back in so it resumes where the scroll
   * actually is rather than sweeping there.
   */
  const observer = new IntersectionObserver(
    (entries) => {
      const entering = entries[entries.length - 1]?.isIntersecting ?? true
      if (entering === track.live) return
      track.live = entering
      if (entering) {
        /* Resume where the scroll actually is, rather than sweeping there. */
        track.primed = false
        dirty = true
        schedule()
        return
      }
      /*
       * Settle the track to its end state on the way out — otherwise a section
       * left mid-transition freezes there and is still half-faded when the
       * reader scrolls back to it. Measuring inside an observer callback is
       * safe: layout is already clean at that point, and it happens once per
       * crossing rather than once per frame.
       */
      measure(track)
      track.current = track.target
      track.settled = true
      track.primed = true
      options.paint(track.current)
    },
    { rootMargin: options.rootMargin ?? "20% 0px" }
  )
  observer.observe(options.element)

  measure(track)
  track.current = track.target
  options.paint(track.current)
  track.primed = true
  track.settled = true

  return () => {
    observer.disconnect()
    tracks.delete(track)
    unlisten()
  }
}

/** Re-measures every track on the next frame — after a layout-changing edit. */
export function invalidateScrollTracks() {
  onScroll()
}
