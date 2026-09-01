"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ContactSectionProps {
  onOpenModal: (title: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenModal }) => {
  const cards = [
    {
      img: "https://picsum.photos/seed/catenatesupport/700/525",
      title: "Can't find what you're looking for?",
      btnText: "Submit your inquiry",
      action: "Project Specification & General Inquiry",
    },
    {
      img: "https://picsum.photos/seed/catenatechannel/700/525",
      title: "Looking where to buy? Let us help you with that",
      btnText: "Find a channel partner",
      action: "Find an Authorized Channel Partner",
    },
    {
      img: "https://picsum.photos/seed/catenatepartner/700/525",
      title: "Channel Partner Network to serve your needs",
      btnText: "Find out more",
      action: "Join Catenate Distribution Network",
    },
  ];

  return (
    <section className="bg-white text-[#1A1D2E] sec-pad border-t border-[#1A1D2E]/10" id="contact">
      <div className="mb-12">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.12em] text-[#1A1D2E]">
          Get in touch with us
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {cards.map((card, idx) => (
          <div key={idx} className="flex flex-col justify-between group">
            <div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative bg-[#dfe3ef] shadow-xs group-hover:shadow-md transition-shadow">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-[#1A1D2E] mb-5 leading-snug">
                {card.title}
              </h3>
            </div>
            <div>
              <Button
                onClick={() => onOpenModal(card.action)}
                variant="ghost"
                className="w-full sm:w-auto justify-between"
              >
                <span>{card.btnText}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
