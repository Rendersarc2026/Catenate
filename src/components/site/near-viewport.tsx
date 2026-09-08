"use client"

import * as React from "react"

/*
 * Holds a slot open and only mounts what goes in it once the reader is close
 * enough for it to matter. Paired with a `next/dynamic` import, the code for
 * the visual is not even fetched until then — which is the point for the two
 * WebGL pieces on the home page, whose libraries together outweigh everything
 * else the page ships.
 */
export function NearViewport({
  children,
  className,
  /** How far ahead of the viewport to start loading. */
  rootMargin = "500px",
}: {
  children: React.ReactNode
  className?: string
  rootMargin?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [near, setNear] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el || near) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        setNear(true)
      },
      { rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [near, rootMargin])

  return (
    <div ref={ref} className={className}>
      {near ? children : null}
    </div>
  )
}
