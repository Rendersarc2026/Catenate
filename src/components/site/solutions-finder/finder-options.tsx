/*
 * No "use client" boundary of its own: these controls are only ever rendered
 * from the finder's client component, so they compile into the same bundle.
 */
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

type OptionProps<T extends string> = {
  options: readonly T[]
  value: T | null
  onSelect: (next: T) => void
  /** Id of the step heading these controls answer. */
  labelledBy: string
}

/**
 * The primary choice: one tile per application, laid out as a spec index
 * rather than a card wall. Selection reads as a filled brand-blue tile.
 */
export function ApplicationGrid<T extends string>({
  options,
  value,
  onSelect,
  labelledBy,
}: OptionProps<T>) {
  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3"
    >
      {options.map((option) => {
        const selected = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option)}
            className={cn(
              "group/tile flex items-center justify-between gap-4 rounded-xl px-5.5 py-4.5 text-left transition-[background-color,box-shadow,color] duration-300 ease-expo",
              selected
                ? "bg-blue text-white shadow-[0_16px_36px_-20px_rgb(27_42_122/0.9)]"
                : "bg-white text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.1)] hover:shadow-[inset_0_0_0_1px_rgb(27_42_122/0.42)]"
            )}
          >
            <span className="truncate text-[15.5px] leading-[1.45] font-medium">
              {option}
            </span>

            <span
              aria-hidden="true"
              className={cn(
                "grid size-5 shrink-0 place-items-center rounded-full transition-colors duration-250 ease-expo",
                selected
                  ? "bg-white text-blue"
                  : "text-transparent shadow-[inset_0_0_0_1px_rgb(26_29_46/0.18)] group-hover/tile:shadow-[inset_0_0_0_1px_rgb(27_42_122/0.4)]"
              )}
            >
              <Check className="size-3 stroke-[2.75]" />
            </span>
          </button>
        )
      })}
    </div>
  )
}

/** The secondary choice: the conditions offered for the chosen application. */
export function ConditionChips<T extends string>({
  options,
  value,
  onSelect,
  labelledBy,
}: OptionProps<T>) {
  return (
    <div role="group" aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option === value
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(option)}
            className={cn(
              "rounded-full px-4.5 py-2.5 text-[14.5px] leading-[1.4] transition-[background-color,box-shadow,color] duration-250 ease-expo",
              selected
                ? "bg-blue text-white"
                : "bg-white text-grey shadow-[inset_0_0_0_1px_rgb(26_29_46/0.12)] hover:text-ink hover:shadow-[inset_0_0_0_1px_rgb(27_42_122/0.42)]"
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
