"use client";

import Image from "next/image";
import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WhyCatenatePillar } from "@/data/catenate";

interface PillarDetailDialogProps {
  pillar: WhyCatenatePillar | null;
  index: number | null;
  onClose: () => void;
}

export function PillarDetailDialog({
  pillar,
  index,
  onClose,
}: PillarDetailDialogProps) {
  if (!pillar) return null;

  const formattedIndex =
    index !== null ? String(index + 1).padStart(2, "0") : "01";

  return (
    <Dialog open={pillar !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[min(880px,94vw)] overflow-hidden rounded-[28px] border border-ink/10 bg-white p-0 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
          {/* Visual Column */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 md:aspect-auto md:min-h-[420px]">
            <Image
              src={pillar.image}
              alt={pillar.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale contrast-110"
              priority
            />
            <div className="absolute top-4 left-4 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
              {pillar.tag}
            </div>
          </div>

          {/* Editorial Content */}
          <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[11px] font-semibold tracking-wider text-blue-600 uppercase">
                  Pillar {formattedIndex}
                </span>
                <span className="text-xs text-grey/40">/</span>
                <span className="text-xs font-medium text-grey">
                  Specification Brief
                </span>
              </div>

              <DialogTitle className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-[1.2] tracking-[-0.02em] text-ink">
                {pillar.headline}
              </DialogTitle>

              <DialogDescription className="mt-4 text-[14px] leading-[1.7] text-grey sm:text-[15px]">
                {pillar.detail}
              </DialogDescription>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-ink/8 pt-5">
              <span className="text-[12px] font-medium text-grey">
                Unified specification standard
              </span>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Inquire for project
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
