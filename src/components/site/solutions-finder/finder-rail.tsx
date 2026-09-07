import { cn } from "@/lib/utils"

export type RailStep = {
  /** Anchor id of the step this entry jumps to. */
  id: string
  index: number
  label: string
  /** The answer given so far, if any. */
  value: string | null
  /** Copy shown while the step has no answer. */
  placeholder: string
  /** Whether the step has been reached and can be jumped to. */
  reachable: boolean
}

/**
 * Sticky progress rail. It keeps the three stages, the current position and
 * every answer given so far in view — on mobile as much as on desktop — and
 * doubles as the way back to an earlier selection.
 *
 * Its height is fixed (h-16) because the step anchors offset themselves by it.
 */
export function FinderRail({ steps }: { steps: RailStep[] }) {
  return (
    <div className="sticky top-nav z-40 border-b border-ink/10 bg-white/88 backdrop-blur-[18px]">
      <nav aria-label="Solutions finder progress" className="content-pad">
        <ol className="grid grid-cols-3 gap-x-3 sm:gap-x-8">
          {steps.map((step) => {
            const body = (
              <>
                <span className="flex items-baseline gap-1.5 text-[9.5px] font-medium tracking-[0.08em] uppercase sm:text-[10.5px] sm:tracking-[0.14em]">
                  <span className="tnum">{String(step.index).padStart(2, "0")}</span>
                  <span className="truncate">{step.label}</span>
                </span>
                <span
                  className={cn(
                    "truncate text-[12.5px] leading-[1.4] sm:text-[13.5px]",
                    step.value ? "font-medium text-ink" : "text-grey/70"
                  )}
                >
                  {step.value ?? step.placeholder}
                </span>
              </>
            )

            return (
              <li
                key={step.id}
                className={cn(
                  "border-t-2 transition-colors duration-300 ease-expo",
                  step.value
                    ? "border-blue"
                    : step.reachable
                      ? "border-blue/35"
                      : "border-ink/12"
                )}
              >
                {step.reachable ? (
                  <a
                    href={`#${step.id}`}
                    aria-current={step.value ? undefined : "step"}
                    className="flex h-16 flex-col justify-center gap-0.5 text-grey transition-colors duration-250 ease-expo hover:text-blue"
                  >
                    {body}
                  </a>
                ) : (
                  <span className="flex h-16 flex-col justify-center gap-0.5 text-grey/55">
                    {body}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
