"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import { megaMenu } from "@/data/catenate"
import { cn } from "@/lib/utils"


export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = React.useState(false)
  const [pastHero, setPastHero] = React.useState(!isHome)
  /* Small screens have no room for the nav row, so it collapses behind a toggle. */
  const [open, setOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 30)

      if (isHome) {
        const heroEl = document.getElementById("hero")
        if (heroEl) {
          const heroBottom = heroEl.offsetTop + heroEl.offsetHeight - 90
          setPastHero(scrollY >= heroBottom)
        } else {
          setPastHero(scrollY > 600)
        }
      } else {
        setPastHero(true)
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [isHome])

  const close = React.useCallback(() => setOpen(false), [])

  React.useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close()
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
    }
  }, [open, close])

  const isDarkNav = isHome && !pastHero

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-120 -mb-nav h-nav transition-[background-color,box-shadow] duration-300 ease-expo",
        isDarkNav &&
          scrolled &&
          !open &&
          "bg-black/60 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[16px]",
        !isDarkNav &&
          !open &&
          "bg-white/88 shadow-[0_1px_0_rgb(26_29_46/0.08)] backdrop-blur-[18px]",
        open && "bg-white"
      )}
    >
      <div className="content-pad flex h-nav items-center justify-between gap-4.5">
        <div className="flex flex-1 items-center justify-start">
          <Link
            href="/"
            className={cn(
              "text-[21px] font-semibold tracking-[-0.02em] transition-colors duration-300 ease-expo",
              isDarkNav && !open ? "text-white" : "text-blue"
            )}
          >
            CATEN<span className="tracking-[-0.05em]">ATE</span>
          </Link>
        </div>

        <nav
          className="hidden flex-none items-center justify-center gap-0.5 min-[961px]:flex"
          aria-label="Primary"
        >
          {megaMenu.map((section) => (
            <Link
              key={section.key}
              href={section.href}
              className={cn(
                "rounded-full px-3.5 py-2.25 text-[14.5px] font-medium whitespace-nowrap transition-[color,background-color] duration-300 ease-expo",
                isDarkNav && !open
                  ? "text-white/86 hover:bg-white/15 hover:text-white"
                  : "text-grey hover:bg-blue/8 hover:text-blue"
              )}
            >
              {section.navLabel}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end">
          <div className="hidden min-[961px]:block">
            <ArrowButton href="/#contact" size="pill-sm">
              Request a specification
            </ArrowButton>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            className={cn(
              "grid size-10.5 place-items-center rounded-full transition-colors duration-300 ease-expo min-[961px]:hidden",
              isDarkNav && !open
                ? "text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.3)]"
                : "text-blue shadow-[inset_0_0_0_1px_rgb(27_42_122/0.18)]"
            )}
          >
          <svg
            width="18"
            height="12"
            viewBox="0 0 18 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M0 1h18M0 6h18M0 11h18" />
          </svg>
        </button>
        </div>
      </div>

      {/* The same nav, stacked, for the widths that hide the row above. */}
      <nav
        aria-label="Primary"
        className={cn(
          "content-pad absolute inset-x-0 top-nav flex flex-col bg-white pt-5 pb-8 shadow-[0_30px_60px_rgb(12_20_60/0.14)] transition-[opacity,transform,visibility] duration-350 ease-expo min-[961px]:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2.5 opacity-0"
        )}
      >
        {megaMenu.map((section) => (
          <Link
            key={section.key}
            href={section.href}
            tabIndex={open ? 0 : -1}
            onClick={close}
            className="border-b border-ink/8 py-3 text-xl leading-[1.6] font-medium tracking-[-0.02em] text-grey transition-colors duration-200 ease-expo hover:text-blue"
          >
            {section.label}
          </Link>
        ))}

        <ArrowButton
          href="/#contact"
          size="pill-sm"
          className="mt-6 self-start"
          tabIndex={open ? 0 : -1}
          onClick={close}
        >
          Request a specification
        </ArrowButton>
      </nav>
    </header>
  )
}
