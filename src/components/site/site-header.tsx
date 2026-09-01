"use client"

import * as React from "react"

import { ArrowButton, ChainGlyph } from "@/components/site/arrow-button"
import { megaMenu } from "@/data/catenate"
import { cn } from "@/lib/utils"

/** Scroll depth at which the transparent nav takes on its solid backing. */
const SOLID_AFTER = 80
/** Hover dwell before the mega panel swaps, so a diagonal sweep doesn't thrash. */
const HOVER_DWELL = 150

export function SiteHeader() {
  const [solid, setSolid] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [activeKey, setActiveKey] = React.useState<string | null>(null)
  const navRef = React.useRef<HTMLElement>(null)
  const hoverTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > SOLID_AFTER)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const close = React.useCallback(() => {
    setOpen(false)
    setActiveKey(null)
  }, [])

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

  React.useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current)
    },
    []
  )

  const openWith = (key: string) => {
    setActiveKey(key)
    setOpen(true)
  }

  const toggle = (key: string) => {
    if (open && activeKey === key) close()
    else openWith(key)
  }

  const scheduleActive = (key: string) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(() => setActiveKey(key), HOVER_DWELL)
  }

  const onColumnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
    event.preventDefault()

    const links = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>("[data-mega-link]")
    )
    const current = links.indexOf(document.activeElement as HTMLButtonElement)
    const delta = event.key === "ArrowDown" ? 1 : -1
    const next = links[(current + delta + links.length) % links.length]

    next?.focus()
    setActiveKey(next?.dataset.megaLink ?? null)
  }

  const active = megaMenu.find((section) => section.key === activeKey)

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
        <a
          href="#hero"
          className={cn(
            "text-[21px] font-semibold tracking-[-0.02em] transition-colors duration-300 ease-expo",
            solid || open ? "text-blue" : "text-white"
          )}
        >
          CATEN<span className="tracking-[-0.05em]">ATE</span>
        </a>

        <nav className="hidden flex-none items-center gap-0.5 min-[961px]:flex" aria-label="Primary">
          {megaMenu.map((section) => (
            <button
              key={section.key}
              type="button"
              aria-expanded={open && activeKey === section.key}
              onClick={() => toggle(section.key)}
              onMouseEnter={() => open && openWith(section.key)}
              className={cn(
                "rounded-full px-3.5 py-2.25 text-[14.5px] font-medium whitespace-nowrap transition-[color,background-color] duration-300 ease-expo",
                solid || open
                  ? "text-grey hover:bg-blue/8 hover:text-blue"
                  : "text-white/86 hover:bg-white/15 hover:text-white",
                activeKey === section.key &&
                  (solid || open ? "bg-blue/8 text-blue" : "bg-white/15 text-white")
              )}
            >
              {section.navLabel}
            </button>
          ))}

          <ArrowButton
            href="#contact"
            variant={solid || open ? "brand" : "brand"}
            size="pill-sm"
            className="ml-2.5"
          >
            Request a specification
          </ArrowButton>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => (open ? close() : openWith(megaMenu[0].key))}
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

      {/* Mega menu */}
      <div
        role="region"
        aria-label="Site sections"
        className={cn(
          "content-pad absolute inset-x-0 top-nav grid grid-cols-1 bg-white pt-11 pb-13 shadow-[0_30px_60px_rgb(12_20_60/0.14)] transition-[opacity,transform,visibility] duration-350 ease-expo max-[960px]:max-h-[calc(100vh-var(--nav-height))] max-[960px]:overflow-y-auto max-[960px]:pt-5 max-[960px]:pb-8 min-[961px]:grid-cols-[40%_60%]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2.5 opacity-0"
        )}
      >
        <div
          className="flex flex-col"
          onMouseOver={(event) => {
            const link = (event.target as HTMLElement).closest<HTMLButtonElement>(
              "[data-mega-link]"
            )
            if (link?.dataset.megaLink) scheduleActive(link.dataset.megaLink)
          }}
          onKeyDown={onColumnKeyDown}
        >
          {megaMenu.map((section) => (
            <button
              key={section.key}
              type="button"
              data-mega-link={section.key}
              tabIndex={open ? 0 : -1}
              aria-expanded={activeKey === section.key}
              onClick={() => {
                if (hoverTimer.current) clearTimeout(hoverTimer.current)
                setActiveKey(section.key)
              }}
              className={cn(
                "relative flex items-center gap-3 text-left text-[26px] leading-[2.2] font-medium tracking-[-0.02em] transition-colors duration-200 ease-expo max-[960px]:border-b max-[960px]:border-ink/8 max-[960px]:py-3 max-[960px]:text-xl max-[960px]:leading-[1.6]",
                activeKey === section.key ? "text-blue" : "text-grey"
              )}
            >
              <ChainGlyph
                className={cn(
                  "opacity-100 transition-[opacity,transform] duration-200 ease-expo",
                  activeKey === section.key
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-2 opacity-0"
                )}
              />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        <div
          key={activeKey ?? "empty"}
          className={cn(
            "columns-2 gap-10 border-l border-ink/9 pl-[clamp(24px,4vw,56px)] transition-opacity duration-150 max-[960px]:columns-1 max-[960px]:border-l-0 max-[960px]:pt-1.5 max-[960px]:pb-5 max-[960px]:pl-0",
            active ? "opacity-100" : "opacity-0"
          )}
        >
          {active?.groups?.map((group) => (
            <React.Fragment key={group.title}>
              <div className="mt-3.5 mb-0.5 text-[11px] tracking-[0.16em] break-inside-avoid text-grey uppercase first:mt-0">
                {group.title}
              </div>
              {group.items.map((item) => (
                <MegaLink key={item} href="#brands" onNavigate={close}>
                  {item}
                </MegaLink>
              ))}
            </React.Fragment>
          ))}

          {active?.items?.map((item) => (
            <MegaLink key={item} href={active.href} onNavigate={close}>
              {item}
            </MegaLink>
          ))}
        </div>
      </div>
    </header>
  )
}

function MegaLink({
  href,
  children,
  onNavigate,
}: {
  href: string
  children: React.ReactNode
  onNavigate: () => void
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className="group/megalink relative block w-fit text-base leading-[2.6] break-inside-avoid text-ink/80 hover:text-blue"
    >
      {children}
      <span className="absolute bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-blue transition-transform duration-200 ease-expo group-hover/megalink:scale-x-100" />
    </a>
  )
}
