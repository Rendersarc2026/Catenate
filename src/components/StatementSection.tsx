import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";

export const StatementSection: React.FC = () => {
  return (
    <section className="bg-white text-[#1A1D2E] sec-pad text-center">
      <div className="max-w-[760px] mx-auto flex flex-col items-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#767C93] mb-4 block">
          What we do
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-normal leading-[1.18] tracking-tight mb-6 text-balance">
          One chain, from global brand to your doorstep.
        </h2>
        <p className="text-base sm:text-lg text-[#767C93] leading-relaxed mb-8 font-normal">
          Manufacturers make chemistry. Projects need systems. Catenate sits between the two, carrying the range, the technical judgement and the stock depth that turn a product list into a specification a contractor can build to.
        </p>
        <Link href="#brands">
          <Button variant="default" size="lg">
            <span>Explore the portfolio</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};
