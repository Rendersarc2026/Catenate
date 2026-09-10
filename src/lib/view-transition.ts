"use client"

import { flushSync } from "react-dom"

import { prefersReducedMotion } from "./use-reduced-motion"

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> }
}

/*
 * Runs a React state update inside a view transition, so the browser can
 * animate between the two rendered states instead of swapping them outright.
 *
 * `flushSync` is what makes it work: `startViewTransition` snapshots the page,
 * runs the callback, then snapshots again — so the DOM has to be up to date by
 * the time the callback returns, and React's default batching would land the
 * update a tick too late.
 *
 * Everything degrades to a plain update: no support, or a visitor who has
 * asked for less motion, just gets the new state immediately.
 */
export function startViewTransition(update: () => void) {
  const doc = document as ViewTransitionDocument

  if (typeof doc.startViewTransition !== "function" || prefersReducedMotion()) {
    update()
    return
  }

  doc.startViewTransition(() => {
    flushSync(update)
  })
}
