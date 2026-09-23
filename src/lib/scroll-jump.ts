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

  if (active) {
    /*
     * Re-measured first, because `scrollTo` clamps its target to the page
     * length Lenis last measured — `force` waives its locks, not this — and
     * that measurement is debounced by a quarter of a second. A jump made in
     * the moment after a route arrives is therefore cut short at the bottom
     * of the page being left, which is how a back onto a long page landed the
     * reader in a section they had never been in and only reached the place
     * they left a few hundred milliseconds later, once the debounce fired.
     * One measurement here costs a layout read that the caller has usually
     * forced already.
     */
    active.resize()
    active.scrollTo(y, { immediate: true, force: true })
    return
  }

  window.scrollTo({ top: y, behavior: "instant" })
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

/**
 * Glides the page to `y`, for a move the reader asked for (the scroll arrows).
 * Unlike `jumpTo` it animates, and it is left for the header to read as
 * ordinary scrolling — the reader did ask to travel.
 */
export function glideTo(y: number) {
  if (active) {
    /* Re-measured for the same reason as `jumpTo`: a stale length clamps it. */
    active.resize()
    active.scrollTo(y, { duration: 1.2 })
    return
  }

  /*
   * No Lenis means reduced motion was asked for. The glide is kept anyway, as
   * the browser's own: an instant move to the far end of a long page reads as
   * the button having done nothing, and the reader asked to travel.
   */
  window.scrollTo({ top: y, behavior: "smooth" })
}
