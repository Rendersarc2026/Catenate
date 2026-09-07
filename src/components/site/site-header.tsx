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
  const hasHero = isHome || pathname === "/about"
  const [scrolled, setScrolled] = React.useState(false)
  const [pastHero, setPastHero] = React.useState(!hasHero)
  const [visible, setVisible] = React.useState(true)
  /* Small screens have no room for the nav row, so it collapses behind a toggle. */
  const [open, setOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)
  const lastScrollYRef = React.useRef(0)

  React.useEffect(() => {
    lastScrollYRef.current = typeof window !== "undefined" ? window.scrollY : 0

    const onScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 30)

      if (hasHero) {
        const heroEl = document.getElementById("hero")
        if (heroEl) {
          const heroBottom = heroEl.offsetTop + heroEl.offsetHeight - 90
          setPastHero(currentScrollY >= heroBottom)
        } else {
          setPastHero(currentScrollY > 600)
        }
      } else {
        setPastHero(true)
      }

      // Hide when scrolling down, show when scrolling up
      const diff = currentScrollY - lastScrollYRef.current

      if (currentScrollY <= 40) {
        // At the very top: always visible
        setVisible(true)
      } else if (diff > 8 && currentScrollY > 90) {
        // Scrolling down past 90px threshold: hide header with animation
        setVisible(false)
      } else if (diff < -6) {
        // Scrolling up: reveal header smoothly
        setVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [hasHero])

  // Accessibility: reveal header immediately if a user focuses inside it (Tab navigation)
  React.useEffect(() => {
    const onFocusIn = () => setVisible(true)
    const headerEl = navRef.current
    headerEl?.addEventListener("focusin", onFocusIn)
    return () => headerEl?.removeEventListener("focusin", onFocusIn)
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

  const isDarkNav = hasHero && !pastHero
  // Keep header visible if mobile menu is open
  const isHidden = !visible && !open && scrolled

  return (
    <header
      ref={navRef}
      className={cn(
        "site-header sticky top-0 z-120 -mb-nav h-nav",
        isHidden ? "-translate-y-full pointer-events-none" : "translate-y-0 pointer-events-auto",
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
          className="hidden flex-none items-center justify-center gap-1 min-[961px]:flex"
          aria-label="Primary"
        >
          {megaMenu.map((section) => {
            const isActive =
              section.href === "/"
                ? pathname === "/"
                : pathname.startsWith(section.href)

            return (
              <Link
                key={section.key}
                href={section.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[14px] whitespace-nowrap transition-all duration-200 ease-out",
                  isActive
                    ? isDarkNav && !open
                      ? "bg-white/16 text-white font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]"
                      : "bg-blue/10 text-blue font-semibold shadow-[inset_0_0_0_1px_rgba(42,88,255,0.16)]"
                    : isDarkNav && !open
                      ? "text-white/75 hover:bg-white/10 hover:text-white font-medium"
                      : "text-grey hover:bg-blue/8 hover:text-blue font-medium"
                )}
              >
                <span>{section.navLabel}</span>
                {isActive && (
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2.5px] w-5 rounded-full shadow-sm transition-all duration-300",
                      isDarkNav && !open ? "bg-white" : "bg-blue"
                    )}
                    aria-hidden="true"
                  />
                )}
              </Link>
            )
          })}
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
                : "text-blue shadow-[inset_0_0_0_1px_rgb(26_29_46/0.18)]"
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
          "content-pad absolute inset-x-0 top-nav flex flex-col bg-white pt-5 pb-8 shadow-[0_30px_60px_rgb(18_20_28/0.14)] transition-[opacity,transform,visibility] duration-350 ease-expo min-[961px]:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2.5 opacity-0"
        )}
      >
        {megaMenu.map((section) => {
          const isActive =
            section.href === "/"
              ? pathname === "/"
              : pathname.startsWith(section.href)

          return (
            <Link
              key={section.key}
              href={section.href}
              tabIndex={open ? 0 : -1}
              onClick={close}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center justify-between border-b border-ink/8 py-3.5 text-xl leading-[1.6] tracking-[-0.02em] transition-colors duration-200 ease-expo",
                isActive
                  ? "font-semibold text-blue"
                  : "font-medium text-grey hover:text-blue"
              )}
            >
              <span>{section.label}</span>
              {isActive && (
                <span
                  className="size-2 rounded-full bg-blue"
                  aria-hidden="true"
                />
              )}
            </Link>
          )
        })}

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
