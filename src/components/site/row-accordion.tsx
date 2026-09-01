"use client"

import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export type AccordionRow = {
  id: string
  name: string
  /** Sub-line under the row name. */
  description?: string
  /** Right-aligned annotation, e.g. "9 families". */
  meta?: string
  content: React.ReactNode
}

type RowAccordionProps = {
  rows: AccordionRow[]
  /** Fires as the pointer moves across rows. Used to cross-fade backdrops. */
  onRowHover?: (id: string | null) => void
  className?: string
}

/**
 * The site's numbered disclosure list — one open row at a time, an index on the
 * left that slides on hover, and a plus that rotates into a minus.
 */
export function RowAccordion({ rows, onRowHover, className }: RowAccordionProps) {
  return (
    <Accordion
      multiple={false}
      className={cn("border-t border-current/10", className)}
      onMouseLeave={() => onRowHover?.(null)}
    >
      {rows.map((row, index) => (
        <AccordionItem
          key={row.id}
          value={row.id}
          className="border-b border-current/10 not-last:border-b"
          onMouseEnter={() => onRowHover?.(row.id)}
        >
          <AccordionTrigger
            showIcon={false}
            className="group/row grid w-full grid-cols-[1fr_auto] items-center gap-4 rounded-none px-3 py-5 text-left transition-colors duration-250 ease-expo hover:bg-blue/3 hover:no-underline sm:grid-cols-[44px_1fr_auto] sm:gap-5 sm:py-5.5"
          >
            {/* Narrow screens carry the index above the name instead of beside it. */}
            <span className="tnum hidden text-xs text-grey transition-transform duration-250 ease-expo group-hover/row:translate-x-2 sm:block">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="min-w-0">
              <span className="tnum mb-1 block text-[11px] text-grey sm:hidden">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="block text-[clamp(1.15rem,2.1vw,1.9rem)] font-medium tracking-[-0.015em]">
                {row.name}
              </span>

              {row.description && (
                <span className="mt-0.75 block text-sm font-normal tracking-normal text-grey">
                  {row.description}
                </span>
              )}

              {row.meta && (
                <span className="mt-1.5 block text-[13px] text-grey sm:hidden">
                  {row.meta}
                </span>
              )}
            </span>

            <span className="flex items-center gap-4 text-[13px] text-grey">
              {row.meta && <span className="hidden sm:inline">{row.meta}</span>}
              <span className="plus-glyph" aria-hidden="true" />
            </span>
          </AccordionTrigger>

          <AccordionContent className="pt-1 pr-3 pb-8.5 pl-3 sm:pl-16">
            {row.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

/** Three-column key/value block used inside the industry and brand panels. */
export function PanelColumns({
  groups,
}: {
  groups: { title: string; items: string[] }[]
}) {
  return (
    <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
      {groups.map((group) => (
        <div key={group.title}>
          <h4 className="mb-2.5 text-[11px] font-medium tracking-[0.16em] text-grey uppercase">
            {group.title}
          </h4>
          <ul className="list-none text-[15px] leading-8">
            {group.items.map((item) => (
              <li key={item} className="text-ink/82">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
