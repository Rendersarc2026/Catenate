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
 * A flush two-row wall of tiles on a 6-column grid. Three tile kinds
 * share the same cell footprint:
 *   - "photo"  sector photography under a bottom-weighted scrim
 *   - "solid"  flat ink / amber panel, text only
 *   - "stat"   flat panel carrying one oversized figure
 *
 * `span` widens a tile across two columns. A `void` entry reserves an
 * empty cell so the wall reads as a composed grid, not a filled table.
 * ------------------------------------------------------------------ */

type MosaicTile =
  | { kind: "void"; key: string; span?: number }
  | { kind: "photo"; key: string; slug: string; span?: number }
  | {
      kind: "solid"
      key: string
      tone: "ink" | "amber" | "graphite"
      title: string
      body: string
      span?: number
    }
  | {
      kind: "stat"
      key: string
      tone: "ink" | "amber" | "graphite"
      figure: string
      unit: string
      title: string
      body: string
      span?: number
    }

const MOSAIC: MosaicTile[] = [
  // ---- Row one ----
  {
    kind: "solid",
    key: "chain",
    tone: "graphite",
    title: "One specified chain",
    body: "Primer, membrane, screed and adhesive released as a single system so no interface is left to chance on site.",
  },
  { kind: "void", key: "gap-1" },
  { kind: "photo", key: "building-infrastructure", slug: "building-infrastructure" },
  { kind: "photo", key: "marine-offshore", slug: "marine-offshore" },
  { kind: "photo", key: "oil-gas-petrochemical", slug: "oil-gas-petrochemical" },
  {
    kind: "stat",
    key: "families",
    tone: "ink",
    figure: "28",
    unit: "families",
    title: "Product families held",
    body: "Five world-class principals carried across twenty-eight product families, stocked against project programmes.",
  },

  // ---- Row two ----
  { kind: "photo", key: "water-wastewater", slug: "water-wastewater" },
  {
    kind: "solid",
    key: "approvals",
    tone: "ink",
    title: "Approvals carried, not claimed",
    body: "Data sheets, pull-off assays, fire ratings and potable-contact certification travel with every delivery note.",
  },
  {
    kind: "solid",
    key: "validation",
    tone: "amber",
    title: "On site before the first coat",
    body: "Substrate moisture, surface profile and ambient readings taken, mock-ups run, applicators briefed.",
  },
  { kind: "photo", key: "food-beverage", slug: "food-beverage" },
  { kind: "photo", key: "metals-fabrication", slug: "metals-fabrication" },
  { kind: "photo", key: "healthcare-life-sciences", slug: "healthcare-life-sciences" },
]

const TONE_CLASS = {
  ink: "bg-ink text-white",
  graphite: "bg-[#2c303f] text-white",
  amber: "bg-amber text-ink",
} as const

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
  const bySlug = React.useMemo(
    () => new Map(industries.map((industry) => [industry.slug, industry])),
    [industries],
  )

  return (
    <ul className="grid grid-cols-2 gap-px bg-ink/10 sm:grid-cols-3 lg:grid-cols-6">
      {MOSAIC.map((tile) => {
        const spanClass = tile.span === 2 ? "sm:col-span-2" : undefined

        if (tile.kind === "void") {
          return (
            <li
              key={tile.key}
              aria-hidden="true"
              className={cn("hidden bg-off lg:block", spanClass)}
            />
          )
        }

        if (tile.kind === "photo") {
          const industry = bySlug.get(tile.slug)
          if (!industry) return null

          return (
            <li key={tile.key} className={spanClass}>
              <MosaicPhotoTile
                industry={industry}
                isDimmed={
                  highlightedSlugs !== null && !highlightedSlugs.has(tile.slug)
                }
                onOpen={() => onOpenDetail(industry)}
              />
            </li>
          )
        }

        return (
          <li
            key={tile.key}
            className={cn(
              "relative flex aspect-[4/5] flex-col justify-end p-5 transition-opacity duration-500 sm:aspect-square sm:p-6",
              TONE_CLASS[tile.tone],
              highlightedSlugs !== null && "opacity-45",
              spanClass,
            )}
          >
            {tile.kind === "stat" && (
              <p className="mb-auto flex items-baseline gap-1.5 tracking-[-0.04em]">
                <span className="tnum text-[clamp(2.6rem,4.4vw,3.6rem)] font-medium leading-none">
                  {tile.figure}
                </span>
                <span className="text-[13px] font-medium tracking-normal opacity-70">
                  {tile.unit}
                </span>
              </p>
            )}

            <h3 className="text-[15px] font-medium leading-[1.3] tracking-[-0.01em] sm:text-base">
              {tile.title}
            </h3>
            <p
              className={cn(
                "mt-2 text-[12.5px] leading-[1.55]",
                tile.tone === "amber" ? "text-ink/70" : "text-white/65",
              )}
            >
              {tile.body}
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

      <span className="relative mb-auto truncate text-[10.5px] font-medium uppercase tracking-[0.14em] text-white/60">
        {getCategoryLabelForSlug(industry.slug)}
      </span>

      <h3 className="relative flex items-start justify-between gap-2 text-[15px] font-medium leading-[1.3] tracking-[-0.01em] text-white sm:text-base">
        {industry.name}
        <ArrowUpRight className="mt-0.5 size-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </h3>

      <p className="relative mt-2 text-[12.5px] leading-[1.55] text-white/70">
        {industry.challenge}
      </p>
    </button>
  )
}
