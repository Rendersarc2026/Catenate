import Image from "next/image"

/**
 * Hero backdrop.
 *
 * Renders the high-definition orbital Earth visual with seamless dark gradients
 * ensuring clarity for the centered headline, navigation bar, and stats footer.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 size-full overflow-hidden bg-black select-none">
      {/* Orbital view of Earth from space */}
      <Image
        src="/images/hero-banner.jpg"
        alt="Orbital view of Earth from space"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[center_62%] max-sm:object-[center_68%] pointer-events-none"
      />

      {/* Subtle top vignette for nav and header contrast */}
      <div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        aria-hidden="true"
      />

      {/* Bottom fade into solid black behind the stats bar */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 pointer-events-none bg-gradient-to-t from-black via-black/85 to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}
