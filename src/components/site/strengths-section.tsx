"use client";

import * as React from "react";

import { Reveal } from "@/components/site/reveal";
import { strengths } from "@/data/catenate";
import { createScrollTrack } from "@/lib/scroll-track";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/*
 * "Our strengths" reads as a dial. The strengths sit at equal angles on one
 * large circle whose centre is off the left edge, so only the arc's right
 * shoulder crosses the screen. Scrolling turns the dial: whichever strength
 * reaches three o'clock steps off the arc, comes up to full size and ink,
 * and its copy sets beside it. The others stay on the rim, tilted with the
 * wheel, and fall away as they turn out of reach.
 *
 * The list is a real ordered list and every strength is always in the DOM —
 * the dial is a way of laying it out, not a way of hiding it.
 */

/** Angular gap between neighbouring strengths on the rim. */
const STEP_DEG = 13;
/*
 * Narrow screens have no room beside the dial, so the wheel turns on its side:
 * its centre drops below the screen and the strengths ride the top of the rim,
 * seating at twelve o'clock with the copy set underneath. Nearer neighbours
 * there sit further apart, so the step opens up.
 */
const ARC_STEP_DEG = 15;
/** Scroll spent on each strength past the first, in viewport heights. */
const STEP_VH = 30;
/*
 * The numeral is sized by its own font-size rather than by a transform. A
 * scaled-up glyph is rasterised at its layout size and stretched, which is
 * what made the seated numeral look soft; interpolating font-size means every
 * numeral is rasterised at the size it is actually drawn at.
 */
/** Numerals stop drawing this many steps out from the active one. */
const FALLOFF = 3.3;
/** Share of each scroll segment spent turning rather than resting. */
const TURN = 0.5;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

/** easeInOutCubic — the dial settles into each strength and out again. */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * The dial needs room across the page for the rim, the seated numeral and the
 * copy beside it. Narrower than this the wheel turns on its side instead.
 */
function useDialFits() {
  return useMediaQuery("(min-width: 1024px)");
}

/** Which layout the strengths take. */
type Layout = "side" | "arc" | "list";

const numeral = (index: number) => String(index + 1).padStart(2, "0");

function Heading({ className }: { className?: string }) {
  return (
    <Reveal className={className}>
      <span className="eyebrow">Our strengths</span>
      <h2 className="max-w-[24ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
        Eight reasons we make a difference.
      </h2>
    </Reveal>
  );
}

export function StrengthsSection() {
  const reducedMotion = usePrefersReducedMotion();
  const dialFits = useDialFits();
  const layout: Layout = reducedMotion ? "list" : dialFits ? "side" : "arc";
  const showDial = layout !== "list";

  const trackRef = React.useRef<HTMLElement>(null);
  const numeralRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const glyphRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const dotRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const copyRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    if (!showDial) return;

    const track = trackRef.current;
    if (!track) return;

    const last = strengths.length - 1;
    const arc = layout === "arc";
    const step = arc ? ARC_STEP_DEG : STEP_DEG;

    /**
     * Progress to a position on the dial. Each strength holds the three
     * o'clock slot for the back half of its segment, so the wheel arrives
     * and rests rather than turning without pause.
     */
    const positionAt = (p: number) => {
      if (last < 1) return 0;
      const seat = p * last;
      const index = Math.min(Math.floor(seat), last - 1);
      const within = seat - index;
      return index + easeInOut(clamp01((within - (1 - TURN) / 2) / TURN));
    };

    const paint = (position: number) => {
      for (let i = 0; i <= last; i++) {
        const offset = i - position;
        const distance = Math.abs(offset);
        /* Fades the rim out rather than wrapping numerals behind the copy. */
        const visible = clamp01(1 - distance / FALLOFF);

        const holder = numeralRefs.current[i];
        const glyph = glyphRefs.current[i];
        const dot = dotRefs.current[i];
        const copy = copyRefs.current[i];

        /*
         * Past the falloff a strength is drawn at nothing and its copy is
         * already dark; there is no visible difference left to paint, so the
         * far side of the dial costs nothing to carry. Only the two or three
         * strengths actually on screen are restyled per frame.
         */
        if (visible <= 0.001) {
          if (holder && holder.style.visibility !== "hidden") {
            holder.style.visibility = "hidden";
            holder.style.opacity = "0";
          }
          if (dot && dot.style.opacity !== "0") dot.style.opacity = "0";
          if (copy && copy.style.opacity !== "0") {
            copy.style.opacity = "0";
            copy.style.pointerEvents = "none";
          }
          continue;
        }

        /* 1 while seated at three o'clock, 0 by the next strength along. */
        const seated = clamp01(1 - distance);
        const angle = offset * step;
        const theta = (arc ? angle - 90 : angle).toFixed(2);

        if (holder) {
          /* On the arc the frame is turned back upright at the rim, so the
             numeral only leans by its own angle off twelve o'clock. */
          holder.style.transform = `rotate(${theta}deg) translateX(calc(var(--dial-r) + var(--dial-pull) * ${seated.toFixed(3)}))${arc ? " rotate(90deg)" : ""}`;
          holder.style.opacity = visible.toFixed(3);
          holder.style.visibility = "visible";
        }

        if (glyph) {
          /* On the rim the numeral is centred on its dot; as it seats it
             swings clear so the dot reads as the marker and the numeral as
             the label. The percentages track the glyph's own box, so they
             stay correct as it grows. */
          glyph.style.fontSize = `calc(var(--numeral-rim) + (var(--numeral-seat) - var(--numeral-rim)) * ${seated.toFixed(3)})`;
          glyph.style.transform = arc
            ? `translate(-50%, ${(-50 - 50 * seated).toFixed(1)}%)`
            : `translate(${(-50 + 50 * seated).toFixed(1)}%, -50%)`;
          glyph.style.color = `rgb(26 29 46 / ${(0.11 + 0.89 * seated).toFixed(3)})`;
        }

        if (dot) {
          dot.style.transform = `rotate(${theta}deg) translateX(var(--dial-r))`;
          dot.style.opacity = (visible * (0.22 + 0.78 * seated)).toFixed(3);
        }

        if (copy) {
          /* Only the seated strength is drawn, but every one stays in the
             accessibility tree — so this fades with opacity and never with
             `visibility`, which would take the other seven out of it. */
          const shown = clamp01((seated - 0.62) / 0.38);
          copy.style.opacity = shown.toFixed(3);
          copy.style.transform = `translateY(${((1 - shown) * 14 * Math.sign(offset || 1)).toFixed(1)}px)`;
          copy.style.pointerEvents = shown <= 0.5 ? "none" : "auto";
        }
      }
    };

    return createScrollTrack({
      element: track,
      map: positionAt,
      paint,
      smoothing: 0.096,
    });
  }, [showDial, layout]);

  /* With motion turned down the strengths set as the numbered list they
     already are. */
  if (!showDial) {
    return (
      <section id="strengths" className="section bg-white">
        <Heading />
        <ol className="mt-[clamp(28px,4vw,56px)] grid gap-[clamp(24px,3vw,40px)] sm:grid-cols-2">
          {strengths.map((item, index) => (
            <li key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5">
              <span className="tnum text-[2.4rem] leading-[0.85] font-extrabold tracking-[-0.04em] text-ink/15">
                {numeral(index)}
              </span>
              <div>
                <h3 className="text-[1.05rem] leading-[1.2] font-semibold tracking-[-0.015em]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.65] text-grey">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (layout === "arc") {
    return (
      <section
        ref={trackRef}
        id="strengths"
        className="relative bg-white"
        style={{ minHeight: `calc(100svh + ${(strengths.length - 1) * STEP_VH}vh)` }}
      >
        <div className="content-pad sticky top-0 flex h-svh flex-col overflow-hidden [contain:layout_paint] pt-[calc(var(--nav-height)+clamp(20px,4vh,40px))] pb-[clamp(20px,4vh,40px)]">
          <Heading className="relative z-10" />

          <ol
            className="relative mt-[clamp(8px,2vh,24px)] min-h-0 flex-1"
            style={
              {
                "--dial-r": "clamp(420px, 115vw, 760px)",
                "--dial-pull": "clamp(14px, 3vw, 24px)",
                /* Height of twelve o'clock within the list. */
                "--arc-apex": "clamp(96px, 32%, 240px)",
                "--numeral-rim": "clamp(1.4rem, 5.4vw, 2rem)",
                "--numeral-seat": "clamp(3rem, 14vw, 4.6rem)",
              } as React.CSSProperties
            }
          >
            {/* The rim, its top edge crossing the screen as a shallow arc. */}
            <span
              aria-hidden
              className="pointer-events-none absolute rounded-full border border-ink/8"
              style={{
                width: "calc(var(--dial-r) * 2)",
                height: "calc(var(--dial-r) * 2)",
                left: "calc(50% - var(--dial-r))",
                top: "var(--arc-apex)",
              }}
            />

            {strengths.map((item, index) => (
              <li key={item.title}>
                {/* A zero-size pivot at the wheel's centre, below the screen. */}
                <span
                  ref={(el) => {
                    numeralRefs.current[index] = el;
                  }}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 block size-0 origin-top-left will-change-transform"
                  style={{ top: "calc(var(--arc-apex) + var(--dial-r))" }}
                >
                  <span
                    ref={(el) => {
                      glyphRefs.current[index] = el;
                    }}
                    className="tnum absolute top-0 left-0 block text-[length:var(--numeral-rim)] leading-none font-extrabold tracking-[-0.045em] whitespace-nowrap"
                  >
                    {numeral(index)}
                  </span>
                </span>

                <span
                  ref={(el) => {
                    dotRefs.current[index] = el;
                  }}
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 size-1.25 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink origin-top-left will-change-transform"
                  style={{ top: "calc(var(--arc-apex) + var(--dial-r))" }}
                />

                <div
                  ref={(el) => {
                    copyRefs.current[index] = el;
                  }}
                  className="absolute left-1/2 w-full max-w-[36ch] -translate-x-1/2 text-center will-change-[opacity,transform]"
                  style={{ top: "calc(var(--arc-apex) + clamp(48px, 9vh, 72px))" }}
                >
                  <h3 className="text-[clamp(1.2rem,4.8vw,1.5rem)] leading-[1.2] font-semibold tracking-[-0.02em] text-ink text-balance">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-[1.6] text-grey">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={trackRef}
      id="strengths"
      className="relative bg-white"
      style={{ minHeight: `calc(100svh + ${(strengths.length - 1) * STEP_VH}vh)` }}
    >
      {/* The heading and the dial share one grid cell, so the dial centres on
          the viewport rather than on whatever room the heading leaves below
          it. Matching top and bottom padding puts that centre clear of the
          nav. */}
      <div className="content-pad sticky top-0 grid h-svh grid-cols-1 grid-rows-[minmax(0,1fr)] overflow-hidden [contain:layout_paint] pt-[calc(var(--nav-height)+clamp(20px,4vh,52px))] pb-[clamp(20px,4vh,52px)]">
        <Heading className="relative z-10 col-start-1 row-start-1 self-start" />

        <ol
          className="relative col-start-1 row-start-1 min-h-0"
          style={
            {
              "--dial-r": "clamp(340px, 38vw, 560px)",
              /* How far the seated numeral steps off the rim. */
              "--dial-pull": "clamp(30px, 4vw, 68px)",
              /* The seated pair: the numeral, a gap, then the copy column. */
              "--copy-gap": "clamp(96px, 12vw, 210px)",
              "--copy-max": "clamp(340px, 26vw, 480px)",
              /*
               * Distance from the rail's left edge to the arc's shoulder.
               * Derived rather than picked: the seated pair starts one pull
               * past the shoulder and ends at the copy column's right edge,
               * and this leaves equal rail either side of it at every width.
               */
              "--dial-apex":
                "max(140px, calc((100% - var(--copy-gap) - var(--copy-max)) / 2 - var(--dial-pull)))",
              "--numeral-rim": "clamp(1.7rem, 3.1vw, 2.75rem)",
              "--numeral-seat": "clamp(3.6rem, 6.7vw, 5.9rem)",
            } as React.CSSProperties
          }
        >
          {/* The rim. One circle, almost all of it off screen. */}
          <span
            aria-hidden
            className="pointer-events-none absolute rounded-full border border-ink/8"
            style={{
              width: "calc(var(--dial-r) * 2)",
              height: "calc(var(--dial-r) * 2)",
              left: "calc(var(--dial-apex) - var(--dial-r) * 2)",
              top: "50%",
              marginTop: "calc(var(--dial-r) * -1)",
            }}
          />

          {strengths.map((item, index) => (
            <li key={item.title}>
              {/* Numeral, carried at the wheel's centre and swung out to the
                  rim by its own angle. */}
              <span
                ref={(el) => {
                  numeralRefs.current[index] = el;
                }}
                aria-hidden
                className="pointer-events-none absolute top-1/2 block origin-left will-change-transform"
                style={{ left: "calc(var(--dial-apex) - var(--dial-r))" }}
              >
                <span
                  ref={(el) => {
                    glyphRefs.current[index] = el;
                  }}
                  className="tnum block text-[length:var(--numeral-rim)] leading-none font-extrabold tracking-[-0.045em]"
                >
                  {numeral(index)}
                </span>
              </span>

              {/* Rim marker, so the arc reads as a scale rather than a stray
                  curve. */}
              <span
                ref={(el) => {
                  dotRefs.current[index] = el;
                }}
                aria-hidden
                className="pointer-events-none absolute top-1/2 size-1.25 -translate-y-1/2 rounded-full bg-ink origin-left will-change-transform"
                style={{ left: "calc(var(--dial-apex) - var(--dial-r))" }}
              />

              <div
                ref={(el) => {
                  copyRefs.current[index] = el;
                }}
                className="absolute top-1/2 -translate-y-1/2 will-change-[opacity,transform]"
                style={{
                  left: "calc(var(--dial-apex) + var(--dial-pull) + var(--copy-gap))",
                  width: "var(--copy-max)",
                }}
              >
                <h3 className="max-w-[20ch] text-[clamp(1.25rem,1.9vw,1.75rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[clamp(15px,1.05vw,17px)] leading-[1.65] text-grey">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
