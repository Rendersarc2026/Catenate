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
              "group relative transition-all duration-300 ease-out",
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
              className={cn(
                "flex w-full cursor-pointer flex-col text-left transition-all duration-250 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50",
                isExpanded
                  ? "pt-0 pb-1"
                  : "pt-[17px] pb-[16px]"
              )}
            >
              <span
                className={cn(
                  "tracking-[-0.01em] transition-all duration-200 leading-none lg:whitespace-nowrap",
                  isExpanded
                    ? "text-[clamp(17px,1.48vw,28.5px)] font-normal text-white"
                    : "text-[clamp(13px,1.05vw,20px)] font-light text-white/80 group-hover:text-white"
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
                  ? "grid-rows-[1fr] opacity-100 pb-[10px]"
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
                    className="group/cta inline-flex cursor-pointer items-center text-[clamp(13px,1.05vw,20px)] font-light leading-none text-white/85 transition-colors duration-200 hover:text-white focus-visible:underline focus-visible:outline-none"
                  >
                    <span>{item.cta}</span>
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
                    >
                      &gt;
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={(e) => e.stopPropagation()}
                    className="group/cta inline-flex cursor-pointer items-center text-[clamp(13px,1.05vw,20px)] font-light leading-none text-white/85 transition-colors duration-200 hover:text-white focus-visible:underline focus-visible:outline-none"
                  >
                    <span>{item.cta}</span>
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover/cta:translate-x-1"
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
