"use client"

import * as React from "react"

import { createScrollTrack } from "@/lib/scroll-track"
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion"

/** Share of the scroll track spent growing to full screen. */
const GROW_END = 0.45
/** Share of the scroll track spent held at full screen (the "hold" beat). */
const HOLD_END = 0.75
/** Upper bound on the enlarged text scale, before the width cap kicks in. */
const MAX_SCALE = 1.35

/** Scroll track bounds for letter-by-letter reveal */
const REVEAL_START = 0.08
const REVEAL_END = 0.68
const FADE_WINDOW = 3.8

interface CharItem {
  char: string
  globalIndex: number
}

interface WordItem {
  chars: CharItem[]
}

function parseLine(text: string, startIndex: number): { words: WordItem[]; nextIndex: number } {
  const rawWords = text.split(" ")
  let curr = startIndex
  const words: WordItem[] = []

  rawWords.forEach((wordStr, wIdx) => {
    const chars: CharItem[] = []
    for (let i = 0; i < wordStr.length; i++) {
      chars.push({
        char: wordStr[i],
        globalIndex: curr++,
      })
    }
    words.push({ chars })
    if (wIdx < rawWords.length - 1) {
      curr++ // slot for space between words
    }
  })

  return { words, nextIndex: curr }
}

const LINE_1_PARSED = parseLine(
  "A global market intelligence & distribution platform built around",
  0
)
const LINE_BREAK_PAUSE = 2
const LINE_2_PARSED = parseLine(
  "Trusted Brands, Efficient Teams, Technical knowhow & Dependable Supply Chain.",
  LINE_1_PARSED.nextIndex + LINE_BREAK_PAUSE
)
const TOTAL_CHARS = LINE_2_PARSED.nextIndex

/** 0 → 1 → 0 across the track, with the middle stretch held at 1. */
function phase(p: number) {
  if (p < GROW_END) return p / GROW_END
  if (p < HOLD_END) return 1
  return 1 - (p - HOLD_END) / (1 - HOLD_END)
}

/** easeInOutCubic — settles into and out of the held state. */
function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Editorial showcase section:
 * - 16:9 widescreen black box with rounded corners and elevation
 * - Centered white headline statement with scroll-driven letter-by-letter reveal
 * - Smooth expansion into full-screen as you scroll
 */
export function HeroStatement() {
  const reducedMotion = usePrefersReducedMotion()

  const trackRef = React.useRef<HTMLElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const letterRefs = React.useRef<(HTMLSpanElement | null)[]>([])
  const letterProgressRef = React.useRef<Float32Array | null>(null)

  React.useEffect(() => {
    if (reducedMotion) return

    const track = trackRef.current
    if (!track) return

    letterProgressRef.current = new Float32Array(TOTAL_CHARS).fill(-1)

    /** Cap the zoom so the nowrap lines never run past the viewport edges. */
    const maxScale = () => {
      const natural = contentRef.current?.offsetWidth ?? 0
      if (natural <= 0) return MAX_SCALE
      return Math.min(MAX_SCALE, (window.innerWidth * 0.92) / natural)
    }

    let scaleCeiling = maxScale()
    let viewportW = window.innerWidth
    let viewportH = window.innerHeight
    /*
     * Where the wavefront sat on the previous frame. Only letters between the
     * old and the new cursor can have changed, so the reveal touches the few
     * glyphs actually moving instead of restyling all of them every frame.
     */
    let paintedCursor = 0

    const onResize = () => {
      viewportW = window.innerWidth
      viewportH = window.innerHeight
      scaleCeiling = maxScale()
    }
    window.addEventListener("resize", onResize, { passive: true })

    const paint = (p: number) => {
      const e = ease(phase(p))

      // 1. Resting 16:9 widescreen dimensions.
      const restingW = Math.min(1240, viewportW * 0.88)
      const idealH = restingW * (9 / 16)
      const restingH = Math.max(Math.min(idealH, viewportH * 0.7), 240)

      const insetX = ((1 - e) * Math.max(0, (viewportW - restingW) / 2)).toFixed(1)
      const insetY = ((1 - e) * Math.max(0, (viewportH - restingH) / 2)).toFixed(1)
      const radius = ((1 - e) * 24).toFixed(1)

      /*
       * 2. The panel grows by clip, not by box. Animating `inset` moved the
       * element's own geometry, so every frame of the expansion cost a layout
       * pass; a clip-path on a panel that is already full-bleed is resolved
       * during paint and looks identical.
       */
      if (panelRef.current) {
        panelRef.current.style.clipPath = `inset(${insetY}px ${insetX}px round ${radius}px)`
      }

      // 3. Typography container scale and exit fade.
      const exitP = p > 0.82 ? Math.min((p - 0.82) / 0.18, 1) : 0
      if (contentRef.current) {
        const scale = 1 + (scaleCeiling - 1) * e
        contentRef.current.style.transform = `scale(${scale.toFixed(4)})`
        contentRef.current.style.opacity = (1 - ease(exitP)).toFixed(3)
      }

      // 4. Letter-by-letter reveal with a glowing wavefront.
      const r = Math.min(Math.max((p - REVEAL_START) / (REVEAL_END - REVEAL_START), 0), 1)
      const cursor = r * TOTAL_CHARS
      const prev = letterProgressRef.current
      if (!prev) return

      /*
       * A letter's state is a clamped function of `cursor - i`, so anything
       * outside the swept band is already at the value it should hold. The
       * bounds widen by one either side to catch the glyphs the band just
       * crossed and settle them at their end state.
       */
      const from = Math.max(0, Math.floor(Math.min(cursor, paintedCursor) - FADE_WINDOW) - 1)
      const to = Math.min(TOTAL_CHARS - 1, Math.ceil(Math.max(cursor, paintedCursor)) + 1)
      paintedCursor = cursor

      for (let i = from; i <= to; i++) {
        const el = letterRefs.current[i]
        if (!el) continue

        const localProgress = Math.min(Math.max((cursor - i) / FADE_WINDOW, 0), 1)
        if (Math.abs(localProgress - prev[i]) < 0.005) continue
        prev[i] = localProgress

        if (localProgress <= 0) {
          el.style.opacity = "0.2"
          el.style.color = "rgba(255, 255, 255, 0.2)"
          el.style.textShadow = "none"
        } else if (localProgress >= 1) {
          el.style.opacity = "1"
          el.style.color = "#ffffff"
          el.style.textShadow = "0 0 1px rgba(255, 255, 255, 0.4)"
        } else {
          const opacity = 0.2 + 0.8 * localProgress
          const glow = Math.sin(localProgress * Math.PI)
          el.style.opacity = opacity.toFixed(3)
          el.style.color = `rgba(255, 255, 255, ${opacity.toFixed(3)})`
          if (glow > 0.05) {
            el.style.textShadow = `0 0 ${(10 * glow).toFixed(1)}px rgba(255, 255, 255, ${(0.85 * glow).toFixed(2)}), 0 0 ${(22 * glow).toFixed(1)}px rgba(255, 255, 255, ${(0.45 * glow).toFixed(2)})`
          } else {
            el.style.textShadow = "none"
          }
        }
      }
    }

    const stop = createScrollTrack({ element: track, paint })

    return () => {
      window.removeEventListener("resize", onResize)
      stop()
    }
  }, [reducedMotion])

  // Reduced motion accessible fallback
  if (reducedMotion) {
    return (
      <section className="content-pad bg-white py-16 sm:py-24 border-b border-ink/8">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center">
          <div className="relative w-full aspect-[16/9] min-h-[320px] rounded-2xl sm:rounded-3xl bg-black overflow-hidden shadow-2xl flex items-center justify-center p-6 sm:p-12 text-center">
            <h2 className="relative z-10 text-[clamp(1.1rem,1.55vw,1.65rem)] leading-[1.48] sm:leading-[1.54] font-medium tracking-[-0.015em] text-white text-balance max-w-[min(1080px,86vw)] px-4 sm:px-8">
              <span className="block whitespace-normal lg:whitespace-nowrap">
                A global market intelligence &amp; distribution platform built around
              </span>
              <span className="block whitespace-normal lg:whitespace-nowrap mt-2 sm:mt-2.5">
                Trusted Brands, Efficient Teams, Technical knowhow &amp; Dependable Supply Chain.
              </span>
            </h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={trackRef}
      className="relative bg-white border-b border-ink/8 min-h-[220vh] sm:min-h-[260vh]"
    >
      <div className="sticky top-0 flex h-screen h-dvh w-full items-center justify-center overflow-hidden [contain:layout_paint] content-pad">
        {/* Backing Widescreen 16:9 Black Box that expands on scroll */}
        <div
          ref={panelRef}
          /* Collapsed until the first paint sizes it, so the full-bleed box
             never flashes between hydration and the opening frame. */
          style={{ clipPath: "inset(50% round 24px)" }}
          className="absolute inset-0 bg-black will-change-[clip-path] shadow-[0_25px_65px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
          aria-hidden="true"
        />

        {/* White Headline Statement with letter-by-letter reveal */}
        <div
          ref={contentRef}
          className="relative z-20 w-fit max-w-[min(1080px,86vw)] text-center origin-center will-change-transform px-4 sm:px-8 md:px-12 pointer-events-none"
        >
          <h2
            className="text-[clamp(1.1rem,1.55vw,1.65rem)] leading-[1.48] sm:leading-[1.54] font-medium tracking-[-0.015em] text-white/20 text-balance select-none antialiased"
            aria-label="A global market intelligence & distribution platform built around Trusted Brands, Efficient Teams, Technical knowhow & Dependable Supply Chain."
          >
            <span className="sr-only">
              A global market intelligence &amp; distribution platform built around
              Trusted Brands, Efficient Teams, Technical knowhow &amp; Dependable Supply Chain.
            </span>
            <span aria-hidden="true" className="block">
              {/* Line 1 */}
              <span className="block whitespace-normal lg:whitespace-nowrap">
                {LINE_1_PARSED.words.map((word, wIdx) => (
                  <React.Fragment key={wIdx}>
                    <span className="inline-block whitespace-nowrap">
                      {word.chars.map((item) => (
                        <span
                          key={item.globalIndex}
                          ref={(el) => {
                            letterRefs.current[item.globalIndex] = el
                          }}
                          className="inline-block align-baseline"
                          style={{
                            color: "rgba(255, 255, 255, 0.2)",
                            opacity: 0.2,
                          }}
                        >
                          {item.char}
                        </span>
                      ))}
                    </span>
                    {wIdx < LINE_1_PARSED.words.length - 1 && " "}
                  </React.Fragment>
                ))}
              </span>

              {/* Line 2 */}
              <span className="block whitespace-normal lg:whitespace-nowrap mt-2 sm:mt-2.5">
                {LINE_2_PARSED.words.map((word, wIdx) => (
                  <React.Fragment key={wIdx}>
                    <span className="inline-block whitespace-nowrap">
                      {word.chars.map((item) => (
                        <span
                          key={item.globalIndex}
                          ref={(el) => {
                            letterRefs.current[item.globalIndex] = el
                          }}
                          className="inline-block align-baseline"
                          style={{
                            color: "rgba(255, 255, 255, 0.2)",
                            opacity: 0.2,
                          }}
                        >
                          {item.char}
                        </span>
                      ))}
                    </span>
                    {wIdx < LINE_2_PARSED.words.length - 1 && " "}
                  </React.Fragment>
                ))}
              </span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  )
}
