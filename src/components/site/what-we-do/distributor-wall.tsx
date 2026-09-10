"use client"

import Image from "next/image"
import Link from "next/link"
import * as React from "react"

import { brands } from "@/data/catenate"
import { cn } from "@/lib/utils"

/** Flex weights: an untouched wall is even, an open one favours its column. */
const WEIGHT_EVEN = 1
const WEIGHT_OPEN = 2.6
const WEIGHT_ASIDE = 0.78

/**
 * The wall's colour ramp, walked from the palest column to the deepest. Read
 * between the stops so the gradient holds its shape whatever the brand count.
 */
const RAMP = ["#6c7082", "#4a4e5e", "#33374a", "#1e2130", "#0b0d14"]

function mix(a: string, b: string, t: number) {
  const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
  const [ar, ag, ab] = channels(a)
  const [br, bg, bb] = channels(b)
  const to = (from: number, target: number) =>
    Math.round(from + (target - from) * t)
      .toString(16)
      .padStart(2, "0")
  return `#${to(ar, br)}${to(ag, bg)}${to(ab, bb)}`
}

/** Colour for the nth column of `count`, read along the ramp. */
function tone(index: number, count: number) {
  const at = count < 2 ? 0 : (index / (count - 1)) * (RAMP.length - 1)
  const low = Math.min(Math.floor(at), RAMP.length - 2)
  return mix(RAMP[low], RAMP[low + 1], at - low)
}

export type DistributorWallProps = {
  /** Set while the wall is still coming across, so it ignores the pointer. */
  idle?: boolean
}

export function DistributorWall({ idle = false }: DistributorWallProps) {
  const [open, setOpen] = React.useState<number | null>(null)
  const openIndex = idle ? null : open

  return (
    <div
      onPointerLeave={(event) => {
        /* A tap ends with a leave; only a mouse leaving should shut a column. */
        if (event.pointerType === "mouse") setOpen(null)
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(null)
      }}
      className={cn(
        "relative flex size-full max-md:flex-col",
        idle && "pointer-events-none"
      )}
    >
      {brands.map((brand, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={brand.name}
            style={{
              flexGrow:
                openIndex === null ? WEIGHT_EVEN : isOpen ? WEIGHT_OPEN : WEIGHT_ASIDE,
            }}
            onPointerEnter={(event) => {
              /* Touch fires a pointerenter on tap; leave those to the click. */
              if (event.pointerType === "mouse") setOpen(index)
            }}
            className="relative basis-0 overflow-hidden transition-[flex-grow] duration-700 ease-expo"
          >
            <div
              style={{ background: tone(index, brands.length) }}
              className="relative flex size-full items-center justify-center px-4 text-center text-white"
            >
              {/* Darkens the palest columns just enough to hold the copy. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 bg-black/25 transition-opacity duration-700 ease-expo",
                  isOpen ? "opacity-100" : "opacity-0"
                )}
              />

              <button
                type="button"
                aria-expanded={isOpen}
                onFocus={() => setOpen(index)}
                /* Focus lands first on a tap, so a toggle here would undo it. */
                onClick={() => setOpen(index)}
                className="relative z-1 flex cursor-pointer items-center justify-center text-[clamp(15px,1.5vw,22px)] leading-[1.2] whitespace-nowrap"
              >
                {brand.logo ? (
                  /*
                   * Principal marks carry their own colours and several are
                   * reversed out (a white name inside a coloured shape), so a
                   * knockout to white would erase the wordmark. Each sits on a
                   * light plate instead, which keeps the mark as supplied.
                   */
                  <span className="inline-flex h-[clamp(46px,4.6vw,64px)] w-[clamp(150px,15vw,200px)] items-center justify-center rounded-[6px] bg-white px-[clamp(12px,1.2vw,20px)] shadow-sm">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={220}
                      height={64}
                      style={{ transform: `scale(${brand.logoScale ?? 1})` }}
                      className="h-[clamp(24px,2.6vw,36px)] w-full object-contain"
                    />
                  </span>
                ) : (
                  brand.name
                )}
              </button>

              {/*
               * The detail hangs off the centre line rather than sharing it, so
               * every name keeps its place in the row whichever column is open.
               */}
              <div
                inert={!isOpen}
                className={cn(
                  "absolute top-1/2 left-1/2 z-1 mt-[clamp(32px,3.8vw,52px)] w-[min(330px,68vw)] -translate-x-1/2 text-left transition-[opacity,translate] duration-700 ease-expo",
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                )}
              >
                <p className="text-[10px] tracking-[0.16em] text-white/55 uppercase">
                  Authorised distributor · {brand.familyCount}
                </p>
                <p className="mt-2.5 text-[14px] leading-[1.5] text-white/80">
                  {brand.description}
                </p>

                {/* The first thing to go where a stacked row is short. */}
                <ul className="mt-4 list-none max-md:hidden">
                  {brand.groups.map((group) => (
                    <li
                      key={group.title}
                      className="flex items-center gap-2.5 border-t border-white/16 py-2 text-[13px] text-white/70"
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full bg-white/50"
                      />
                      {group.title}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/brands"
                  className="mt-5 inline-flex items-center gap-2 text-[13px] tracking-[0.02em] text-white transition-opacity duration-250 ease-expo hover:opacity-70"
                >
                  Explore the range
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="size-3.5 fill-none stroke-current stroke-[1.6]"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
