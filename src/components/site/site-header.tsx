"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import { ArrowButton } from "@/components/site/arrow-button"
import { megaMenu } from "@/data/catenate"
import { cn } from "@/lib/utils"

/** Scroll depth at which the transparent nav takes on its solid backing. */
const SOLID_AFTER = 80

export function SiteHeader() {
  /* Only the homepage puts a dark hero behind the nav; elsewhere it opens solid. */
  const overHero = usePathname() === "/"
  const [scrolled, setScrolled] = React.useState(false)
  /* Small screens have no room for the nav row, so it collapses behind a toggle. */
  const [open, setOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SOLID_AFTER)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

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

  const solid = scrolled || !overHero

  return (
    <header
      ref={navRef}
      className={cn(
        "sticky top-0 z-120 -mb-nav h-nav transition-[background-color,box-shadow] duration-300 ease-expo",
        solid &&
          !open &&
          "bg-white/88 shadow-[0_1px_0_rgb(26_29_46/0.08)] backdrop-blur-[18px]",
        open && "bg-white"
      )}
    >
      <div className="content-pad flex h-nav items-center justify-between gap-4.5">
        <Link
          href="/"
          className={cn(
            "text-[21px] font-semibold tracking-[-0.02em] transition-colors duration-300 ease-expo",
            solid || open ? "text-blue" : "text-white"
          )}
        >
          CATEN<span className="tracking-[-0.05em]">ATE</span>
        </Link>

        <nav
          className="hidden flex-none items-center gap-0.5 min-[961px]:flex"
          aria-label="Primary"
        >
          {megaMenu.map((section) => (
            <Link
              key={section.key}
              href={section.href}
              className={cn(
                "rounded-full px-3.5 py-2.25 text-[14.5px] font-medium whitespace-nowrap transition-[color,background-color] duration-300 ease-expo",
                solid || open
                  ? "text-grey hover:bg-blue/8 hover:text-blue"
                  : "text-white/86 hover:bg-white/15 hover:text-white"
              )}
            >
              {section.navLabel}
            </Link>
          ))}

          <ArrowButton href="/#contact" size="pill-sm" className="ml-2.5">
            Request a specification
          </ArrowButton>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((wasOpen) => !wasOpen)}
          className={cn(
            "grid size-10.5 place-items-center rounded-full transition-colors duration-300 ease-expo min-[961px]:hidden",
            solid || open
              ? "text-blue shadow-[inset_0_0_0_1px_rgb(27_42_122/0.18)]"
              : "text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.3)]"
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
