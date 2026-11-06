"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ContactCardItem {
  readonly title: string;
  /** Only the enquiry row has a CTA; the rest are headings with no link. */
  readonly cta?: string;
  readonly href?: string;
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
        const hasCta = item.action === "enquiry" && Boolean(item.cta);
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
              aria-expanded={hasCta ? isExpanded : undefined}
              aria-controls={hasCta ? `contact-panel-${idx}` : undefined}
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
            {hasCta && (
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
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
