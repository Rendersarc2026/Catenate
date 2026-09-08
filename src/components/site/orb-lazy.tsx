"use client"

import dynamic from "next/dynamic"
import * as React from "react"

import { NearViewport } from "@/components/site/near-viewport"
import type { OrbProps } from "@/components/site/orb"
import { useWarmChunk } from "@/lib/warm-chunk"

/*
 * The ring is decorative and sits well down the page, so its WebGL library is
 * split out of the initial bundle and warmed on idle instead — off the
 * critical path, but already parsed by the time the section arrives.
 */
const load = () => import("@/components/site/orb")

const Orb = dynamic(() => load().then((m) => m.Orb), { ssr: false })

export function OrbLazy(props: OrbProps) {
  useWarmChunk(load)

  return (
    <NearViewport className="size-full">
      <Orb {...props} />
    </NearViewport>
  )
}
