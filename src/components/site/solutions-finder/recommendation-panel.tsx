import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { ArrowButton } from "@/components/site/arrow-button"
import { FinderStep } from "@/components/site/solutions-finder/finder-step"
import type { Recommendation } from "@/lib/solutions-finder"

/** Where the site already sends people who want a specification written. */
const SUPPORT_HREF = "/#contact"

const STEP_ID = "finder-step-3"
const STEP_LABEL = "Your recommended solution"

/** Shared shell: the dark brand block that carries the third step. */
function SolutionBlock({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <FinderStep
      id={STEP_ID}
      index={3}
      label={STEP_LABEL}
      heading={heading}
      tone="dark"
      className="on-blue mt-[clamp(36px,4.6vw,64px)] rounded-block bg-blue px-[clamp(22px,3.2vw,56px)] py-[clamp(30px,3.8vw,56px)] text-white"
    >
      {children}
    </FinderStep>
  )
}

/** The resolved system: what to use, in the order it goes on. */
export function RecommendationPanel({
  recommendation,
}: {
  recommendation: Recommendation
}) {
  return (
    <SolutionBlock heading={recommendation.title}>
      <h3 className="text-[11px] font-medium tracking-[0.16em] text-white/62 uppercase">
        System components
      </h3>

      <ol className="mt-4.5 border-t border-white/15">
        {recommendation.steps.map((step, index) => (
          <li
            key={step.stage}
            className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-x-4 border-b border-white/15 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-6"
          >
            <span className="tnum text-[13px] text-white/55">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0">
              <span className="block text-[10.5px] font-medium tracking-[0.16em] text-white/62 uppercase">
                {step.stage}
              </span>
              <span className="mt-1.5 block text-[clamp(1rem,1.4vw,1.1rem)] leading-[1.4] font-medium">
                {step.product}
              </span>
              <span className="mt-1 block max-w-[52ch] text-[13.5px] leading-[1.6] text-white/68">
                {step.role}
              </span>
            </div>

            {/*
             * There is no per-product page on the site; the principal's range
             * on the brands page is the nearest real destination.
             */}
            <Link
              href="/brands"
              className="col-start-2 mt-3 w-fit rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.12em] whitespace-nowrap text-white/85 uppercase transition-colors duration-250 ease-expo hover:bg-white/22 hover:text-white sm:col-start-3 sm:row-start-1 sm:mt-0 sm:justify-self-end"
            >
              <span className="sr-only">Products from </span>
              {step.principal}
            </Link>
          </li>
        ))}
      </ol>

      <TechnicalDetails
        standard={recommendation.standard}
        note={recommendation.note}
        condition={recommendation.condition}
      />

      <SupportCta
        title="Need a more specific recommendation?"
        body="Talk to our technical team for application-specific advice."
      />
    </SolutionBlock>
  )
}

/** Shown when the selected pair falls outside what the catalogue covers. */
export function NoMatchPanel() {
  return (
    <SolutionBlock heading="No exact match found.">
      <p className="max-w-[52ch] text-[15px] leading-[1.7] text-white/72">
        Our technical team can help you find the right solution for your
        application.
      </p>

      <SupportCta
        title="Tell us about the job"
        body="Send us the substrate, the exposure and the programme, and we will specify against it."
      />
    </SolutionBlock>
  )
}

/**
 * Standards and caveats stay on the page but out of the way — open only when
 * someone is checking the specification rather than reading the answer.
 */
function TechnicalDetails({
  standard,
  note,
  condition,
}: {
  standard: string
  note: string
  condition: string
}) {
  return (
    <details className="group/details mt-7 border-b border-white/15">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[13px] font-medium tracking-[0.04em] text-white/80 transition-colors duration-250 ease-expo hover:text-white">
        Standards and technical information
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-300 ease-expo group-open/details:rotate-180"
        />
      </summary>

      <dl className="pb-5 text-[13.5px] leading-[1.7]">
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 border-t border-white/10 py-3">
          <dt className="w-full shrink-0 text-white/55 sm:w-[9rem]">Specified to</dt>
          <dd className="tnum min-w-0 flex-1">{standard}</dd>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 border-t border-white/10 py-3">
          <dt className="w-full shrink-0 text-white/55 sm:w-[9rem]">{condition}</dt>
          <dd className="min-w-0 max-w-[62ch] flex-1 text-white/78">{note}</dd>
        </div>
      </dl>

      <p className="pb-5">
        <Link
          href="/technologies"
          className="text-[13.5px] text-white/80 underline underline-offset-4 transition-colors duration-250 ease-expo hover:text-white"
        >
          Technical data and approvals
        </Link>
      </p>
    </details>
  )
}

function SupportCta({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-5">
      <div>
        <p className="text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.4] font-medium">
          {title}
        </p>
        <p className="mt-1 max-w-[46ch] text-[14.5px] leading-[1.6] text-white/68">
          {body}
        </p>
      </div>

      <ArrowButton href={SUPPORT_HREF} variant="onBlue">
        Talk to an expert
      </ArrowButton>
    </div>
  )
}
