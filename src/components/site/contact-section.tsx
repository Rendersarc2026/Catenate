import Image from "next/image"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import { contactCards } from "@/data/catenate"

export function ContactSection() {
  return (
    <section id="contact" className="section bg-white">
      <Reveal className="mb-8.5">
        <h2 className="text-[22px] font-bold tracking-[0.05em] text-ink uppercase">
          Get in touch with us
        </h2>
      </Reveal>

      <Reveal stagger className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-md:gap-11">
        {contactCards.map((card) => (
          <div key={card.title}>
            <div className="relative mb-5 aspect-4/3 overflow-hidden rounded-xl">
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <h3 className="mb-4 text-[17px] leading-[1.3] font-medium">{card.title}</h3>
            <ArrowButton href="#" variant="quiet">
              {card.cta}
            </ArrowButton>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
