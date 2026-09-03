"use client"

import Image from "next/image"
import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import { Reveal } from "@/components/site/reveal"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { images, industries, type Industry } from "@/data/catenate"
import { cn } from "@/lib/utils"

/*
 * The sector gallery is a wall of panels that bows toward the viewer: the
 * centre sits nearest and largest, and each step outward falls away and turns
 * with the curve, tucking behind its neighbour. Everything below is projected
 * geometry — tune the constants, not the markup.
 */

/** Panel footprint before perspective, in px. */
const PANEL_W = 190
const PANEL_H = 270
/** Camera distance. Short focal length, so depth reads as a big size change. */
const PERSPECTIVE = 620
/** Depth of the centre panel, and how far each step outward falls back. */
const DEPTH_FRONT = 110
const DEPTH_STEP = 120
/** Turn per step and its ceiling, in degrees. */
const TURN = 10
const TURN_MAX = 52
/** How tightly neighbours pack: 1 is edge to edge, below that they overlap. */
const PACK = 0.95
/** Slots each side of centre that stay on screen. */
const VISIBLE = 6
/** Drift speed, in panels per second. */
const SPEED = 0.3

/** The list twice over, so the wall can drift forever without running out. */
const slots = [...industries, ...industries]

/**
 * One place per step out from centre. Spacing is laid out in projected pixels
 * — each panel sits against its neighbour's rendered edge — then divided back
 * through the perspective scale to get the transform's own units. Depth stops
 * at the last visible step, so panels waiting off screen don't balloon.
 */
const places = (() => {
  const out: { x: number; z: number; turn: number }[] = []
  let projected = 0
  let previousWidth = 0

  for (let step = 0; step <= VISIBLE + 1; step++) {
    const capped = Math.min(step, VISIBLE)
    const z = DEPTH_FRONT - capped * DEPTH_STEP
    const scale = PERSPECTIVE / (PERSPECTIVE - z)
    const turn = Math.min(capped * TURN, TURN_MAX)
    const width = PANEL_W * scale * Math.cos((turn * Math.PI) / 180)

    if (step > 0) projected += ((previousWidth + width) / 2) * PACK
    previousWidth = width

    out.push({ x: projected / scale, z, turn })
  }

  return out
})()

/** Signed distance from the drifting centre, wrapped to the shorter way round. */
function slotOffset(index: number, centre: number) {
  const span = slots.length
  const raw = (((index - centre) % span) + span) % span
  return raw > span / 2 ? raw - span : raw
}

/**
 * A place at a fractional step out, read between the two whole steps either
 * side of it. This is what lets the wall drift rather than click along.
 */
function placeAt(steps: number) {
  const last = places.length - 1
  const low = Math.min(Math.floor(steps), last)
  const high = Math.min(low + 1, last)
  const t = Math.min(steps, last) - low
  const between = (a: number, b: number) => a + (b - a) * t

  return {
    x: between(places[low].x, places[high].x),
    z: between(places[low].z, places[high].z),
    turn: between(places[low].turn, places[high].turn),
  }
}

export function IndustriesSection() {
  const panelsRef = React.useRef<(HTMLButtonElement | null)[]>([])
  const positionRef = React.useRef(0)
  const centreRef = React.useRef(0)
  /* The wall drifts on its own until a pointer rests on it. */
  const [held, setHeld] = React.useState(false)
  const [centre, setCentre] = React.useState(0)
  const [opened, setOpened] = React.useState<Industry | null>(null)

  /* Panels are written straight to the DOM, so a frame costs no re-render. */
  const paint = React.useCallback((position: number) => {
    panelsRef.current.forEach((panel, index) => {
      if (!panel) return

      const offset = slotOffset(index, position)
      const steps = Math.abs(offset)
      const side = Math.sign(offset)
      const place = placeAt(steps)

      /* Panels turn with the curve, so each outer edge is the one that falls away. */
      panel.style.transform = `translate3d(${side * place.x}px, 0, ${place.z}px) rotateY(${side * place.turn}deg)`
      /* Held back from the centre panel, so the caption has an obvious subject. */
      panel.style.opacity = `${steps > VISIBLE ? 0 : Math.max(0.42, 1 - steps * 0.13)}`
      panel.style.pointerEvents = steps <= VISIBLE ? "auto" : "none"
    })

    /* Only the caption is React's business, and only when it actually turns over. */
    const nearest = Math.round(position) % slots.length
    if (nearest !== centreRef.current) {
      centreRef.current = nearest
      setCentre(nearest)
    }
  }, [])

  React.useLayoutEffect(() => paint(positionRef.current), [paint])

  React.useEffect(() => {
    /* Hovering holds the wall still; so does having a sector open. */
    if (held || opened) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let previous = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - previous) / 1000
      previous = now
      positionRef.current = (positionRef.current + elapsed * SPEED) % slots.length
      paint(positionRef.current)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [held, opened, paint])

  const current = slots[centre]

  return (
    <section
      id="industries"
      className="section relative overflow-hidden bg-off [background-image:radial-gradient(rgb(26_29_46/0.07)_1px,transparent_1px)] [background-size:22px_22px]"
    >
      <Reveal className="relative z-2 text-center">
        <span className="eyebrow">Industries we serve</span>
        <h2 className="mx-auto max-w-[18ch] text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.2] font-medium tracking-[-0.015em]">
          The sector decides the specification.
        </h2>
      </Reveal>

      <div
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        className="relative my-[clamp(24px,3vw,44px)] h-[clamp(180px,22vw,300px)]"
      >
        {/* Scaled as a whole, so the projection holds its shape on small screens. */}
        <div className="absolute inset-0 scale-[0.5] min-[560px]:scale-[0.62] min-[900px]:scale-[0.78] min-[1280px]:scale-100">
          <div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{ perspective: `${PERSPECTIVE}px` }}
          >
            {slots.map((industry, index) => (
              <button
                key={index}
                ref={(node) => {
                  panelsRef.current[index] = node
                }}
                type="button"
                aria-label={`${industry.name} — open details`}
                onClick={() => setOpened(industry)}
                style={{
                  width: PANEL_W,
                  height: PANEL_H,
                  marginLeft: -PANEL_W / 2,
                  marginTop: -PANEL_H / 2,
                }}
                className="group absolute top-1/2 left-1/2 cursor-pointer rounded-[3px] shadow-[0_22px_54px_rgb(12_20_60/0.2)]"
              >
                <span className="block size-full overflow-hidden rounded-[3px] transition-transform duration-500 ease-expo group-hover:scale-[1.07] motion-reduce:transition-none">
                  <Image
                    src={images.industry(industry.slug)}
                    alt=""
                    fill
                    sizes="240px"
                    quality={70}
                    className="object-cover"
                  />
                </span>

                {/* Hover ring, so the panel under the pointer is unmistakable. */}
                <span className="pointer-events-none absolute inset-0 rounded-[3px] shadow-[inset_0_0_0_0_rgb(255_255_255/0)] transition-shadow duration-500 ease-expo group-hover:shadow-[inset_0_0_0_2px_rgb(255_255_255/0.92)]" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Reveal className="relative z-2 text-center">
        <p className="text-[clamp(17px,1.7vw,21px)] leading-[1.3] font-medium tracking-[-0.01em]">
          {current.name}
        </p>
        <p className="lead mx-auto mt-2">{current.challenge}</p>
      </Reveal>

      <Dialog
        open={opened !== null}
        onOpenChange={(open) => !open && setOpened(null)}
      >
        <DialogContent className="w-[min(880px,94vw)] overflow-hidden rounded-[28px] bg-white">
          {opened && <SectorDetail key={opened.slug} industry={opened} />}
        </DialogContent>
      </Dialog>

    </section>
  )
}

/**
 * The popup's contents, which settle in after the panel has expanded: the
 * photograph eases out of its overscale while each line of copy rises in turn.
 */
function SectorDetail({ industry }: { industry: Industry }) {
  const [settled, setSettled] = React.useState(false)

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setSettled(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  /** Nth thing to arrive, counted from the panel finishing its expansion. */
  const rise = (order: number) => ({
    className: cn(
      "transition-[opacity,translate] duration-700 ease-expo motion-reduce:transition-none",
      settled ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
    ),
    style: { transitionDelay: `${170 + order * 55}ms` },
  })

  return (
    <div className="grid max-h-[88vh] grid-cols-1 md:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)]">
      <span className="relative block overflow-hidden max-md:aspect-[16/10] md:min-h-[500px]">
        <Image
          src={images.industry(industry.slug)}
          alt=""
          fill
          sizes="(min-width: 768px) 450px, 94vw"
          className={cn(
            "object-cover transition-transform duration-[1400ms] ease-expo motion-reduce:transition-none",
            settled ? "scale-100" : "scale-[1.14]"
          )}
        />
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgb(12_20_60/0.18),transparent_45%)]" />
      </span>

      <div className="overflow-y-auto px-[clamp(26px,3.4vw,46px)] py-[clamp(30px,3.6vw,50px)]">
        <span {...rise(0)}>
          <span className="eyebrow">Industry</span>
        </span>

        <DialogTitle
          {...rise(1)}
          className={cn(
            rise(1).className,
            "mb-3 text-[clamp(1.45rem,2.5vw,2rem)] leading-[1.2] font-medium tracking-[-0.02em]"
          )}
        >
          {industry.name}
        </DialogTitle>

        <DialogDescription
          {...rise(2)}
          className={cn(rise(2).className, "lead mb-8 text-[15.5px]")}
        >
          {industry.challenge}
        </DialogDescription>

        <h4
          {...rise(3)}
          className={cn(
            rise(3).className,
            "mb-1 text-[11px] tracking-[0.16em] text-grey uppercase"
          )}
        >
          Systems that answer it
        </h4>
        <ul className="mb-8 list-none">
          {industry.systems.map((system, index) => (
            <li
              key={system}
              {...rise(4 + index)}
              className={cn(
                rise(4 + index).className,
                "flex items-baseline gap-3.5 border-b border-ink/8 py-3.5"
              )}
            >
              <span className="tnum text-[11px] text-grey">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px]">{system}</span>
            </li>
          ))}
        </ul>

        <div
          {...rise(4 + industry.systems.length)}
          className={cn(
            rise(4 + industry.systems.length).className,
            "mb-8 rounded-2xl bg-off px-5.5 py-4.5"
          )}
        >
          <span className="mb-1 block text-[11px] tracking-[0.16em] text-grey uppercase">
            Reference project
          </span>
          <p className="text-[14.5px] leading-[1.5]">{industry.reference}</p>
        </div>

        <div {...rise(5 + industry.systems.length)}>
          <ArrowButton href="/#contact">Request a specification</ArrowButton>
        </div>
      </div>
    </div>
  )
}
