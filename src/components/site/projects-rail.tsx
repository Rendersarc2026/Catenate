"use client";

import Image from "next/image";
import * as React from "react";

import { Reveal } from "@/components/site/reveal";
import { images, projects } from "@/data/catenate";
import { cn } from "@/lib/utils";

export function ProjectsRail() {
  const railRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);

  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);
  const hasMovedRef = React.useRef(false);

  const checkScrollState = React.useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const { scrollLeft, scrollWidth, clientWidth } = rail;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
  }, []);

  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    checkScrollState();
    rail.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);

    return () => {
      rail.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const scroll = React.useCallback((direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) return;

    const card = rail.querySelector<HTMLElement>("article");
    const style = typeof window !== "undefined" ? window.getComputedStyle(rail) : null;
    const gap = style ? parseFloat(style.columnGap || style.gap) || 32 : 32;
    const cardWidth = card ? card.offsetWidth : 300;
    const scrollAmount = cardWidth + gap;

    rail.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const rail = railRef.current;
    if (!rail) return;

    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftRef.current = rail.scrollLeft;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || e.pointerType !== "mouse") return;
    const rail = railRef.current;
    if (!rail) return;

    const deltaX = e.pageX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasMovedRef.current = true;
    }
    rail.scrollLeft = scrollLeftRef.current - deltaX;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    setIsDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <section id="projects" className="section section-flush bg-off">
      <Reveal className="content-pad flex items-center justify-between pb-8.5">
        <span className="eyebrow mb-0">Projects</span>

        {/* Section header navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            className="grid size-[38px] cursor-pointer place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.2)] transition-[background-color,opacity,box-shadow,transform] duration-200 ease-expo hover:bg-ink/5 active:scale-95 disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-[15px] fill-none stroke-current stroke-[1.8]"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next projects"
            className="grid size-[38px] cursor-pointer place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.2)] transition-[background-color,opacity,box-shadow,transform] duration-200 ease-expo hover:bg-ink/5 active:scale-95 disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-[15px] fill-none stroke-current stroke-[1.8]"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Reveal>

      <div className="group/rail relative w-full">
        {/* Floating Prev Button */}
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous projects"
          className={cn(
            "absolute left-4 lg:left-8 top-[clamp(140px,18vw,200px)] z-20 hidden sm:grid size-11 place-items-center rounded-full bg-white/95 text-ink shadow-[0_4px_20px_rgb(0_0_0/0.12),inset_0_0_0_1px_rgb(26_29_46/0.15)] backdrop-blur-md transition-[opacity,transform,background-color] duration-250 ease-expo hover:bg-white hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            canScrollLeft
              ? "opacity-90 hover:opacity-100"
              : "pointer-events-none opacity-0"
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-[17px] fill-none stroke-current stroke-[2]"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Floating Next Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next projects"
          className={cn(
            "absolute right-4 lg:right-8 top-[clamp(140px,18vw,200px)] z-20 hidden sm:grid size-11 place-items-center rounded-full bg-white/95 text-ink shadow-[0_4px_20px_rgb(0_0_0/0.12),inset_0_0_0_1px_rgb(26_29_46/0.15)] backdrop-blur-md transition-[opacity,transform,background-color] duration-250 ease-expo hover:bg-white hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            canScrollRight
              ? "opacity-90 hover:opacity-100"
              : "pointer-events-none opacity-0"
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-[17px] fill-none stroke-current stroke-[2]"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          ref={railRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projects carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDragStart={(e) => e.preventDefault()}
          className={cn(
            "rail content-pad gap-7 md:gap-8 lg:gap-9 cursor-grab active:cursor-grabbing select-none focus-visible:outline-none",
            isDragging && "snap-none"
          )}
          style={{
            scrollSnapType: isDragging ? "none" : undefined,
            paddingInline:
              "max(var(--section-pad), calc((100% - var(--content-max)) / 2))",
            scrollPaddingInline:
              "max(var(--section-pad), calc((100% - var(--content-max)) / 2))",
          }}
        >
          {projects.map((project, index) => (
            <article
              key={project.name}
              className="group/proj flex-[0_0_clamp(240px,30vw,330px)] snap-start"
            >
              <div className="relative aspect-3/4 overflow-hidden rounded-block bg-[#e6e7ec]">
                <Image
                  src={images.project(index)}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 60vw, 330px"
                  draggable={false}
                  className="pointer-events-none object-cover transition-transform duration-800 ease-expo group-hover/proj:scale-105"
                />
              </div>
              <h3 className="mt-4 text-[17px] leading-[1.3] font-medium">
                {project.name}
              </h3>
              <span className="mt-1.5 block text-[11px] tracking-[0.14em] text-grey uppercase">
                {project.sector}
              </span>
              <em className="mt-2 block text-[13.5px] not-italic text-grey">
                {project.scope}
              </em>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
