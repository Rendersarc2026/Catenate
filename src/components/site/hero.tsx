"use client"

import * as React from "react"
import { ArrowButton } from "@/components/site/arrow-button"
import { HeroBackdrop } from "@/components/site/hero-backdrop"
import { hero } from "@/data/catenate"

/** Peak translation of the mouse parallax layer, in px. */
const PARALLAX_X = 14
const PARALLAX_Y = 10

/** Star field particles for subtle ambient depth */
const STARS = [
  { x: 12, y: 18, size: 2, delay: "0s", duration: "3.2s" },
  { x: 24, y: 38, size: 1.5, delay: "1.1s", duration: "4.5s" },
  { x: 38, y: 14, size: 2.5, delay: "0.5s", duration: "3.8s" },
  { x: 52, y: 28, size: 1.5, delay: "2.1s", duration: "5.0s" },
  { x: 68, y: 16, size: 2, delay: "1.6s", duration: "3.5s" },
  { x: 82, y: 34, size: 2.5, delay: "0.8s", duration: "4.2s" },
  { x: 91, y: 20, size: 1.5, delay: "2.4s", duration: "4.8s" },
  { x: 18, y: 72, size: 2, delay: "1.4s", duration: "3.6s" },
  { x: 78, y: 68, size: 2, delay: "0.3s", duration: "4.0s" },
  { x: 88, y: 80, size: 1.5, delay: "1.9s", duration: "3.4s" },
]

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

export function Hero() {
  const [ready, setReady] = React.useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const containerRef = React.useRef<HTMLElement>(null)
  const wordmarkRef = React.useRef<HTMLDivElement>(null)
  const wordmarkParallaxRef = React.useRef<HTMLDivElement>(null)
  const landingScrollCueRef = React.useRef<HTMLDivElement>(null)
  const bannerContainerRef = React.useRef<HTMLDivElement>(null)
  const bannerInnerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const mouseParallaxRef = React.useRef<HTMLDivElement>(null)
  const statsRef = React.useRef<HTMLDivElement>(null)

  // Play the entrance on mount
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Interactive mouse parallax when at top
  React.useEffect(() => {
    if (reducedMotion) return
    const container = containerRef.current
    if (!container) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame: number | null = null

    const tick = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      if (wordmarkParallaxRef.current) {
        wordmarkParallaxRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      }
      if (mouseParallaxRef.current) {
        mouseParallaxRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      }

      const settled =
        Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05
      frame = settled ? null : requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame === null) frame = requestAnimationFrame(tick)
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      if (rect.top > -window.innerHeight * 0.5) {
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * PARALLAX_X
        targetY = ((event.clientY - rect.top) / window.innerHeight - 0.5) * PARALLAX_Y
        start()
      }
    }

    const onMouseLeave = () => {
      targetX = 0
      targetY = 0
      start()
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("mouseleave", onMouseLeave)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseleave", onMouseLeave)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  // Scroll-driven sticky cinematic banner reveal with paced, smooth scroll dampening
  React.useEffect(() => {
    if (reducedMotion) {
      if (bannerContainerRef.current) {
        bannerContainerRef.current.style.opacity = "1"
        bannerContainerRef.current.style.transform = "none"
        bannerContainerRef.current.style.visibility = "visible"
        bannerContainerRef.current.style.borderRadius = "0px"
        bannerContainerRef.current.style.padding = "0px"
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = "1"
        contentRef.current.style.transform = "none"
        contentRef.current.style.pointerEvents = "auto"
        contentRef.current.style.visibility = "visible"
      }
      if (statsRef.current) {
        statsRef.current.style.opacity = "1"
        statsRef.current.style.transform = "none"
        statsRef.current.style.visibility = "visible"
      }
      if (wordmarkRef.current) {
        wordmarkRef.current.style.display = "none"
      }
      if (landingScrollCueRef.current) {
        landingScrollCueRef.current.style.display = "none"
      }
      return
    }

    const container = containerRef.current
    if (!container) return

    let currentProgress = 0
    let targetProgress = 0
    let animFrame: number | null = null

    const calculateProgress = () => {
      const rect = container.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return 0
      const currentScroll = -rect.top
      return Math.min(Math.max(currentScroll / totalScrollable, 0), 1)
    }

    const updateStyles = (p: number) => {
      // 1. Landing CATENATE Wordmark (visible only on landing, fades out smoothly on scroll)
      if (wordmarkRef.current) {
        const wmOpacity = Math.max(0, 1 - p * 3.2)
        const wmScale = 1 + p * 0.12
        const wmTranslateY = -p * 45
        const wmBlur = p * 12
        wordmarkRef.current.style.opacity = wmOpacity.toFixed(3)
        wordmarkRef.current.style.transform = `translate3d(0, ${wmTranslateY.toFixed(1)}px, 0) scale(${wmScale.toFixed(3)})`
        wordmarkRef.current.style.filter = `blur(${wmBlur.toFixed(1)}px)`
        wordmarkRef.current.style.pointerEvents = "none"
        wordmarkRef.current.style.visibility = wmOpacity <= 0.001 ? "hidden" : "visible"
      }

      // 2. Landing Scroll Cue (fades out gracefully on first scroll)
      if (landingScrollCueRef.current) {
        const scOpacity = Math.max(0, 1 - p * 5.0)
        const scTranslateY = p * 20
        landingScrollCueRef.current.style.opacity = scOpacity.toFixed(3)
        landingScrollCueRef.current.style.transform = `translate3d(0, ${scTranslateY.toFixed(1)}px, 0)`
        landingScrollCueRef.current.style.visibility = scOpacity <= 0.001 ? "hidden" : "visible"
      }

      // 3. Expanding Earth Banner Visual (reveals smoothly on scroll)
      if (bannerContainerRef.current) {
        const bP = Math.min(Math.max((p - 0.08) / 0.62, 0), 1)
        const bannerScale = 0.88 + bP * 0.12 + (p > 0.7 ? (p - 0.7) * 0.04 : 0)
        const bannerOpacity = bP
        const bannerRadius = Math.max(0, 36 * (1 - bP))
        const bannerTranslateY = (1 - bP) * 50
        const bannerInset = Math.max(0, (1 - bP) * 24)

        bannerContainerRef.current.style.transform = `translate3d(0, ${bannerTranslateY.toFixed(1)}px, 0) scale(${bannerScale.toFixed(3)})`
        bannerContainerRef.current.style.opacity = bannerOpacity.toFixed(3)
        bannerContainerRef.current.style.borderRadius = `${bannerRadius.toFixed(1)}px`
        bannerContainerRef.current.style.padding = `${bannerInset.toFixed(1)}px`
        bannerContainerRef.current.style.visibility = bannerOpacity <= 0.001 ? "hidden" : "visible"
      }

      if (bannerInnerRef.current) {
        const bP = Math.min(Math.max((p - 0.08) / 0.62, 0), 1)
        const innerScale = 1.14 - bP * 0.14
        bannerInnerRef.current.style.transform = `scale(${innerScale.toFixed(3)})`
      }

      // 4. Foreground Headline & Buttons (reveals smoothly on scroll)
      if (contentRef.current) {
        const cP = Math.min(Math.max((p - 0.22) / 0.52, 0), 1)
        const contentTranslateY = (1 - cP) * 35
        contentRef.current.style.opacity = cP.toFixed(3)
        contentRef.current.style.transform = `translate3d(0, ${contentTranslateY.toFixed(1)}px, 0)`
        contentRef.current.style.pointerEvents = cP > 0.6 ? "auto" : "none"
        contentRef.current.style.visibility = cP <= 0.001 ? "hidden" : "visible"
      }

      // 5. Stats Row along bottom (reveals smoothly on scroll)
      if (statsRef.current) {
        const sP = Math.min(Math.max((p - 0.32) / 0.52, 0), 1)
        const statsTranslateY = (1 - sP) * 30
        statsRef.current.style.opacity = sP.toFixed(3)
        statsRef.current.style.transform = `translate3d(0, ${statsTranslateY.toFixed(1)}px, 0)`
        statsRef.current.style.visibility = sP <= 0.001 ? "hidden" : "visible"
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
      if (animFrame === null) {
        animFrame = requestAnimationFrame(tick)
      }
    }

    targetProgress = calculateProgress()
    currentProgress = targetProgress
    updateStyles(targetProgress)

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (animFrame !== null) cancelAnimationFrame(animFrame)
    }
  }, [reducedMotion])

  return (
    <section
      ref={containerRef}
      id="hero"
      data-ready={ready || undefined}
      className={`${
        ready ? "is-ready " : ""
      }on-blue relative w-full bg-black ${
        reducedMotion ? "min-h-screen" : "min-h-[300vh] sm:min-h-[350vh]"
      }`}
    >
      {/* Sticky Hero Viewport */}
      <div className="sticky top-0 h-screen h-dvh w-full overflow-hidden flex flex-col justify-between items-center text-center text-white bg-black pt-[130px] pb-6 sm:pt-[150px] sm:pb-10 content-pad select-none">
        {/* Ambient background glow & starfield */}
        <div
          className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(27,42,122,0.45),transparent_70%)] animate-[hero-glow-pulse_8s_ease-in-out_infinite]"
          aria-hidden="true"
        />

        {/* Constellation of ambient space star particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {STARS.map((star, idx) => (
            <div
              key={idx}
              className="absolute rounded-full bg-white will-change-transform"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `star-twinkle ${star.duration} ease-in-out infinite`,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>

        {/* 1. Landing State: Bold CATENATE centerpiece (Shown only on landing, fades out as you scroll) */}
        <div
          ref={wordmarkRef}
          className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none overflow-hidden will-change-transform"
          aria-hidden="true"
        >
          <div ref={wordmarkParallaxRef} className="will-change-transform px-4">
            <span className="hero-wordmark animate-[hero-wordmark-in_1.4s_var(--ease-out-expo)_both]">
              CATENATE
            </span>
          </div>
        </div>

        {/* Landing Scroll Cue (Bottom prompt inviting user to scroll, fades on first scroll) */}
        <div
          ref={landingScrollCueRef}
          className="absolute bottom-6 sm:bottom-10 z-1 flex flex-col items-center justify-center gap-2 text-white/50 text-[11px] tracking-[0.2em] uppercase font-medium pointer-events-none will-change-transform animate-[hero-fade-in_1.2s_var(--ease-out-expo)_0.4s_both]"
          aria-hidden="true"
        >
          <span>Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center p-1 shadow-[0_0_12px_rgba(255,255,255,0.1)]">
            <div className="w-1 h-2 rounded-full bg-white/80 animate-[scroll-wheel_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* 2. Revealed State: Expanding Earth Banner Visual (Reveals on scroll) */}
        <div
          ref={bannerContainerRef}
          className="absolute inset-0 z-2 pointer-events-none overflow-hidden flex items-center justify-center will-change-transform opacity-0 invisible"
          aria-hidden="true"
        >
          <div
            ref={bannerInnerRef}
            className="relative size-full overflow-hidden rounded-[inherit] shadow-[0_20px_60px_rgba(0,0,0,0.8)] will-change-transform"
          >
            <HeroBackdrop />
          </div>
        </div>

        {/* 3. Revealed State: Foreground White Headline & Action Buttons (Reveals on scroll) */}
        <div
          ref={contentRef}
          className="relative z-10 max-w-[1050px] mx-auto mt-2 sm:mt-6 will-change-transform opacity-0 invisible pointer-events-none"
        >
          <div ref={mouseParallaxRef} className="will-change-transform">
            {/* White headline text */}
            <h1 className="mx-auto text-[clamp(1.75rem,3.2vw,2.85rem)] leading-[1.3] font-light tracking-[-0.02em] text-white">
              {hero.headlineLines.map((line) => (
                <span
                  key={line}
                  className="hero-line block whitespace-normal sm:whitespace-nowrap"
                >
                  <span>{line}</span>
                </span>
              ))}
            </h1>
          </div>

          {/* CTA Buttons */}
          <div className="mt-7 sm:mt-9 flex flex-wrap justify-center items-center gap-3.5">
            <ArrowButton href="/#presence" variant="onBlue" size="pill">
              Explore our global network
            </ArrowButton>
            <ArrowButton href="/brands" variant="line" size="pill">
              Our portfolio
            </ArrowButton>
          </div>
        </div>

        {/* 4. Revealed State: Stats row anchored along the bottom (Reveals on scroll) */}
        <div
          ref={statsRef}
          className="relative z-10 w-full max-w-[1220px] grid grid-cols-4 pt-4 mt-auto max-[720px]:grid-cols-2 max-[720px]:gap-y-6 will-change-transform opacity-0 invisible"
        >
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="border-l border-white/16 px-4 py-1 text-center first:border-l-0 max-[720px]:nth-3:border-l-0"
            >
              <b className="tnum block text-[clamp(2.1rem,3.6vw,3rem)] leading-none font-light tracking-[-0.025em] text-white">
                {stat.value}
              </b>
              <span className="mt-2.5 block text-[11px] sm:text-[12px] tracking-[0.18em] text-white/55 uppercase font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
