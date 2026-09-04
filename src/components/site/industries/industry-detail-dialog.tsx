"use client"

import Image from "next/image"
import * as React from "react"
import { Building2, CheckCircle2 } from "lucide-react"

import { ArrowButton } from "@/components/site/arrow-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { images, type Industry } from "@/data/catenate"
import { cn } from "@/lib/utils"
import { getCategoryLabelForSlug } from "./types"

interface IndustryDetailDialogProps {
  industry: Industry | null
  onClose: () => void
}

export function IndustryDetailDialog({
  industry,
  onClose,
}: IndustryDetailDialogProps) {
  return (
    <Dialog open={industry !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[min(900px,94vw)] overflow-hidden rounded-[28px] bg-white p-0 border border-ink/10 shadow-2xl">
        {industry && <SectorModalContent industry={industry} />}
      </DialogContent>
    </Dialog>
  )
}

function SectorModalContent({ industry }: { industry: Industry }) {
  const [settled, setSettled] = React.useState(false)
  const category = getCategoryLabelForSlug(industry.slug)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setSettled(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const rise = (order: number) => ({
    className: cn(
      "transition-[opacity,translate] duration-700 ease-expo motion-reduce:transition-none",
      settled ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    ),
    style: { transitionDelay: `${150 + order * 50}ms` },
  })

  return (
    <div className="grid max-h-[88vh] grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)]">
      {/* Left visual column */}
      <div className="relative block overflow-hidden max-md:aspect-[16/10] md:min-h-[520px]">
        <Image
          src={images.industry(industry.slug)}
          alt={industry.name}
          fill
          sizes="(min-width: 768px) 460px, 94vw"
          className={cn(
            "object-cover transition-transform duration-[1400ms] ease-expo motion-reduce:transition-none",
            settled ? "scale-100" : "scale-[1.12]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgb(12_20_60/0.8)] via-transparent to-[rgb(12_20_60/0.3)]" />

        {/* Floating badge inside image */}
        <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium tracking-wide uppercase backdrop-blur-md border border-white/25">
            {category}
          </span>
          <p className="mt-2 text-xs text-white/80 font-mono">
            ENGINEERED COMPLIANCE DOSSIER
          </p>
        </div>
      </div>

      {/* Right detail copy column */}
      <div className="overflow-y-auto px-[clamp(24px,3.2vw,44px)] py-[clamp(28px,3.5vw,48px)]">
        <span {...rise(0)}>
          <span className="eyebrow mb-2 text-blue font-semibold">Specialized Sector</span>
        </span>

        <DialogTitle
          {...rise(1)}
          className={cn(
            rise(1).className,
            "mb-3 text-[clamp(1.45rem,2.4vw,2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-ink"
          )}
        >
          {industry.name}
        </DialogTitle>

        <DialogDescription
          {...rise(2)}
          className={cn(rise(2).className, "lead mb-6 text-[15px] leading-relaxed text-ink/80")}
        >
          {industry.challenge}
        </DialogDescription>

        <h4
          {...rise(3)}
          className={cn(
            rise(3).className,
            "mb-2 text-[11px] tracking-[0.16em] text-grey uppercase font-semibold"
          )}
        >
          Systems that answer it
        </h4>

        <ul className="mb-6 list-none space-y-2">
          {industry.systems.map((system, index) => (
            <li
              key={system}
              {...rise(4 + index)}
              className={cn(
                rise(4 + index).className,
                "flex items-center gap-3 rounded-xl border border-ink/8 bg-off/60 px-3.5 py-3"
              )}
            >
              <CheckCircle2 className="size-4 shrink-0 text-blue" />
              <span className="text-[14.5px] font-medium text-ink">{system}</span>
            </li>
          ))}
        </ul>

        {/* Reference project callout */}
        <div
          {...rise(4 + industry.systems.length)}
          className={cn(
            rise(4 + industry.systems.length).className,
            "mb-7 rounded-2xl border border-blue/15 bg-blue/5 p-4.5"
          )}
        >
          <span className="mb-1 flex items-center gap-1.5 text-[11px] tracking-[0.16em] text-blue uppercase font-semibold">
            <Building2 className="size-3.5" />
            Documented Reference Project
          </span>
          <p className="text-[14px] leading-relaxed text-ink font-medium">
            {industry.reference}
          </p>
        </div>

        <div {...rise(5 + industry.systems.length)}>
          <ArrowButton href="/#contact" className="w-full sm:w-auto">
            Request a specification
          </ArrowButton>
        </div>
      </div>
    </div>
  )
}
