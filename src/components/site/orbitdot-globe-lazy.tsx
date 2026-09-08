"use client"

import dynamic from "next/dynamic"
import * as React from "react"

import { NearViewport } from "@/components/site/near-viewport"
import type { OrbitDotGlobeProps } from "@/components/site/orbitdot-globe"
import { useWarmChunk } from "@/lib/warm-chunk"

/*
 * three.js is by a wide margin the largest thing this page could ask for, and
 * the globe it draws is several screens down. Splitting it out keeps it off
 * the critical path, and warming it on idle keeps its parse out of the scroll.
 */
const load = () => import("@/components/site/orbitdot-globe")

const OrbitDotGlobe = dynamic(() => load().then((m) => m.OrbitDotGlobe), {
  ssr: false,
})

export function OrbitDotGlobeLazy(props: OrbitDotGlobeProps) {
  useWarmChunk(load)

  return (
    <NearViewport className="size-full">
      <OrbitDotGlobe {...props} />
    </NearViewport>
  )
}
