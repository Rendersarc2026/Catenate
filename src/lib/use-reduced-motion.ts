"use client"

import * as React from "react"

/*
 * One MediaQueryList per query for the whole page. The hook used to build a
 * fresh list inside `getSnapshot`, which React calls on every render and again
 * on every store check — allocating a live matcher each time.
 */
const lists = new Map<string, MediaQueryList>()

function list(query: string) {
  if (typeof window === "undefined") return null
  let found = lists.get(query)
  if (!found) {
    found = window.matchMedia(query)
    lists.set(query, found)
  }
  return found
}

/** Subscribes to a media query, server-rendering as `false`. */
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mq = list(query)
      if (!mq) return () => {}
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    [query]
  )

  return React.useSyncExternalStore(
    subscribe,
    React.useCallback(() => list(query)?.matches ?? false, [query]),
    () => false
  )
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)"

/** True when the visitor has asked the system to tone motion down. */
export function usePrefersReducedMotion() {
  return useMediaQuery(REDUCED_MOTION)
}

/** The same answer outside React, for imperative code paths. */
export function prefersReducedMotion() {
  return list(REDUCED_MOTION)?.matches ?? false
}
