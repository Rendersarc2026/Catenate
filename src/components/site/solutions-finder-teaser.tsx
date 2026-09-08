import Link from "next/link";

import { Orb } from "@/components/site/orb";
import { Reveal } from "@/components/site/reveal";

/**
 * The finder's invitation, played as one dark full-bleed beat: a ring of
 * light behind the line, and a single way in. The ring takes the pointer —
 * the copy over it does not — so moving across the section drags the
 * distortion through it.
 */

/** The ground the ring is composited against, and the section's own field. */
const FIELD = "#000000";

export function SolutionsFinderTeaser() {
  return (
    <section
      id="solutions-finder-teaser"
      className="relative isolate overflow-hidden"
      style={{ backgroundColor: FIELD }}
    >
      <div
        className="content-pad relative grid place-items-center py-[clamp(72px,9vw,128px)]"
        style={
          {
            "--orb": "min(84vw, 620px)",
            minHeight: "calc(var(--orb) + clamp(200px, 22vw, 300px))",
          } as React.CSSProperties
        }
      >
        {/* The ring. Sits under the copy and keeps the pointer to itself. */}
        <div
          className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ width: "var(--orb)" }}
        >
          <Orb hoverIntensity={0.1} rotateOnHover backgroundColor={FIELD} />
        </div>

        {/* Both are placed against the container's centre — the same centre the
            ring is drawn around — so the line crosses the ring's middle and the
            button clears its lower edge. */}
        <Reveal className="pointer-events-none absolute inset-0 z-10">
          <h2 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(1.65rem,4.6vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-white text-balance lg:whitespace-nowrap">
            Find the right solution for the job.
          </h2>

          <div
            className="absolute inset-x-0 flex justify-center"
            style={{ top: "calc(50% + var(--orb) / 2 + clamp(28px, 4vw, 60px))" }}
          >
            <Link
              href="/solutions-finder"
              className="pointer-events-auto inline-flex items-center rounded-full bg-white/8 px-6 py-2.5 text-[14px] font-medium text-white/85 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] transition-colors duration-250 ease-expo hover:bg-white/14 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Launch Finder
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
