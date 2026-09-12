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
  /* Pages that open on a full-bleed dark hero, which the nav sits over. */
  const hasHero = isHome || pathname === "/about"
  const [scrolled, setScrolled] = React.useState(false)
  const [pastHero, setPastHero] = React.useState(!hasHero)
  const [visible, setVisible] = React.useState(true)
  /* Small screens have no room for the nav row, so it collapses behind a toggle. */
  const [open, setOpen] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)
  const lastScrollYRef = React.useRef(0)

  React.useEffect(() => {
    lastScrollYRef.current = window.scrollY

    /*
     * The hero's height only changes when the page is laid out again, so it is
     * measured on resize rather than on scroll. Reading `offsetTop`/
     * `offsetHeight` from inside the scroll handler forced the browser to
     * flush layout on every single scroll event — on a smooth-scrolled page
     * that is every frame, for a number that had not moved.
     */
    let heroBottom = 600

    const measure = () => {
      if (!hasHero) return
      const heroEl = document.getElementById("hero")
      heroBottom = heroEl
        ? heroEl.offsetTop + heroEl.offsetHeight - 90
        : 600
    }

    const read = () => {
      const currentScrollY = window.scrollY

      setScrolled(currentScrollY > 30)
      setPastHero(hasHero ? currentScrollY >= heroBottom : true)

      // Hide when scrolling down, show when scrolling up.
      const diff = currentScrollY - lastScrollYRef.current
      if (currentScrollY <= 40) {
        setVisible(true)
      } else if (diff > 8 && currentScrollY > 90) {
        setVisible(false)
      } else if (diff < -6) {
        setVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    /* One read per frame, however many scroll events the frame delivers. */
    let frame: number | null = null
    const onScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(() => {
        frame = null
        read()
      })
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (frame !== null) cancelAnimationFrame(frame)
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
          className="hidden flex-none items-center justify-center gap-7 min-[961px]:flex"
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
                  "group relative px-1 py-1.5 text-[14.5px] whitespace-nowrap transition-colors duration-200 ease-out",
                  isActive
                    ? isDarkNav && !open
                      ? "text-white font-medium"
                      : "text-blue font-semibold"
                    : isDarkNav && !open
                      ? "text-white/70 hover:text-white font-normal"
                      : "text-grey hover:text-blue font-normal"
                )}
              >
                <span>{section.navLabel}</span>
                <span
                  className={cn(
                    "absolute -bottom-1 inset-x-0 h-[2px] rounded-full transition-all duration-250 ease-out",
                    isActive
                      ? isDarkNav && !open
                        ? "bg-white opacity-100 scale-x-100"
                        : "bg-blue opacity-100 scale-x-100"
                      : isDarkNav && !open
                        ? "bg-white/40 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                        : "bg-blue/30 opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                  )}
                  aria-hidden="true"
                />
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
