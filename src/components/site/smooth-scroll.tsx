"use client"

import Lenis from "lenis"
import { usePathname } from "next/navigation"
import * as React from "react"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lenisRef = React.useRef<Lenis | null>(null)

  React.useEffect(() => {
    // Prevent browser from restoring old scroll positions on navigation
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
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.1 })
        }
      } else if (href.startsWith("/#") && window.location.pathname === "/") {
        const hash = href.substring(1)
        const el = document.querySelector(hash)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.1 })
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
    }
  }, [])

  // When switching pages (pathname changes), ensure page starts from the top
  React.useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.length > 1) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el as HTMLElement, {
            offset: -80,
            immediate: true,
          })
        } else {
          el.scrollIntoView()
        }
        return
      }
    }

    // Reset scroll to top immediately
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    }
    window.scrollTo(0, 0)

    // Reinforce on next animation frame in case of route layout flush
    const frameId = requestAnimationFrame(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)
    })

    return () => cancelAnimationFrame(frameId)
  }, [pathname])

  return <>{children}</>
}
