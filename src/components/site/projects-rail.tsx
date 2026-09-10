"use client";

import * as React from "react";

import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { projects } from "@/data/catenate";
import { cn } from "@/lib/utils";

export function ProjectsRail() {
  const railRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);

  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);
  const hasMovedRef = React.useRef(false);
  const rafIdRef = React.useRef<number | null>(null);

  const updateActiveCard = React.useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const railCenter = rail.scrollLeft + rail.clientWidth / 2;
    const cards = rail.querySelectorAll<HTMLElement>("article");
    if (!cards.length) return;

    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - railCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
    setCanScrollLeft(closestIdx > 0);
    setCanScrollRight(closestIdx < cards.length - 1);
  }, []);

  const handleScroll = React.useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      updateActiveCard();
      rafIdRef.current = null;
    });
  }, [updateActiveCard]);

  const scrollToIndex = React.useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const rail = railRef.current;
      if (!rail) return;

      const cards = rail.querySelectorAll<HTMLElement>("article");
      const targetCard = cards[index];
      if (!targetCard) return;

      const railCenter = rail.clientWidth / 2;
      const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
      const targetScrollLeft = cardCenter - railCenter;

      rail.scrollTo({
        left: targetScrollLeft,
        behavior,
      });

      setActiveIndex(index);
      setCanScrollLeft(index > 0);
      setCanScrollRight(index < cards.length - 1);
    },
    []
  );

  React.useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateActiveCard();
    rail.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      updateActiveCard();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      rail.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll, updateActiveCard]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !railRef.current) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftRef.current = railRef.current.scrollLeft;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || e.pointerType !== "mouse" || !railRef.current) return;
    const deltaX = e.pageX - startXRef.current;
    if (Math.abs(deltaX) > 4) hasMovedRef.current = true;
    railRef.current.scrollLeft = scrollLeftRef.current - deltaX;
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
      scrollToIndex(Math.max(0, activeIndex - 1));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(Math.min(projects.length - 1, activeIndex + 1));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      scrollToIndex(e.key === "Home" ? 0 : projects.length - 1);
    }
  };

  const handleCardClick = (index: number) => {
    if (hasMovedRef.current) return;
    if (index !== activeIndex) {
      scrollToIndex(index);
    }
  };

  return (
    <section id="projects" className="section section-flush bg-off py-12 sm:py-16">
      <Reveal className="content-pad flex items-center justify-between pb-8 sm:pb-10">
        <div className="flex items-center gap-3">
          <span className="eyebrow mb-0">Projects</span>
          <span className="hidden sm:inline-block h-3.5 w-px bg-ink/15" />
          <span className="hidden sm:inline-block font-mono text-[11px] tracking-[0.14em] text-grey uppercase">
            Featured Specifications
          </span>
        </div>

        {/* Section header navigation & counter */}
        <div className="flex items-center gap-4">
          <div className="font-mono text-[12.5px] tracking-wider text-grey select-none">
            <span className="font-semibold text-ink tnum">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-1.5 text-grey/40">/</span>
            <span className="tnum">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className="grid size-9 sm:size-[38px] cursor-pointer place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.2)] transition-[background-color,opacity,box-shadow,transform] duration-200 ease-expo hover:bg-ink/5 active:scale-95 disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ArrowIcon dir="left" />
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1))}
              disabled={!canScrollRight}
              aria-label="Next project"
              className="grid size-9 sm:size-[38px] cursor-pointer place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.2)] transition-[background-color,opacity,box-shadow,transform] duration-200 ease-expo hover:bg-ink/5 active:scale-95 disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <ArrowIcon dir="right" />
            </button>
          </div>
        </div>
      </Reveal>

      <div className="group/rail relative w-full overflow-hidden">
        {/* Floating Prev Button */}
        <button
          type="button"
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          disabled={!canScrollLeft}
          aria-label="Previous project"
          className={cn(
            "absolute left-4 lg:left-10 top-[clamp(140px,20vw,220px)] z-20 hidden sm:grid size-12 place-items-center rounded-full bg-white/95 text-ink shadow-[0_6px_24px_rgb(0_0_0/0.14),inset_0_0_0_1px_rgb(26_29_46/0.12)] backdrop-blur-md transition-[opacity,transform,background-color] duration-250 ease-expo hover:bg-white hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            canScrollLeft ? "opacity-90 hover:opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <ArrowIcon dir="left" />
        </button>

        {/* Floating Next Button */}
        <button
          type="button"
          onClick={() => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1))}
          disabled={!canScrollRight}
          aria-label="Next project"
          className={cn(
            "absolute right-4 lg:right-10 top-[clamp(140px,20vw,220px)] z-20 hidden sm:grid size-12 place-items-center rounded-full bg-white/95 text-ink shadow-[0_6px_24px_rgb(0_0_0/0.14),inset_0_0_0_1px_rgb(26_29_46/0.12)] backdrop-blur-md transition-[opacity,transform,background-color] duration-250 ease-expo hover:bg-white hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
            canScrollRight ? "opacity-90 hover:opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <ArrowIcon dir="right" />
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
            "rail gap-6 sm:gap-8 lg:gap-10 cursor-grab active:cursor-grabbing select-none focus-visible:outline-none py-4",
            isDragging && "snap-none"
          )}
          style={
            {
              "--card-w": "clamp(310px, 52vw, 640px)",
              scrollSnapType: isDragging ? "none" : "x mandatory",
              paddingInline: "calc(50% - (var(--card-w) / 2))",
              scrollPaddingInline: "calc(50% - (var(--card-w) / 2))",
            } as React.CSSProperties
          }
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              isActive={index === activeIndex}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>

        {/* Bottom pagination pills */}
        <div className="flex items-center justify-center gap-2 pt-6 sm:pt-8">
          {projects.map((project, idx) => (
            <button
              key={project.name}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Jump to project ${idx + 1}: ${project.name}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink",
                idx === activeIndex
                  ? "w-8 bg-ink"
                  : "w-2 bg-ink/25 hover:bg-ink/45 hover:w-3"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-[17px] fill-none stroke-current stroke-[1.9]"
    >
      <path d={dir === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}
