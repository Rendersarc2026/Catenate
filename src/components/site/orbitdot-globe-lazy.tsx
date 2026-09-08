"use client"

import dynamic from "next/dynamic"
import * as React from "react"

import { NearViewport } from "@/components/site/near-viewport"
import type { OrbitDotGlobeProps } from "@/components/site/orbitdot-globe"

/*
 * three.js is by a wide margin the largest thing this page could ask for, and
 * the globe it draws is several screens down. Splitting it out keeps it off
 * the critical path; the `NearViewport` gate keeps it off the wire entirely
 * for a reader who never scrolls that far.
 */
const OrbitDotGlobe = dynamic(
  () => import("@/components/site/orbitdot-globe").then((m) => m.OrbitDotGlobe),
  { ssr: false }
)

export function OrbitDotGlobeLazy(props: OrbitDotGlobeProps) {
  return (
    <NearViewport className="size-full">
      <OrbitDotGlobe {...props} />
    </NearViewport>
  )
}
