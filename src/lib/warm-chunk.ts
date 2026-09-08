"use client"

import * as React from "react"

/*
 * Splitting a heavy visual out of the initial bundle moves its parse cost off
 * the critical path — but if the module is only requested once the reader is
 * nearly at the section, that parse lands in the middle of a scroll. On a
 * mid-range phone three.js alone was a ~400ms hitch exactly as the globe came
 * into view: a faster first load bought at the cost of the one moment the
 * reader would notice.
 *
 * So fetch it during idle time instead. The page is interactive, the reader is
 * still on the hero, and by the time they arrive the module is in the module
 * cache and the dynamic import resolves without touching the main thread.
 */
export function useWarmChunk(load: () => Promise<unknown>) {
  React.useEffect(() => {
    let cancelled = false
    const run = () => {
      if (!cancelled) void load().catch(() => {})
    }

    /* Safari only grew `requestIdleCallback` recently; fall back to a timer. */
    const idle = window.requestIdleCallback
    if (idle) {
      const handle = idle(run, { timeout: 3000 })
      return () => {
        cancelled = true
        window.cancelIdleCallback?.(handle)
      }
    }

    const timer = window.setTimeout(run, 1200)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
    // The loader is a module-level constant at every call site.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
