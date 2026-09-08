"use client"

import dynamic from "next/dynamic"
import * as React from "react"

import { NearViewport } from "@/components/site/near-viewport"
import type { OrbProps } from "@/components/site/orb"

/*
 * The ring is decorative and sits well down the page, so its WebGL library is
 * split out and fetched only as the section approaches. Nothing is server
 * rendered: the shader has no meaningful markup to hydrate.
 */
const Orb = dynamic(() => import("@/components/site/orb").then((m) => m.Orb), {
  ssr: false,
})

export function OrbLazy(props: OrbProps) {
  return (
    <NearViewport className="size-full">
      <Orb {...props} />
    </NearViewport>
  )
}
