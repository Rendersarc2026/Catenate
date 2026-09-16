import type Lenis from "lenis"

/*
 * Moving the page from code, on a Lenis-smoothed page.
 *
 * A plain `window.scrollTo` leaves Lenis chasing its old target, so the next
 * wheel tick drags the page back. And a jump reads, to anything watching the
 * scroll direction, exactly like the reader scrolling — so the header would
 * slide in on every jump back up the page.
 */

/** The running instance, so a section can move the page without Lenis fighting it. */
let active: Lenis | null = null

/** Where the last `jumpTo` landed, until a scroll reader has seen it. */
let jumpTarget: number | null = null

export function setActiveLenis(lenis: Lenis | null) {
  active = lenis
}

/** Jumps the page to `y` at once, keeping Lenis' own target in step. */
export function jumpTo(y: number) {
  jumpTarget = y
  if (active) active.scrollTo(y, { immediate: true, force: true })
  else window.scrollTo({ top: y, behavior: "instant" })
}

/**
 * True once for a scroll position that a `jumpTo` put there, so direction-
 * sensitive UI (the header) can ignore a jump the reader did not scroll.
 */
export function consumeJump(y: number) {
  if (jumpTarget === null || Math.abs(y - jumpTarget) > 2) return false
  jumpTarget = null
  return true
}
