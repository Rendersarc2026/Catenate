"use client";

import Image from "next/image";
import * as React from "react";
import { hero, images } from "@/data/catenate";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/** Peak translation of the mouse parallax layer, in px. */
const PARALLAX_X = 14;
const PARALLAX_Y = 10;

/*
 * Earth geometry, measured off `public/images/hero-earth.webp` itself: the
 * crown of the limb sits 0.4471 of the way up the frame, and the arc falls to
 * 0.0806 at either edge. Re-measure both if the picture is ever replaced — they
 * describe that file and nothing else.
 *
 * Full-bleed `object-cover` cannot give a low horizon with this picture. Earth
 * fills the bottom 55% of the source, so showing the whole frame always shows a
 * planet more than half the section tall, and the copy has nowhere to sit but
 * on top of it. The frame is held wider than the window instead and dropped
 * until only the crown clears the bottom edge: what is left on screen is the
 * flat middle of the arc, and the copy sits on open sky.
 */
const IMG_W = 2000;
const IMG_H = 1116;
const FRAME_ASPECT = `${IMG_W} / ${IMG_H}`;
/** Frame width against the window. Wider reads flatter and sits lower. */
const FRAME_VW = 200;
/** Height of the crown above the frame's own bottom edge, in vw. */
const CROWN_VW = (FRAME_VW * IMG_H * 0.4471) / IMG_W;

/*
 * Height of the visible arc at its centre — the one number to reach for when
 * the planet wants to sit higher or lower. Fenced on both sides, because the
 * curve is measured in widths and the window is not:
 *
 *  - the floor is the sagitta, how far the limb falls away between the centre
 *    of the window and its edge: 8.9% of the width at this frame size. Any less
 *    and a wide, short window keeps black in its bottom corners.
 *  - the ceiling is the picture, which carries only `CROWN_VW` of planet below
 *    the crown. A tall phone asking for 18vh wants more than that.
 */
const ARC = "clamp(9.5vw, 18vh, 34vw)";

/**
 * The section's ground, and the sky the picture was shot against: rgb(3 5 16).
 * The two have to match. The frame stops partway up a tall window, and anything
 * other than the photograph's own black draws a line where it ends.
 */
const HERO_SKY = "#030510";

/*
 * Star field, drawn to carry on where the photograph stops. On a wide window the
 * frame reaches the top of the section and none of this shows; on a tall one — a
 * phone especially — it only reaches part way up, and what is above it would
 * otherwise be an empty wash. Sized and weighted to pass for the picture's own
 * stars, and biased towards the top, since the bottom of the field sits behind
 * the planet either way.
 *
 * Fixed seed, so the server and the client lay out the same sky and hydration
 * has nothing to reconcile.
 */
const STARS = (() => {
  let seed = 0x9e3779b9;
  const rand = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return Array.from({ length: 120 }, () => ({
    x: +(rand() * 1600).toFixed(1),
    y: +(Math.pow(rand(), 1.35) * 900).toFixed(1),
    r: +(0.4 + rand() * 0.85).toFixed(2),
    o: +(0.18 + rand() * 0.5).toFixed(2),
  }));
})();

export function Hero() {
  const [ready, setReady] = React.useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const containerRef = React.useRef<HTMLElement>(null);
  const mouseParallaxRef = React.useRef<HTMLDivElement>(null);

  // Play the entrance on mount
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Interactive mouse parallax when at top
  React.useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame: number | null = null;

    const tick = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (mouseParallaxRef.current) {
        mouseParallaxRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      const settled =
        Math.abs(targetX - currentX) < 0.05 &&
        Math.abs(targetY - currentY) < 0.05;
      frame = settled ? null : requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    /*
     * Gated on the hero still being on screen, and gated by an observer rather
     * than by a measurement. The listener is on the window, so it fires for
     * every mouse move anywhere on the page — and the bounds check it used to
     * open with called `getBoundingClientRect` each time, which forces the
     * browser to flush layout. That is a whole-page cost for an effect that
     * only means anything in the top screenful. The observer answers the same
     * question for free, and the one rect read left happens only while the
     * reader is actually in the hero.
     */
    let onScreen = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
        if (!onScreen) {
          targetX = 0;
          targetY = 0;
          start();
        }
      },
      { rootMargin: "0px" },
    );
    observer.observe(container);

    const onMouseMove = (event: MouseEvent) => {
      if (!onScreen) return;
      const rect = container.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * PARALLAX_X;
      targetY =
        ((event.clientY - rect.top) / window.innerHeight - 0.5) * PARALLAX_Y;
      start();
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Home"
      style={{ "--earth-arc": ARC, "--hero-sky": HERO_SKY } as React.CSSProperties}
      className={`${ready ? "is-ready " : ""}on-blue relative isolate h-screen h-dvh min-h-[620px] w-full overflow-hidden [contain:layout_paint] flex flex-col justify-between text-center text-white bg-[var(--hero-sky)] pt-[100px] pb-8 sm:pt-[110px] sm:pb-10 content-pad select-none`}
    >
      {/* 1. Space & Earth: High-resolution orbital Earth with atmospheric limb and stars. */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 size-full opacity-70"
        >
          {STARS.map((star, i) => (
            <circle
              key={i}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#ffffff"
              fillOpacity={star.o}
            />
          ))}
        </svg>

        <div
          className="absolute left-1/2 max-w-none -translate-x-1/2"
          style={{
            width: `${FRAME_VW}vw`,
            aspectRatio: FRAME_ASPECT,
            bottom: `calc(var(--earth-arc) - ${CROWN_VW.toFixed(2)}vw)`,
          }}
        >
          <Image
            src={images.heroEarth}
            alt="Planet Earth from orbit"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Subtle radial vignette around the headline for contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_40%,transparent_28%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.55)_100%)]" />

        {/* Soft shading along the top, where the nav sits. Nothing along the
            bottom: the scrim there was darkening the lit edge of the planet,
            which is the one thing in the section worth looking at. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/25 to-transparent" />
      </div>

      {/* 2. Headline, centred in the open sky above the limb. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div ref={mouseParallaxRef} className="will-change-transform">
          <h1 className="mx-auto text-[clamp(2rem,4vw,3.5rem)] leading-[1.18] font-light tracking-[-0.022em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7),0_6px_38px_rgba(0,0,0,0.8)]">
            {hero.headlineLines.map((line) => (
              <span
                key={line}
                className="hero-line block whitespace-normal sm:whitespace-nowrap"
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      {/* 3. Stats row, sat in the dark band above the limb rather than on it. */}
      <div
        className="hero-fade relative z-10 mx-auto grid w-full max-w-[1220px] shrink-0 grid-cols-4 max-[720px]:grid-cols-2 max-[720px]:gap-y-5"
        style={{ marginBottom: "calc(var(--earth-arc) + 3vh)" }}
      >
        {hero.stats.map((stat) => (
          <div
            key={stat.label}
            className="border-l border-white/12 px-4 py-1 text-center first:border-l-0 max-[720px]:nth-3:border-l-0"
          >
            <b className="tnum block text-[clamp(1.5rem,2.6vw,2.1rem)] leading-none font-light tracking-[-0.03em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">
              {stat.value}
            </b>
            <span className="mt-2 block text-[10px] tracking-[0.18em] text-white/50 uppercase font-normal [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
