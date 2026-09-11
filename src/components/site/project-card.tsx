"use client";

import Image from "next/image";
import * as React from "react";

import { images, type Project } from "@/data/catenate";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function ProjectCard({
  project,
  index,
  isActive,
  onClick,
}: ProjectCardProps) {
  return (
    <article
      onClick={onClick}
      className={cn(
        "group/proj flex-[0_0_var(--card-w)] w-[var(--card-w)] snap-center shrink-0 transition-all duration-500 ease-expo",
        isActive
          ? "scale-100 opacity-100 z-10"
          : "scale-[0.88] opacity-50 hover:opacity-80 z-0 cursor-pointer"
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/11] sm:aspect-[4/3] overflow-hidden rounded-none bg-[#e6e7ec] transition-all duration-500 ease-expo",
          isActive
            ? "shadow-[0_20px_50px_-10px_rgba(26,29,46,0.22)] ring-1 ring-ink/10"
            : "shadow-sm ring-1 ring-ink/5"
        )}
      >
        <Image
          src={images.project(index)}
          alt={project.name}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 80vw, 640px"
          draggable={false}
          className="pointer-events-none object-cover transition-transform duration-800 ease-expo group-hover/proj:scale-105"
        />

        {/* Subtle active vignette overlay */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-500",
            isActive
              ? "bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60"
              : "opacity-0"
          )}
        />
      </div>

      <div className="mt-5 flex flex-col gap-1.5 px-1">
        <div className="flex items-baseline justify-between gap-3">
          <h3
            className={cn(
              "font-heading font-medium tracking-[-0.02em] transition-all duration-300",
              isActive
                ? "text-[20px] sm:text-[23px] text-ink"
                : "text-[16px] sm:text-[18px] text-ink/70"
            )}
          >
            {project.name}
          </h3>
          <span
            className={cn(
              "shrink-0 font-mono text-[10.5px] sm:text-[11px] tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full border transition-all duration-300",
              isActive
                ? "border-ink/15 bg-white text-ink shadow-xs"
                : "border-transparent bg-ink/5 text-grey"
            )}
          >
            {project.sector}
          </span>
        </div>

        <p
          className={cn(
            "text-[13.5px] sm:text-[14.5px] leading-relaxed transition-colors duration-300 line-clamp-2",
            isActive ? "text-grey" : "text-grey/60"
          )}
        >
          {project.scope}
        </p>
      </div>
    </article>
  );
}
