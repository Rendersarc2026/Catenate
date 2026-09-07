"use client";

import * as React from "react";
import Image from "next/image";

import { ContactAccordion, type ContactCardItem } from "@/components/site/contact/contact-accordion";
import { ContactStars } from "@/components/site/contact/contact-stars";
import { EnquiryDialog } from "@/components/site/contact/enquiry-dialog";
import { contactCards, images } from "@/data/catenate";
import { cn } from "@/lib/utils";

export function ContactSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [enquiryOpen, setEnquiryOpen] = React.useState(false);
  const [enquiryTopic, setEnquiryTopic] = React.useState("general");

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
        ref={sectionRef}
        aria-label="Get in touch with us"
        className="relative flex min-h-[560px] w-full items-center overflow-hidden bg-black text-white selection:bg-cyan-500/30 selection:text-white sm:min-h-[620px] lg:min-h-[680px]"
      >
        {/* Background Image Container */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          <Image
            src={images.contactBg}
            alt="Atmospheric planetary horizon background"
            fill
            priority
            sizes="100vw"
            className={cn(
              "object-cover object-[center_55%] transition-transform duration-1000 ease-out",
              isVisible ? "scale-100" : "scale-105"
            )}
          />

          {/* Upper Celestial Starfield */}
          <ContactStars />

          {/* Living Horizon Light Breathing Effect */}
          <div
            className={cn(
              "absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_62%,rgba(0,165,255,0.22),transparent_72%)] transition-opacity duration-1000 ease-out",
              isVisible ? "opacity-100 animate-horizon-pulse" : "opacity-0"
            )}
          />

          {/* Secondary Central Horizon Flare */}
          <div
            className={cn(
              "absolute inset-0 bg-[radial-gradient(ellipse_50%_25%_at_50%_60%,rgba(140,225,255,0.2),transparent_65%)] transition-opacity duration-1000 ease-out",
              isVisible ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Seamless Edge Scrims for Top & Bottom Integration */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 mx-auto w-full max-w-[var(--content-max)] px-[clamp(24px,5vw,72px)] py-[clamp(72px,9vw,130px)]">
          <div className="grid grid-cols-1 items-center gap-12 sm:gap-16 lg:grid-cols-12 lg:gap-20">
            {/* Left Column: Heading with interactive CTA arrow */}
            <div
              className={cn(
                "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:col-span-6 xl:col-span-7",
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-8 opacity-0"
              )}
            >
              <button
                type="button"
                onClick={handleOpenGeneralEnquiry}
                className="group inline-flex cursor-pointer items-center gap-2.5 text-left text-white transition-all duration-300 hover:text-white/95 focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                aria-label="Get in touch with us — open enquiry dialog"
              >
                <h2 className="text-[34px] font-normal tracking-[-0.025em] text-balance text-white sm:text-[44px] md:text-[50px] lg:text-[56px] leading-[1.1]">
                  Get in touch with us
                </h2>
                <span
                  aria-hidden="true"
                  className="inline-block text-[30px] font-light text-white/90 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-[40px] md:text-[46px] lg:text-[52px]"
                >
                  &gt;
                </span>
              </button>
            </div>

            {/* Right Column: Accordion of Items */}
            <div
              className={cn(
                "w-full transition-all duration-700 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] lg:col-span-6 lg:ml-auto lg:max-w-[460px] xl:col-span-5 xl:max-w-[480px]",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              )}
            >
              <ContactAccordion
                items={contactCards}
                onSelectAction={handleSelectAction}
              />
            </div>
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
