"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { hero, images } from "@/data/catenate";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/** Peak translation of the mouse parallax layer, in px. */
const PARALLAX_X = 14;
const PARALLAX_Y = 10;

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
      className={`${ready ? "is-ready " : ""}on-blue relative isolate h-screen h-dvh min-h-[620px] w-full overflow-hidden [contain:layout_paint] flex flex-col justify-between text-center text-white bg-black pt-[100px] pb-8 sm:pt-[110px] sm:pb-10 content-pad select-none`}
    >
      {/* 1. Space & Earth: High-resolution orbital Earth with atmospheric limb and stars. */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src={images.heroEarth}
          alt="Planet Earth from orbit"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-bottom"
        />

        {/* Subtle radial vignette around the headline for contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_40%,transparent_28%,rgba(0,0,0,0.25)_70%,rgba(0,0,0,0.55)_100%)]" />

        {/* Soft edge shading for the nav and section boundary */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
      </div>

      {/* 2. Eyebrow, headline and the one action, centred in the empty sky. */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div ref={mouseParallaxRef} className="will-change-transform">
          <p className="hero-fade mx-auto mb-5 max-w-[34ch] sm:max-w-none text-[10px] sm:text-[11px] font-normal tracking-[0.18em] uppercase text-white/55 [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]">
            {hero.eyebrow}
          </p>

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

      {/* 3. Stats row, cleanly anchored along the bottom. */}
      <div className="hero-fade relative z-10 w-full max-w-[1220px] mx-auto grid grid-cols-4 shrink-0 max-[720px]:grid-cols-2 max-[720px]:gap-y-5">
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
