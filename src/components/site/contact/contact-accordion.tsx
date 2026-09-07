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
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      onMouseLeave={() => setActiveIndex(null)}
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
              "group relative transition-all duration-300 ease-out",
              !isLast && "border-b border-white/20 hover:border-white/40"
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
              className="flex w-full cursor-pointer flex-col py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 sm:py-5"
            >
              <span
                className={cn(
                  "text-[15.5px] leading-relaxed transition-all duration-200 sm:text-[17px]",
                  isExpanded
                    ? "font-medium text-white"
                    : "font-light text-white/75 group-hover:text-white"
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
                "grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isExpanded
                  ? "grid-rows-[1fr] opacity-100 pb-4 sm:pb-5"
                  : "grid-rows-[0fr] opacity-0 pb-0"
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
                    className="group/cta inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-normal text-white/85 transition-colors duration-200 hover:text-white focus-visible:underline focus-visible:outline-none sm:text-[15px]"
                  >
                    <span>{item.cta}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
                    >
                      &gt;
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(e) => e.stopPropagation()}
                    className="group/cta inline-flex cursor-pointer items-center gap-1.5 text-[14px] font-normal text-white/85 transition-colors duration-200 hover:text-white focus-visible:underline focus-visible:outline-none sm:text-[15px]"
                  >
                    <span>{item.cta}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
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
