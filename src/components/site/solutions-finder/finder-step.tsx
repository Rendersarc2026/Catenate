import * as React from "react"

import { cn } from "@/lib/utils"

export type StepState = "pending" | "active" | "complete"

type FinderStepProps = {
  /** Anchor target for the step rail. */
  id: string
  /** 1-based position, rendered as the step numeral. */
  index: number
  label: string
  /** The step's question, or its answer once there is one. */
  heading: string
  state?: StepState
  /** `dark` is the treatment used inside the blue recommendation block. */
  tone?: "light" | "dark"
  /** Control shown beside the heading, e.g. "Start over". */
  action?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

/**
 * One stage of the finder: a numeral and its label in the left rail, the
 * question and its controls on the right. The three steps share this shell so
 * the page reads as one sequence rather than three unrelated blocks.
 */
export function FinderStep({
  id,
  index,
  label,
  heading,
  state = "active",
  tone = "light",
  action,
  className,
  children,
}: FinderStepProps) {
  const dark = tone === "dark"
  const pending = state === "pending"

  return (
    <section
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative grid gap-x-[clamp(24px,4vw,64px)] gap-y-[clamp(18px,2vw,26px)] lg:grid-cols-[minmax(0,190px)_minmax(0,1fr)]",
        className
      )}
    >
      <StepAnchor id={id} />

      <div className="flex items-center gap-4 lg:block">
        <span
          className={cn(
            "tnum block text-[clamp(1.8rem,2.8vw,2.5rem)] leading-none font-semibold tracking-[-0.04em]",
            dark ? "text-white" : pending ? "text-ink/20" : "text-blue"
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "block text-[11px] leading-[1.5] font-medium tracking-[0.16em] uppercase lg:mt-3.5",
            dark ? "text-white/62" : pending ? "text-grey/70" : "text-grey"
          )}
        >
          {label}
        </span>
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2
            id={`${id}-heading`}
            className={cn(
              "max-w-[26ch] text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.24] font-medium tracking-[-0.02em] text-balance",
              dark ? "text-white" : pending ? "text-grey" : "text-ink"
            )}
          >
            {heading}
          </h2>
          {action}
        </div>

        {children && <div className="mt-[clamp(22px,2.6vw,34px)]">{children}</div>}
      </div>
    </section>
  )
}

/**
 * Anchor target for the rail links. It sits a rail's height above the step so
 * the heading clears both sticky bars: Lenis scrolls anchors to 80px from the
 * top (see SmoothScroll), and the scroll margin covers the native jump used
 * when smooth scrolling is off.
 */
function StepAnchor({ id }: { id: string }) {
  return (
    <span
      id={id}
      aria-hidden="true"
      className="pointer-events-none absolute -top-20 left-0 block size-0 scroll-mt-20"
    />
  )
}
