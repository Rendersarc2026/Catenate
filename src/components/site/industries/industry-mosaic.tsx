"use client"

import Image from "next/image"
import * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { images, type Industry } from "@/data/catenate"
import { cn } from "@/lib/utils"
import { getCategoryLabelForSlug } from "./types"

/* ------------------------------------------------------------------ *
 * Mosaic layout
 *
 * A flush wall on a 6-column grid carrying every sector in `industries`,
 * in data order. Editorial tiles — flat panels and one oversized figure —
 * are slotted into fixed positions so the wall reads as a composed grid
 * rather than a filled table.
 *
 * `INSERTS` maps a cell index to the non-photo tile occupying it. Every
 * remaining cell takes the next sector off the list, so adding a sector
 * to the data extends the wall without touching this file.
 * ------------------------------------------------------------------ */

type EditorialTile =
  | { kind: "void" }
  | {
      kind: "solid"
      tone: "ink" | "amber" | "graphite"
      title: string
      body: string
    }
  | {
      kind: "stat"
      tone: "ink" | "amber" | "graphite"
      figure: string
      unit: string
      title: string
      body: string
    }

const INSERTS: Record<number, EditorialTile> = {
  0: {
    kind: "solid",
    tone: "graphite",
    title: "One specified chain",
    body: "Primer, membrane, screed and adhesive released as a single system so no interface is left to chance on site.",
  },
  1: { kind: "void" },
  5: {
    kind: "stat",
    tone: "ink",
    figure: "28",
    unit: "families",
    title: "Product families held",
    body: "Five world-class principals carried across twenty-eight product families, stocked against project programmes.",
  },
  7: {
    kind: "solid",
    tone: "ink",
    title: "Approvals carried, not claimed",
    body: "Data sheets, pull-off assays, fire ratings and potable-contact certification travel with every delivery note.",
  },
  8: {
    kind: "solid",
    tone: "amber",
    title: "On site before the first coat",
    body: "Substrate moisture, surface profile and ambient readings taken, mock-ups run, applicators briefed.",
  },
  13: {
    kind: "stat",
    tone: "graphite",
    figure: "14",
    unit: "sectors",
    title: "Operating environments served",
    body: "Every environment on this wall carries its own chemistries, approvals and application windows.",
  },
  16: {
    kind: "solid",
    tone: "ink",
    title: "One accountable line",
    body: "A single technical and commercial point of responsibility, from sub-grade foundations to the finished surface.",
  },
  19: { kind: "void" },
  22: {
    kind: "solid",
    tone: "graphite",
    title: "Specification support",
    body: "Written build-ups with product references, consumption rates and sequence, issued to the main contractor.",
  },
  23: {
    kind: "solid",
    tone: "amber",
    title: "Applicator training",
    body: "Hands-on sessions with the applying crew, run on the actual substrate wherever site conditions allow.",
  },
}

const TONE_CLASS = {
  ink: "bg-ink text-white",
  graphite: "bg-[#2c303f] text-white",
  amber: "bg-amber text-ink",
} as const

/** Interleave every sector with the editorial tiles at their fixed cells. */
function buildCells(industries: readonly Industry[]) {
  const cells: ({ kind: "photo"; industry: Industry } | EditorialTile)[] = []
  const queue = [...industries]
  let index = 0

  // Lay out until every sector is placed, then close the final row.
  while (queue.length > 0 || index % 6 !== 0) {
    const insert = INSERTS[index]

    if (insert) {
      cells.push(insert)
    } else if (queue.length > 0) {
      cells.push({ kind: "photo", industry: queue.shift()! })
    } else {
      cells.push({ kind: "void" })
    }

    index += 1
  }

  return cells
}

interface IndustryMosaicProps {
  industries: readonly Industry[]
  /** Sectors to keep lit; `null` lights the whole wall. */
  highlightedSlugs: ReadonlySet<string> | null
  onOpenDetail: (industry: Industry) => void
}

export function IndustryMosaic({
  industries,
  highlightedSlugs,
  onOpenDetail,
}: IndustryMosaicProps) {
  const cells = React.useMemo(() => buildCells(industries), [industries])

  return (
    <ul className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
      {cells.map((cell, index) => {
        if (cell.kind === "void") {
          return (
            <li
              key={`void-${index}`}
              aria-hidden="true"
              className="hidden bg-off lg:block"
            />
          )
        }

        if (cell.kind === "photo") {
          const { industry } = cell
          return (
            <li key={industry.slug}>
              <MosaicPhotoTile
                industry={industry}
                isDimmed={
                  highlightedSlugs !== null &&
                  !highlightedSlugs.has(industry.slug)
                }
                onOpen={() => onOpenDetail(industry)}
              />
            </li>
          )
        }

        return (
          <li
            key={`editorial-${index}`}
            className={cn(
              "relative flex aspect-[4/5] flex-col justify-end p-5 transition-opacity duration-500 sm:aspect-square sm:p-6",
              TONE_CLASS[cell.tone],
              highlightedSlugs !== null && "opacity-45",
            )}
          >
            {cell.kind === "stat" && (
              <p className="mb-auto flex items-baseline gap-1.5 tracking-[-0.04em]">
                <span className="tnum text-[clamp(2.6rem,4.4vw,3.6rem)] font-medium leading-none">
                  {cell.figure}
                </span>
                <span className="text-[13px] font-medium tracking-normal opacity-70">
                  {cell.unit}
                </span>
              </p>
            )}

            <h3 className="text-[15px] font-medium leading-[1.3] tracking-[-0.01em] sm:text-base">
              {cell.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-[12.5px] leading-[1.55]",
                cell.tone === "amber" ? "text-ink/70" : "text-white/65",
              )}
            >
              {cell.body}
            </p>
          </li>
        )
      })}
    </ul>
  )
}

function MosaicPhotoTile({
  industry,
  isDimmed,
  onOpen,
}: {
  industry: Industry
  isDimmed: boolean
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${industry.name} — open full specification`}
      className={cn(
        "group relative flex aspect-[4/5] w-full flex-col justify-end overflow-hidden p-5 text-left outline-none transition-opacity duration-500 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:aspect-square sm:p-6",
        isDimmed && "opacity-40",
      )}
    >
      <Image
        src={images.industry(industry.slug)}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
        quality={75}
        className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105 motion-reduce:transition-none"
      />

      {/* Bottom-weighted scrim keeps the caption legible over any frame */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      <div className="pointer-events-none absolute inset-0 bg-ink/25 transition-opacity duration-500 group-hover:opacity-0" />

      <span className="relative mb-auto text-[10px] font-medium uppercase leading-[1.3] tracking-[0.12em] text-white/60">
        {getCategoryLabelForSlug(industry.slug)}
      </span>

      {/* Title grows on hover; the body below holds its size and line count,
          so the copy never reflows or truncates as the heading expands. */}
      <h3 className="relative flex items-start justify-between gap-2 text-[15px] font-medium leading-[1.3] tracking-[-0.01em] text-white transition-[font-size,line-height] duration-500 ease-expo group-hover:text-[19px] group-focus-visible:text-[19px] motion-reduce:transition-none sm:text-base sm:group-hover:text-[21px] sm:group-focus-visible:text-[21px]">
        {industry.name}
        <ArrowUpRight className="mt-0.5 size-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
      </h3>

      <p className="relative mt-2 text-[12.5px] leading-[1.55] text-white/70 transition-colors duration-500 group-hover:text-white/85 group-focus-visible:text-white/85">
        {industry.challenge}
      </p>
    </button>
  )
}
