"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface ContactCardItem {
  readonly title: string;
  readonly cta: string;
  readonly href: string;
  readonly action?: string;
  readonly image?: string;
}

interface ContactAccordionProps {
  items: readonly ContactCardItem[];
  onSelectAction: (item: ContactCardItem) => void;
  className?: string;
}

export function ContactAccordion({
  items,
  onSelectAction,
  className,
}: ContactAccordionProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(0);

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      role="region"
      aria-label="Contact options accordion"
    >
      {items.map((item, idx) => {
        const isExpanded = activeIndex === idx;
        const isLast = idx === items.length - 1;

        return (
          <div
            key={item.title}
            onMouseEnter={() => setActiveIndex(idx)}
            className={cn(
              "group relative flex flex-col justify-center transition-colors duration-200",
              "py-3.5 sm:py-4 lg:py-[18px]",
              !isLast && "border-b border-white/25"
            )}
          >
            {/* Question Trigger */}
            <button
              type="button"
              onClick={() => setActiveIndex(isExpanded ? null : idx)}
              onFocus={() => setActiveIndex(idx)}
              aria-expanded={isExpanded}
              aria-controls={`contact-panel-${idx}`}
              id={`contact-header-${idx}`}
              className="flex w-full cursor-pointer flex-col text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50"
            >
              <span
                className={cn(
                  "tracking-[-0.01em] transition-colors duration-200 leading-snug whitespace-nowrap",
                  "text-[clamp(14px,0.95vw,17.5px)]",
                  isExpanded
                    ? "font-normal text-white"
                    : "font-light text-white/70 group-hover:text-white"
                )}
              >
                {item.title}
              </span>
            </button>

            {/* Smooth Expandable CTA Sub-row */}
            <div
              id={`contact-panel-${idx}`}
              role="region"
              aria-labelledby={`contact-header-${idx}`}
              className={cn(
                "grid transition-all duration-200 ease-out",
                isExpanded
                  ? "grid-rows-[1fr] opacity-100 pt-2"
                  : "grid-rows-[0fr] opacity-0 pt-0"
              )}
            >
              <div className="overflow-hidden">
                {item.action === "enquiry" ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAction(item);
                    }}
                    className="group/cta inline-flex cursor-pointer items-center text-[clamp(12px,0.85vw,15px)] font-light leading-none text-white/85 transition-colors duration-150 hover:text-white focus-visible:underline focus-visible:outline-none"
                  >
                    <span>{item.cta}</span>
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block transition-transform duration-150 ease-out group-hover/cta:translate-x-1"
                    >
                      &gt;
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(e) => e.stopPropagation()}
                    className="group/cta inline-flex cursor-pointer items-center text-[clamp(12px,0.85vw,15px)] font-light leading-none text-white/85 transition-colors duration-150 hover:text-white focus-visible:underline focus-visible:outline-none"
                  >
                    <span>{item.cta}</span>
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block transition-transform duration-150 ease-out group-hover/cta:translate-x-1"
                    >
                      &gt;
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
