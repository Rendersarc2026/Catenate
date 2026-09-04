"use client"

import * as React from "react"

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

function usePrefersReducedMotion() {
  const subscribe = React.useCallback((callback: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    mq.addEventListener("change", callback)
    return () => mq.removeEventListener("change", callback)
  }, [])

  const getSnapshot = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const getServerSnapshot = () => false

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

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

    let currentProgress = 0
    let targetProgress = 0
    let animFrame: number | null = null

    const calculateProgress = () => {
      const rect = track.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return 0
      return Math.min(Math.max(-rect.top / totalScrollable, 0), 1)
    }

    /** Cap the zoom so the nowrap lines never run past the viewport edges. */
    const maxScale = () => {
      const natural = contentRef.current?.offsetWidth ?? 0
      if (natural <= 0) return MAX_SCALE
      return Math.min(MAX_SCALE, (window.innerWidth * 0.92) / natural)
    }

    let scaleCeiling = MAX_SCALE

    const updateStyles = (p: number) => {
      const e = ease(phase(p))

      // 1. Calculate resting 16:9 widescreen dimensions
      const restingW = Math.min(1240, window.innerWidth * 0.88)
      const idealH = restingW * (9 / 16)
      const restingH = Math.max(Math.min(idealH, window.innerHeight * 0.7), 240)

      const restingInsetX = Math.max(0, (window.innerWidth - restingW) / 2)
      const restingInsetY = Math.max(0, (window.innerHeight - restingH) / 2)

      const currentInsetX = (1 - e) * restingInsetX
      const currentInsetY = (1 - e) * restingInsetY
      const currentRadius = (1 - e) * 24

      // 2. Black widescreen panel expansion
      if (panelRef.current) {
        panelRef.current.style.inset = `${currentInsetY.toFixed(1)}px ${currentInsetX.toFixed(1)}px`
        panelRef.current.style.borderRadius = `${currentRadius.toFixed(1)}px`
      }

      // 3. Typography container scale & exit fade
      const exitP = p > 0.82 ? Math.min((p - 0.82) / 0.18, 1) : 0
      const exitFade = 1 - ease(exitP)

      if (contentRef.current) {
        const scale = 1 + (scaleCeiling - 1) * e
        contentRef.current.style.transform = `scale(${scale.toFixed(4)})`
        contentRef.current.style.opacity = exitFade.toFixed(3)
      }

      // 4. Letter-by-letter left-to-right reveal with subtle glowing wavefront
      const r = Math.min(Math.max((p - REVEAL_START) / (REVEAL_END - REVEAL_START), 0), 1)
      const cursor = r * TOTAL_CHARS

      if (letterProgressRef.current) {
        const prev = letterProgressRef.current
        for (let i = 0; i < TOTAL_CHARS; i++) {
          const el = letterRefs.current[i]
          if (!el) continue

          const diff = cursor - i
          const localProgress = Math.min(Math.max(diff / FADE_WINDOW, 0), 1)

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
    }

    const tick = () => {
      currentProgress += (targetProgress - currentProgress) * 0.14
      updateStyles(currentProgress)
      if (Math.abs(targetProgress - currentProgress) > 0.0005) {
        animFrame = requestAnimationFrame(tick)
      } else {
        currentProgress = targetProgress
        updateStyles(targetProgress)
        animFrame = null
      }
    }

    const onScroll = () => {
      targetProgress = calculateProgress()
      if (animFrame === null) animFrame = requestAnimationFrame(tick)
    }

    const onResize = () => {
      scaleCeiling = maxScale()
      onScroll()
    }

    scaleCeiling = maxScale()
    targetProgress = calculateProgress()
    currentProgress = targetProgress
    updateStyles(targetProgress)

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (animFrame !== null) cancelAnimationFrame(animFrame)
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
      <div className="sticky top-0 flex h-screen h-dvh w-full items-center justify-center overflow-hidden content-pad">
        {/* Backing Widescreen 16:9 Black Box that expands on scroll */}
        <div
          ref={panelRef}
          className="absolute bg-black will-change-[inset,border-radius] shadow-[0_25px_65px_-15px_rgba(0,0,0,0.5)] overflow-hidden"
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
                          className="inline-block align-baseline will-change-[color,opacity,text-shadow]"
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
                          className="inline-block align-baseline will-change-[color,opacity,text-shadow]"
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
