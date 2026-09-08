"use client"

import * as React from "react"

/*
 * Holds a slot open and only mounts what goes in it once it is worth paying
 * for. Paired with a `next/dynamic` import, the code for the visual is not
 * fetched until then either — which is the point for the two WebGL pieces on
 * the home page, whose libraries together outweigh everything else it ships.
 */
export function NearViewport({
  children,
  className,
  /** How far ahead of the viewport to start loading. */
  rootMargin = "500px",
  /**
   * Also mount once the page goes idle, without waiting for the reader to
   * approach.
   *
   * For a visual with an expensive first frame this is the difference between
   * a smooth page and a stutter: the globe spends ~500ms building its point
   * geometry the moment it mounts, and on a mid-range device that is a visible
   * hitch if it lands mid-scroll. Idle time, while the reader is still on the
   * hero, is the one window where that work costs nothing — and it is still
   * far better than the static import it replaced, which did the same work
   * while the page was trying to paint. Anything mounted this way must park
   * its own render loop while off screen; both WebGL pieces here do.
   */
  whenIdle = false,
}: {
  children: React.ReactNode
  className?: string
  rootMargin?: string
  whenIdle?: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    if (mounted) return
    const el = ref.current
    if (!el) return

    const show = () => setMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        show()
      },
      { rootMargin }
    )
    observer.observe(el)

    if (!whenIdle) return () => observer.disconnect()

    /* The timeout is the backstop: a page that never goes idle still mounts. */
    const hasIdle = typeof window.requestIdleCallback === "function"
    const handle = hasIdle
      ? window.requestIdleCallback(show, { timeout: 4000 })
      : window.setTimeout(show, 2000)

    return () => {
      observer.disconnect()
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [mounted, rootMargin, whenIdle])

  return (
    <div ref={ref} className={className}>
      {mounted ? children : null}
    </div>
  )
}
