import * as React from "react"

import { cn } from "@/lib/utils"

/*
 * The Catenate "C": an outer crescent with an inner C set over it, rebuilt as
 * vectors from the brand sheet. The two arcs only touch on the left, so the
 * white slivers between them at the top and bottom survive in the one-colour
 * version too.
 */
const CRESCENT =
  "M229.14 27.86A144 144 0 1 0 229.14 260.14A124.6 124.6 0 1 1 229.14 27.86Z"
const INNER_C =
  "M213.8 47.2A132 106 0 1 0 213.8 240.8L185.45 212.45A79 79 0 1 1 185.45 75.55Z"

type MarkProps = React.ComponentProps<"svg"> & {
  /* `mono` paints both arcs in `currentColor`, for dark or busy grounds. */
  tone?: "color" | "mono"
}

export function BrandMark({ tone = "color", className, ...props }: MarkProps) {
  /* Gradient ids are document-wide, so each instance needs its own. */
  const id = React.useId()
  const crescent = `${id}-crescent`
  const sheen = `${id}-sheen`
  const inner = `${id}-inner`
  const mono = tone === "mono"

  return (
    <svg
      viewBox="0 0 230 288"
      aria-hidden="true"
      className={cn("h-auto w-auto", className)}
      {...props}
    >
      {!mono && (
        <defs>
          <linearGradient
            id={crescent}
            gradientUnits="userSpaceOnUse"
            x1="190"
            y1="0"
            x2="90"
            y2="288"
          >
            <stop offset="0.08" stopColor="#0633c0" />
            <stop offset="0.2" stopColor="#2f66cb" />
            <stop offset="0.64" stopColor="#4c85d5" />
            <stop offset="0.7" stopColor="#70a4e2" />
            <stop offset="0.78" stopColor="#a1cdf4" />
            <stop offset="0.83" stopColor="#b3dafb" />
            <stop offset="1" stopColor="#a7d6fd" />
          </linearGradient>
          <radialGradient
            id={sheen}
            gradientUnits="userSpaceOnUse"
            cx="76"
            cy="264"
            r="50"
          >
            <stop offset="0" stopColor="#5a86de" stopOpacity="0.9" />
            <stop offset="1" stopColor="#5a86de" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={inner}
            gradientUnits="userSpaceOnUse"
            cx="218"
            cy="251"
            r="125"
          >
            <stop offset="0" stopColor="#a7d6fd" />
            <stop offset="0.45" stopColor="#9ecdfa" />
            <stop offset="0.6" stopColor="#8ab8f2" />
            <stop offset="0.73" stopColor="#5e8ce2" />
            <stop offset="0.85" stopColor="#2d5ad0" />
            <stop offset="1" stopColor="#002cbf" />
          </radialGradient>
        </defs>
      )}
      <path d={CRESCENT} fill={mono ? "currentColor" : `url(#${crescent})`} />
      {!mono && <path d={CRESCENT} fill={`url(#${sheen})`} />}
      <path d={INNER_C} fill={mono ? "currentColor" : `url(#${inner})`} />
    </svg>
  )
}

/*
 * Horizontal lockup for the header and footer: the mark beside the two-line
 * wordmark, set in Geist as the brand sheet specifies. The text colour comes
 * from the parent, so the same lockup reads on light and dark grounds.
 */
export function BrandLogo({
  tone = "color",
  className,
}: {
  tone?: MarkProps["tone"]
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark tone={tone} className="h-[1.95em] shrink-0" />
      <span className="font-heading text-[0.84em] leading-[0.98] font-bold tracking-[-0.01em] uppercase">
        <span className="block">Catenate</span>
        <span className="block">Alliances</span>
      </span>
    </span>
  )
}
