"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Layers } from "lucide-react";

import { images, type Industry } from "@/data/catenate";
import { cn } from "@/lib/utils";

/**
 * Bento layouts, keyed by how many sectors are in view. Each preset is a set of
 * explicit column/row spans over a 4x4 grid that together tile a complete
 * rectangle -- a category of four and one of five need different arrangements
 * to come out gapless, so the count picks the layout rather than a fixed cycle.
 *
 * `feature` marks the anchor tile: the large one that carries full copy.
 */
type TileShape = {
  col: string;
  row: string;
  feature: boolean;
};

const LAYOUTS: Record<number, TileShape[]> = {
  2: [
    { col: "span 2", row: "span 2", feature: true },
    { col: "span 2", row: "span 2", feature: false },
  ],
  3: [
    { col: "span 2", row: "span 2", feature: true },
    { col: "span 2", row: "span 1", feature: false },
    { col: "span 2", row: "span 1", feature: false },
  ],
  4: [
    { col: "span 2", row: "span 2", feature: true },
    { col: "span 2", row: "span 1", feature: false },
    { col: "span 1", row: "span 1", feature: false },
    { col: "span 1", row: "span 1", feature: false },
  ],
  5: [
    { col: "span 2", row: "span 2", feature: true },
    { col: "span 1", row: "span 1", feature: false },
    { col: "span 1", row: "span 1", feature: false },
    { col: "span 1", row: "span 1", feature: false },
    { col: "span 1", row: "span 1", feature: false },
  ],
};

function layoutFor(count: number): TileShape[] {
  const preset = LAYOUTS[count];
  if (preset) return preset;
  // Past the presets, fall back to an even two-across grid so nothing breaks.
  return Array.from({ length: count }, (_, i) => ({
    col: "span 2",
    row: "span 1",
    feature: i === 0,
  }));
}

interface IndustryCollageProps {
  industries: Industry[];
  onOpenDetail: (industry: Industry) => void;
}

export function IndustryCollage({
  industries,
  onOpenDetail,
}: IndustryCollageProps) {
  const shapes = React.useMemo(
    () => layoutFor(industries.length),
    [industries.length],
  );

  return (
    <div className="relative isolate flex min-h-0 flex-1">
      <div className="mx-auto flex w-full max-w-[var(--content-max)] min-h-0 flex-1 flex-col px-[clamp(16px,4vw,40px)]">
        {/* Bento grid. Single column on phones, the full arrangement from sm up
            -- the presets assume four columns and would shear below that. */}
        <div
          className={cn(
            "grid min-h-0 flex-1 gap-[clamp(10px,1vw,16px)]",
            "grid-cols-1 sm:grid-cols-4",
            "auto-rows-[minmax(148px,auto)] sm:auto-rows-[minmax(clamp(120px,12vw,180px),1fr)]",
          )}
        >
          {industries.map((industry, index) => (
            <BentoTile
              key={industry.slug}
              industry={industry}
              index={index}
              shape={shapes[index]}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface BentoTileProps {
  industry: Industry;
  index: number;
  shape: TileShape;
  onOpenDetail: (industry: Industry) => void;
}

const BentoTile = React.memo(function BentoTile({
  industry,
  index,
  shape,
  onOpenDetail,
}: BentoTileProps) {
  const handleOpen = React.useCallback(() => {
    onOpenDetail(industry);
  }, [industry, onOpenDetail]);

  // The reference alternates photography with flat panels. Area decides first:
  // a tile with room to fill earns a photograph, since a large flat panel just
  // reads as a hole. Only the smaller tiles alternate flat and accent grounds.
  const isWide = shape.col !== "span 1";
  const face: "photo" | "flat" | "accent" =
    shape.feature || isWide ? "photo" : index % 2 === 1 ? "flat" : "accent";

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label={`${industry.name} — open full specification`}
      className={cn(
        "group relative isolate overflow-hidden rounded-[clamp(14px,1.4vw,22px)] text-left outline-none",
        "transition-[transform,box-shadow] duration-500 ease-expo motion-reduce:transition-none",
        "hover:z-10 hover:-translate-y-0.5 cursor-pointer",
        "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        // Sleek obsidian panels on black
        face === "flat" &&
          "bg-[#11131a] ring-1 ring-inset ring-white/15 hover:ring-white/30 supports-backdrop-filter:bg-neutral-900/80 supports-backdrop-filter:backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
        face === "accent" &&
          "bg-[#0d0f14] ring-1 ring-inset ring-white/10 hover:ring-white/25 supports-backdrop-filter:bg-neutral-950/70 supports-backdrop-filter:backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
        face === "photo" && "bg-black ring-1 ring-inset ring-white/10 hover:ring-white/20",
      )}
      style={{
        gridColumn: shape.col,
        gridRow: shape.row,
        // Isolates each tile's rendering; blurred backdrops are expensive to
        // repaint, so keep their work from spilling into the rest of the grid.
        contain: "layout style paint",
      }}
    >
      {/* Specular top edge -- the highlight that reads as a lit pane rather
          than a flat translucent rectangle. */}
      {face !== "photo" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
      )}

      {face === "photo" && (
        <PhotoFace industry={industry} feature={shape.feature} />
      )}
      {face === "accent" && <AccentFace industry={industry} />}
      {face === "flat" && <FlatFace industry={industry} />}
    </button>
  );
});

function PhotoFace({
  industry,
  feature,
}: {
  industry: Industry;
  feature: boolean;
}) {
  return (
    <>
      <Image
        src={images.industry(industry.slug)}
        alt=""
        aria-hidden
        fill
        sizes={
          feature
            ? "(max-width: 640px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, 25vw"
        }
        priority={feature}
        className="object-cover transition-transform duration-700 ease-expo motion-reduce:transition-none scale-[1.04] group-hover:scale-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 via-60% to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end gap-1.5 p-[clamp(14px,1.5vw,22px)] text-white">
        <h3
          className={cn(
            "font-medium leading-tight tracking-tight text-balance",
            feature
              ? "text-[clamp(19px,2vw,27px)]"
              : "text-[14px] sm:text-[15px]",
          )}
        >
          {industry.name}
        </h3>

        {/* Only the anchor tile has room for the challenge line; the small
            tiles would clip it into noise. */}
        {feature && (
          <>
            <p className="max-w-[42ch] text-[13.5px] leading-[1.5] text-white/75">
              {industry.challenge}
            </p>
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
              <Layers className="size-3" />
              {industry.systems.length} systems
            </span>
          </>
        )}
      </div>

      <TileCorner tone="light" />
    </>
  );
}

/** Saturated panel: no photograph, so the sector name carries the tile. */
function AccentFace({ industry }: { industry: Industry }) {
  return (
    <>
      <div className="absolute inset-0 flex flex-col justify-between gap-2 p-[clamp(14px,1.4vw,20px)] text-white">
        <span className="text-[11px] tracking-[0.14em] text-white/50 uppercase">
          {String(industry.systems.length).padStart(2, "0")} systems
        </span>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-[15px] font-medium leading-tight tracking-tight text-balance sm:text-[17px]">
            {industry.name}
          </h3>
          <p className="line-clamp-2 text-[12px] leading-[1.45] text-white/55">
            {industry.challenge}
          </p>
        </div>
      </div>

      <TileCorner tone="light" />
    </>
  );
}

/** The brighter pane: carries the systems list rather than a photograph. */
function FlatFace({ industry }: { industry: Industry }) {
  return (
    <>
      <div className="absolute inset-0 flex flex-col justify-between gap-2 p-[clamp(14px,1.4vw,20px)]">
        <div className="flex flex-col gap-1">
          <h3 className="text-[15px] font-medium leading-tight tracking-tight text-white text-balance sm:text-[17px]">
            {industry.name}
          </h3>
          <p className="truncate text-[11px] text-white/50">
            {industry.reference}
          </p>
        </div>

        <ul className="flex flex-col gap-1 text-[11.5px] leading-tight text-white/60">
          {industry.systems.slice(0, 3).map((system) => (
            <li key={system} className="truncate border-t border-white/12 pt-1">
              {system}
            </li>
          ))}
        </ul>
      </div>

      <TileCorner tone="light" />
    </>
  );
}

/** Shared hover affordance, pinned to the tile's top-right corner. */
function TileCorner({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute right-2.5 top-2.5 grid size-6 place-items-center rounded-full",
        "opacity-0 transition-opacity duration-300 ease-expo motion-reduce:transition-none",
        "group-hover:opacity-100 group-focus-visible:opacity-100",
        tone === "light"
          ? "bg-white text-black"
          : "bg-black text-white border border-white/20",
      )}
    >
      <ArrowUpRight className="size-3.5" />
    </span>
  );
}
