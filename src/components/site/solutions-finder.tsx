"use client"

import * as React from "react"

import { Reveal } from "@/components/site/reveal"
import { Badge } from "@/components/ui/badge"
import {
  applications,
  conditionNotes,
  conditions,
  systems,
  type Application,
  type Condition,
} from "@/data/catenate"
import { cn } from "@/lib/utils"

/** Cross-fade duration when the recommendation changes, in ms. */
const SWAP_MS = 280

export function SolutionsFinder() {
  const [application, setApplication] = React.useState<Application>(applications[0])
  const [condition, setCondition] = React.useState<Condition>(conditions[1])
  const [fading, setFading] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  /** Fade the card out, swap the selection, fade back in. */
  const swap = (apply: () => void) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply()
      return
    }
    setFading(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      apply()
      setFading(false)
    }, SWAP_MS)
  }

  const system = systems[application]

  return (
    <section id="finder" className="section on-blue bg-blue text-white">
      <Reveal className="mb-8.5">
        <span className="eyebrow">Solutions finder</span>
        <h2 className="max-w-[20ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Start with the job, not the product code.
        </h2>
      </Reveal>

      <Reveal>
        <ChipGroup
          step={1}
          label="Choose the application"
          options={applications}
          value={application}
          onChange={(next) => swap(() => setApplication(next))}
        />

        <ChipGroup
          step={2}
          label="Choose the condition"
          options={conditions}
          value={condition}
          onChange={(next) => swap(() => setCondition(next))}
        />

        <div
          aria-live="polite"
          className={cn(
            "mt-8.5 rounded-block bg-white p-[clamp(26px,3.5vw,42px)] text-ink transition-opacity duration-300 ease-expo",
            fading && "opacity-0"
          )}
        >
          <div className="mb-5.5 flex flex-wrap items-baseline justify-between gap-5 border-b border-ink/10 pb-4.5">
            <div>
              <span className="eyebrow mb-1.5">Recommended system</span>
              <h3 className="text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.3] font-medium tracking-[-0.01em]">
                {application} · {condition.toLowerCase()}
              </h3>
            </div>
            <span className="tnum text-xs text-grey">{system.standard}</span>
          </div>

          {system.steps.map((step, index) => (
            <div
              key={step.stage}
              className="grid grid-cols-[32px_1fr_auto] items-center gap-4.5 border-b border-ink/7 py-3.5 last:border-b-0"
            >
              <span className="tnum grid size-8 place-items-center rounded-full border border-ink/18 text-[13px] font-medium text-grey">
                {index + 1}
              </span>
              <span>
                <b className="text-[15.5px] font-medium">{step.product}</b>
                <em className="block text-[13.5px] not-italic text-grey">{step.stage}</em>
              </span>
              <Badge className="h-auto rounded-full bg-blue/7 px-3 py-1.25 text-[11px] tracking-[0.12em] whitespace-nowrap text-blue uppercase">
                {step.principal}
              </Badge>
            </div>
          ))}

          <p className="mt-5 max-w-[70ch] text-[13.5px] text-grey">
            {conditionNotes[condition]}
          </p>
        </div>
      </Reveal>
    </section>
  )
}

function ChipGroup<T extends string>({
  step,
  label,
  options,
  value,
  onChange,
}: {
  step: number
  label: string
  options: readonly T[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <div className="mb-6.5">
      <div className="mb-3.5 flex items-center gap-2.5 text-[11px] tracking-[0.16em] uppercase opacity-60">
        <span className="tnum grid size-6 place-items-center rounded-full border border-white/20 text-[11px]">
          {step}
        </span>
        {label}
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const selected = option === value
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => !selected && onChange(option)}
              className={cn(
                "rounded-full px-4.5 py-2.25 text-sm transition-all duration-250 ease-expo",
                selected
                  ? "bg-white text-blue"
                  : "text-white/82 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.24)] hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.6)]"
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
