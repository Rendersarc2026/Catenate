import { OrbLazy } from "@/components/site/orb-lazy";
import { Reveal } from "@/components/site/reveal";
import { SpecularButton } from "@/components/ui/specular-button";

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
      className="relative isolate overflow-hidden -mt-[clamp(28px,4vw,56px)] pt-[clamp(28px,4vw,56px)]"
      style={{ backgroundColor: FIELD }}
    >
      <div
        className="content-pad relative grid place-items-center py-[clamp(72px,9vw,128px)]"
        style={
          {
            "--orb": "min(84vw, 620px)",
            minHeight: "calc(var(--orb) + clamp(120px, 16vw, 220px))",
          } as React.CSSProperties
        }
      >
        {/* The ring. Sits under the copy and keeps the pointer to itself. */}
        <div
          className="absolute top-1/2 left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2"
          style={{ width: "var(--orb)" }}
        >
          <OrbLazy hoverIntensity={0.1} rotateOnHover backgroundColor={FIELD} />
        </div>

        {/* Heading and button placed directly together at the container's center. */}
        <Reveal className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-center text-[clamp(1.65rem,4.6vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.03em] text-white text-balance lg:whitespace-nowrap">
              Find the right solution for the job.
            </h2>

            <div className="mt-8 sm:mt-10 flex justify-center">
              <SpecularButton
                href="/solutions-finder"
                size="lg"
                radius={18}
                tint="#ffffff"
                tintOpacity={0}
                blur={0}
                textColor="#f5f5f5"
                lineColor="#ffffff"
                baseColor="#525252"
                intensity={1}
                shineSize={10}
                shineFade={40}
                thickness={1}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
                className="pointer-events-auto"
              >
                Launch Finder
              </SpecularButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
