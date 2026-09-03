"use client"

import Lenis from "lenis"
import * as React from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    })

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
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.6 })
        }
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        const hash = href.substring(1)
        const el = document.querySelector(hash)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.6 })
        }
      }
    }

    document.addEventListener("click", onAnchorClick)

    return () => {
      document.removeEventListener("click", onAnchorClick)
      if (frameId !== null) cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
