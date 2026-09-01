"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type RevealProps = React.ComponentProps<"div"> & {
  /** Cascade the children in rather than the block as a whole. */
  stagger?: boolean
  /** Delay between children, in ms. Only applies with `stagger`. */
  step?: number
}

/**
 * Fades a block up the first time it enters the viewport, then stops observing.
 * Motion is suppressed wholesale by the reduced-motion rules in globals.css.
 */
export function Reveal({
  className,
  stagger = false,
  step = 80,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    // Already past the fold on first paint (deep link, restored scroll).
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (stagger) {
            Array.from(entry.target.children).forEach((child, i) => {
              ;(child as HTMLElement).style.transitionDelay = `${i * step}ms`
            })
          }
          entry.target.classList.add("is-visible")
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [stagger, step])

  return (
    <div
      ref={ref}
      className={cn(stagger ? "reveal-stagger" : "reveal", className)}
      {...props}
    >
      {children}
    </div>
  )
}
