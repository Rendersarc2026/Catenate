"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

import { glideTo } from "@/lib/scroll-jump"
import { cn } from "@/lib/utils"

/** How close to either end of the page counts as being at it. */
const EDGE = 120

/** The furthest down the page can currently sit. */
function furthest() {
  return Math.max(document.documentElement.scrollHeight - window.innerHeight, 0)
}

/**
 * A floating arrow in the bottom corner, offered only at either end of the
 * page: at the top it leads down to the bottom, at the bottom back up to the
 * top. Mid-page, and on a page too short to travel, neither shows.
 */
export function ScrollArrows() {
  const pathname = usePathname()
  const [canUp, setCanUp] = React.useState(false)
  const [canDown, setCanDown] = React.useState(false)

  React.useEffect(() => {
    const read = () => {
      const y = window.scrollY
      const left = furthest() - y
      setCanUp(left <= EDGE && y > EDGE)
      setCanDown(y <= EDGE && left > EDGE)
    }

    /* One read per frame, however many scroll events the frame delivers. */
    let frame: number | null = null
    const onScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        frame = null
        read()
      })
    }

    /* A route still arriving grows under a still page, which no scroll reports. */
    const observer = new ResizeObserver(onScroll)
    observer.observe(document.body)

    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [pathname])

  if (pathname.startsWith("/admin")) return null

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[200] grid sm:right-6 sm:bottom-6">
      <Arrow
        label="Scroll to top"
        direction="up"
        shown={canUp}
        onClick={() => glideTo(0)}
      />
      <Arrow
        label="Scroll to bottom"
        direction="down"
        shown={canDown}
        onClick={() => glideTo(furthest())}
      />
    </div>
  )
}

function Arrow({
  label,
  direction,
  shown,
  onClick,
}: {
  label: string
  direction: "up" | "down"
  shown: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={cn(
        "grid size-11 place-items-center [grid-area:1/1] rounded-full bg-blue text-white shadow-[0_10px_30px_rgb(18_20_28/0.25)] ring-1 ring-white/10 transition-[opacity,transform,background-color] duration-400 ease-expo hover:bg-graphite motion-reduce:transition-none",
        shown
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "translate-y-2 opacity-0"
      )}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-4 fill-none stroke-current stroke-[1.6]"
      >
        {direction === "up" ? (
          <path d="M12 19V5M6 11l6-6 6 6" />
        ) : (
          <path d="M12 5v14M6 13l6 6 6-6" />
        )}
      </svg>
    </button>
  )
}
