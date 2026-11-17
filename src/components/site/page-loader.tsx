"use client"

import * as React from "react"

import { BrandLogo } from "@/components/site/brand-logo"
import { cn } from "@/lib/utils"

/** The Catenate lockup over a slim indeterminate bar. */
export function LoaderMark({ className }: { className?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center gap-6 text-ink", className)}
    >
      <BrandLogo className="text-[22px]" />
      <span aria-hidden="true" className="loader-bar" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

/** Longest the overlay may hold the page, however slow the last asset is. */
const MAX_WAIT_MS = 6000
/** Matches the fade in `.page-loader`. */
const FADE_MS = 450

/*
 * Full-screen cover for the first visit. It is in the server HTML, so it is
 * painted before anything else, and lifts once the window `load` event says
 * the images, fonts and scripts the page asked for have arrived. Images that
 * are lazy-loaded further down do not hold it up — they are not part of
 * `load`. A cap keeps a single slow asset from trapping the reader, and a CSS
 * fallback in `.page-loader` clears it even if this script never runs.
 */
export function PageLoader() {
  const [state, setState] = React.useState<"loading" | "leaving" | "done">(
    "loading"
  )

  React.useEffect(() => {
    let finished = false
    let fade: number | undefined

    const finish = () => {
      if (finished) return
      finished = true
      setState("leaving")
      fade = window.setTimeout(() => setState("done"), FADE_MS)
    }

    const cap = window.setTimeout(finish, MAX_WAIT_MS)
    let ready: number | undefined

    if (document.readyState === "complete") {
      ready = window.requestAnimationFrame(finish)
    } else {
      window.addEventListener("load", finish, { once: true })
    }

    return () => {
      window.removeEventListener("load", finish)
      window.clearTimeout(cap)
      window.clearTimeout(fade)
      if (ready !== undefined) window.cancelAnimationFrame(ready)
    }
  }, [])

  if (state === "done") return null

  return (
    <div className="page-loader" data-state={state}>
      <LoaderMark />
    </div>
  )
}
