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
          setVisible(true)
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
