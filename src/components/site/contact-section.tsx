"use client";

import * as React from "react";
import Image from "next/image";

import { ContactAccordion, type ContactCardItem } from "@/components/site/contact/contact-accordion";
import { EnquiryDialog } from "@/components/site/contact/enquiry-dialog";
import { contactCards, images } from "@/data/catenate";

export function ContactSection() {
  const [enquiryOpen, setEnquiryOpen] = React.useState(false);
  const [enquiryTopic, setEnquiryTopic] = React.useState("general");

  const handleSelectAction = (item: ContactCardItem) => {
    if (item.action === "enquiry") {
      setEnquiryTopic("inquiry");
      setEnquiryOpen(true);
    }
  };

  const handleOpenGeneralEnquiry = () => {
    setEnquiryTopic("general");
    setEnquiryOpen(true);
  };

  return (
    <>
      <section
        id="contact"
        aria-label="Get in touch with us"
        className="relative w-full overflow-hidden bg-black text-white selection:bg-cyan-500/30 selection:text-white min-h-[640px] lg:min-h-0 lg:aspect-[16/9]"
      >
        {/* Background Image Container — Lossless & Uncompressed */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          <Image
            src={images.contactBg}
            alt="Get in touch with us background"
            fill
            priority
            unoptimized
            quality={100}
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
          />

          {/* Seamless Edge Scrims for Top & Bottom Integration */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent opacity-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none" />
        </div>

        {/* Content Layer — Exact Copy Placement from a-02 (Desktop 16:9 & Mobile Adaptive) */}
        <div className="relative z-10 flex flex-col justify-start px-6 pt-16 pb-12 gap-8 sm:px-10 sm:pt-20 lg:static lg:p-0">
          {/* Left Heading: starts at X = 6.625%, Y = 32.3% */}
          <div className="relative lg:absolute lg:left-[6.625%] lg:top-[32.3%]">
            <button
              type="button"
              onClick={handleOpenGeneralEnquiry}
              className="group inline-flex cursor-pointer items-center text-left text-white transition-opacity duration-300 hover:opacity-90 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              aria-label="Get in touch with us — open enquiry dialog"
            >
              <h2 className="text-[clamp(1.6rem,6.2vw,2.4rem)] lg:text-[clamp(2.4rem,3.5vw,68px)] font-normal tracking-[0.01em] text-white leading-none whitespace-nowrap">
                Get in touch with us{" "}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                >
                  &gt;
                </span>
              </h2>
            </button>
          </div>

          {/* Right Accordion: starts at X = 70.76%, Y = 31.02%, width = 21.24% */}
          <div className="relative w-full lg:absolute lg:left-[70.76%] lg:top-[31.02%] lg:w-[21.24%]">
            <ContactAccordion
              items={contactCards}
              onSelectAction={handleSelectAction}
            />
          </div>
        </div>
      </section>

      {/* Interactive Specification & Enquiry Modal */}
      <EnquiryDialog
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        defaultTopic={enquiryTopic}
      />
    </>
  );
}
