"use client"

import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  certificatesOwn,
  certificatesPrincipal,
  type Certificate,
  type CertificateTier,
} from "@/data/catenate"

type Selection = { certificate: Certificate; tier: CertificateTier }

const tierLabel: Record<CertificateTier, string> = {
  own: "Held by Catenate",
  principal: "Carried by our principals",
}

export function ApprovalsSection() {
  const [selection, setSelection] = React.useState<Selection | null>(null)

  return (
    <section id="approvals" className="section on-blue bg-blue text-white">
      <Reveal className="mb-10">
        <span className="eyebrow">Approvals and accreditations</span>
        <h2 className="max-w-[22ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          Proof travels with the system.
        </h2>
      </Reveal>

      <CertificateTier
        heading={tierLabel.own}
        tier="own"
        badge="Tier one"
        certificates={certificatesOwn}
        onSelect={setSelection}
      />

      <CertificateTier
        heading={tierLabel.principal}
        tier="principal"
        badge="Tier two"
        certificates={certificatesPrincipal}
        onSelect={setSelection}
      />

      <Sheet
        open={selection !== null}
        onOpenChange={(open) => !open && setSelection(null)}
      >
        <SheetContent className="w-[min(460px,92vw)] gap-0 overflow-y-auto px-9.5 py-11 sm:max-w-[460px]">
          {selection && (
            <>
              <SheetHeader className="p-0">
                <span className="eyebrow mb-3">{tierLabel[selection.tier]}</span>
                <SheetTitle className="mb-2 text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.3] font-medium tracking-[-0.01em]">
                  {selection.certificate.name}
                </SheetTitle>
                <SheetDescription className="lead mb-6.5 text-[15px]">
                  {selection.certificate.scope}
                </SheetDescription>
              </SheetHeader>

              <dl>
                {[
                  ["Reference", selection.certificate.code, true],
                  ["Issuing body", selection.certificate.body, false],
                  ["Valid through", selection.certificate.validThrough, true],
                ].map(([label, value, numeric]) => (
                  <div
                    key={label as string}
                    className="flex justify-between gap-5 border-b border-ink/8 py-3.25"
                  >
                    <dt className="text-[13px] text-grey">{label}</dt>
                    <dd
                      className={`text-right text-[13.5px] font-medium ${numeric ? "tnum" : ""}`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <ArrowButton href="#" direction="down" className="mt-6.5 self-start">
                Download certificate
              </ArrowButton>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}

function CertificateTier({
  heading,
  badge,
  tier,
  certificates,
  onSelect,
}: {
  heading: string
  badge: string
  tier: CertificateTier
  certificates: Certificate[]
  onSelect: (selection: Selection) => void
}) {
  return (
    <Reveal className="mb-11">
      <div className="mb-5 flex items-baseline gap-3.5">
        <h3 className="text-lg leading-[1.3] font-medium">{heading}</h3>
        <span className="text-[11px] tracking-[0.16em] uppercase opacity-55">
          {badge}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(214px,1fr))] gap-3">
        {certificates.map((certificate) => (
          <button
            key={certificate.code}
            type="button"
            onClick={() => onSelect({ certificate, tier })}
            className="group/tile flex min-h-[150px] flex-col rounded-2xl p-5.5 text-left text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.18)] transition-[background-color,color,box-shadow] duration-300 ease-expo hover:bg-white hover:text-blue hover:shadow-none"
          >
            <span className="tnum mb-auto text-xs tracking-[0.1em] opacity-60">
              {certificate.code}
            </span>
            <span className="mt-3.5 text-[17px] leading-[1.3] font-medium">
              {certificate.name}
            </span>
            <span className="mt-1 text-[12.5px] opacity-60">{certificate.body}</span>
            <span className="max-h-0 overflow-hidden text-[12.5px] opacity-0 transition-[max-height,opacity,margin] duration-300 ease-expo group-hover/tile:mt-2 group-hover/tile:max-h-15 group-hover/tile:opacity-75">
              {certificate.scope}
            </span>
          </button>
        ))}
      </div>
    </Reveal>
  )
}
