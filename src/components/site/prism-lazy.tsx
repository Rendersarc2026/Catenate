"use client"

import dynamic from "next/dynamic"
import * as React from "react"

import { NearViewport } from "@/components/site/near-viewport"
import type { PrismProps } from "@/components/site/prism"
import { useWarmChunk } from "@/lib/warm-chunk"

/*
 * The prism sits behind the hero, which is the first thing painted — so its
 * WebGL library is kept out of the initial bundle and warmed on idle instead.
 * The hero reads perfectly well on its dark ground for the moment before the
 * prism arrives, and the reader is still on the landing wordmark by then.
 */
const load = () => import("@/components/site/prism")

const Prism = dynamic(() => load().then((m) => m.Prism), { ssr: false })

export function PrismLazy(props: PrismProps) {
  useWarmChunk(load)

  return (
    <NearViewport className="size-full" whenIdle>
      <Prism {...props} />
    </NearViewport>
  )
}
