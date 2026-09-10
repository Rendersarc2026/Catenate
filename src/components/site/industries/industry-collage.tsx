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
            <div
              key={industry.slug}
              style={{
                gridColumn: shapes[index].col,
                gridRow: shapes[index].row,
                animationDelay: `${index * 45}ms`,
              }}
              className="bento-tile-enter flex min-h-0 min-w-0"
            >
              <BentoTile
                industry={industry}
                index={index}
                shape={shapes[index]}
                onOpenDetail={onOpenDetail}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface BentoTileProps {
  industry: Industry;
  index?: number;
  shape: TileShape;
  onOpenDetail: (industry: Industry) => void;
}

const BentoTile = React.memo(function BentoTile({
  industry,
  shape,
  onOpenDetail,
}: BentoTileProps) {
  const handleOpen = React.useCallback(() => {
    onOpenDetail(industry);
  }, [industry, onOpenDetail]);

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label={`${industry.name} — open full specification`}
      className={cn(
        "group relative isolate size-full overflow-hidden rounded-[clamp(14px,1.4vw,22px)] text-left outline-none",
        "transition-[transform,box-shadow] duration-500 ease-expo motion-reduce:transition-none",
        "hover:z-10 hover:-translate-y-0.5 cursor-pointer",
        "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        "bg-black ring-1 ring-inset ring-white/10 hover:ring-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]",
      )}
      style={{
        contain: "layout style paint",
      }}
    >
      <PhotoFace industry={industry} feature={shape.feature} />
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
        className="object-cover transition-transform duration-700 ease-expo motion-reduce:transition-none scale-[1.04] group-hover:scale-100"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 via-60% to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end gap-1.5 p-[clamp(14px,1.5vw,22px)] text-white">
        <h3
          className={cn(
            "font-medium leading-tight tracking-tight text-balance",
            feature
              ? "text-[clamp(19px,2vw,27px)]"
              : "text-[14px] sm:text-[15.5px]",
          )}
        >
          {industry.name}
        </h3>

        {feature ? (
          <>
            <p className="max-w-[42ch] text-[13.5px] leading-[1.5] text-white/75">
              {industry.challenge}
            </p>
            <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
              <Layers className="size-3" />
              {industry.systems.length} systems
            </span>
          </>
        ) : (
          <div className="flex items-center justify-between gap-2 text-[12px] text-white/75">
            <span className="truncate text-white/75">{industry.reference}</span>
            <span className="shrink-0 text-[11px] text-white/60">
              {industry.systems.length} systems
            </span>
          </div>
        )}
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
