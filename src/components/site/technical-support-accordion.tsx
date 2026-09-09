"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import type { Blurb } from "@/data/catenate";
import { cn } from "@/lib/utils";

interface TechnicalSupportAccordionProps {
  items: Blurb[];
  title?: string;
  defaultOpen?: boolean;
}

/**
 * Dropdown disclosure for "What comes with the delivery."
 * Clicking the header or arrow toggles the 4 delivery values into view.
 * Each item inside then serves as its own disclosure for detailed scope notes.
 */
export function TechnicalSupportAccordion({
  items,
  title = "What comes with the delivery.",
  defaultOpen = false,
}: TechnicalSupportAccordionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="w-full">
      <h2>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="technical-support-panel"
          className="group/main flex w-full cursor-pointer items-center justify-between gap-6 rounded-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4"
        >
          <span className="block text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em] text-ink transition-[transform,color] duration-350 ease-expo group-hover/main:translate-x-1">
            {title}
          </span>

          <span
            aria-hidden="true"
            className={cn(
              "grid size-[38px] shrink-0 place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.2)] transition-[background-color,color,box-shadow,transform] duration-300 ease-expo group-hover/main:bg-ink/5",
              isOpen && "bg-blue text-white shadow-none"
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className={cn(
                "size-[15px] fill-none stroke-current stroke-[1.8] transition-transform duration-350 ease-expo",
                isOpen && "-rotate-180"
              )}
            >
              <path d="M6 9.5l6 6 6-6" />
            </svg>
          </span>
        </button>
      </h2>

      <div
        id="technical-support-panel"
        role="region"
        aria-label={title}
        inert={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows,opacity,margin] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
        )}
      >
        <div className="overflow-hidden">
          <Accordion className="border-t border-ink/10">
            {items.map((item) => (
              <AccordionItem
                key={item.title}
                value={item.title}
                className="border-b border-ink/10"
              >
                <AccordionTrigger
                  showIcon={false}
                  className="group/row flex w-full cursor-pointer items-center justify-between gap-6 rounded-none py-5.5 text-left hover:no-underline"
                >
                  <span className="block text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.3] font-medium tracking-[-0.015em] transition-[transform,color] duration-350 ease-expo group-hover/row:translate-x-1.5 group-data-panel-open/row:text-blue">
                    {item.title}
                  </span>

                  <span
                    aria-hidden="true"
                    className="grid size-[34px] shrink-0 place-items-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(26_29_46/0.2)] transition-[background-color,color,box-shadow] duration-300 ease-expo group-hover/row:bg-ink/5 group-data-panel-open/row:bg-blue group-data-panel-open/row:text-white group-data-panel-open/row:shadow-none"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[13px] fill-none stroke-current stroke-[1.7] transition-transform duration-350 ease-expo group-data-panel-open/row:-rotate-180"
                    >
                      <path d="M6 9.5l6 6 6-6" />
                    </svg>
                  </span>
                </AccordionTrigger>

                <AccordionPrimitive.Panel className="group/panel h-(--accordion-panel-height) overflow-hidden transition-[height] duration-400 ease-expo data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none">
                  <p className="max-w-[58ch] pb-6.5 text-[15px] leading-[1.55] text-grey transition-[opacity,translate] duration-400 ease-expo group-data-ending-style/panel:translate-y-1 group-data-ending-style/panel:opacity-0 group-data-starting-style/panel:translate-y-1 group-data-starting-style/panel:opacity-0 motion-reduce:transition-none">
                    {item.body}
                  </p>
                </AccordionPrimitive.Panel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
