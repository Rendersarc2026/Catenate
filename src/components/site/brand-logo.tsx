import Image from "next/image"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

/*
 * The supplied Catenate Alliances lockup: the "C" above the two-line wordmark.
 * It is split into two same-sized layers cut from the one file, so they stack
 * back into the original artwork exactly:
 *
 *  - the mark is shown as the artwork itself, or as a mask in `mono`;
 *  - the wordmark is always a mask filled with `currentColor`, so the same
 *    lockup reads on light and dark grounds.
 */
const MARK = "/images/catenate-logo-mark.png"
const WORDMARK = "/images/catenate-logo-wordmark.png"
const WIDTH = 363
const HEIGHT = 480

const mask = (src: string): CSSProperties => ({
  mask: `url(${src}) center / contain no-repeat`,
  WebkitMask: `url(${src}) center / contain no-repeat`,
})

export function BrandLogo({
  tone = "color",
  className,
}: {
  /* `mono` paints the mark in `currentColor` too, for dark or busy grounds. */
  tone?: "color" | "mono"
  className?: string
}) {
  return (
    <span
      className={cn("relative block h-[3.6em]", className)}
      style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
    >
      {tone === "mono" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-current"
          style={mask(MARK)}
        />
      ) : (
        <Image
          src={MARK}
          alt=""
          aria-hidden="true"
          width={WIDTH}
          height={HEIGHT}
          priority
          className="absolute inset-0 size-full"
        />
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-current"
        style={mask(WORDMARK)}
      />
    </span>
  )
}
