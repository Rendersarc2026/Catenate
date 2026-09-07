"use client"

import * as React from "react"

import { Reveal } from "@/components/site/reveal"
import { FinderRail, type RailStep } from "@/components/site/solutions-finder/finder-rail"
import {
  ApplicationGrid,
  ConditionChips,
} from "@/components/site/solutions-finder/finder-options"
import { FinderStep } from "@/components/site/solutions-finder/finder-step"
import {
  NoMatchPanel,
  RecommendationPanel,
} from "@/components/site/solutions-finder/recommendation-panel"
import { applications, type Application, type Condition } from "@/data/catenate"
import {
  conditionsFor,
  findRecommendation,
  isConditionAvailable,
} from "@/lib/solutions-finder"

/** Entrance shared by every step that appears part-way through the journey. */
const REVEAL = "animate-in fade-in slide-in-from-bottom-3 duration-500 ease-expo"

/**
 * The three-step journey: application, then the conditions that application is
 * specified against, then the system. Nothing below the current step is shown
 * until it has an answer, and every earlier answer stays editable in place.
 */
export function FinderExperience() {
  const [application, setApplication] = React.useState<Application | null>(null)
  const [condition, setCondition] = React.useState<Condition | null>(null)

  const availableConditions = application ? conditionsFor(application) : []
  const recommendation =
    application && condition ? findRecommendation(application, condition) : null

  /* Changing the application keeps a condition that still applies to it. */
  const selectApplication = (next: Application) => {
    setApplication(next)
    setCondition((current) =>
      current && isConditionAvailable(next, current) ? current : null
    )
  }

  const reset = () => {
    setApplication(null)
    setCondition(null)
  }

  const railSteps: RailStep[] = [
    {
      id: "finder-step-1",
      index: 1,
      label: "Application",
      value: application,
      placeholder: "Not chosen",
      reachable: true,
    },
    {
      id: "finder-step-2",
      index: 2,
      label: "Conditions",
      value: condition,
      placeholder: application ? "Not chosen" : "Choose an application",
      reachable: Boolean(application),
    },
    {
      id: "finder-step-3",
      index: 3,
      label: "Solution",
      value: recommendation ? recommendation.title : condition ? "No exact match" : null,
      placeholder: "Pending",
      reachable: Boolean(application && condition),
    },
  ]

  return (
    <>
      <FinderRail steps={railSteps} />

      <div className="section bg-off pt-[clamp(38px,4.6vw,64px)]">
        <Reveal>
          <FinderStep
            id="finder-step-1"
            index={1}
            label="Choose an application"
            heading="What are you working on?"
            state={application ? "complete" : "active"}
            action={
              application ? (
                <button
                  type="button"
                  onClick={reset}
                  className="text-[13px] font-medium text-grey underline underline-offset-4 transition-colors duration-250 ease-expo hover:text-blue"
                >
                  Start over
                </button>
              ) : null
            }
          >
            <ApplicationGrid
              options={applications}
              value={application}
              onSelect={selectApplication}
              labelledBy="finder-step-1-heading"
            />
          </FinderStep>
        </Reveal>

        {application && (
          <FinderStep
            key={application}
            id="finder-step-2"
            index={2}
            label="Define the conditions"
            heading="Where and how will it be used?"
            state={condition ? "complete" : "active"}
            className={`mt-[clamp(36px,4.6vw,64px)] border-t border-ink/10 pt-[clamp(36px,4.6vw,64px)] ${REVEAL}`}
          >
            <ConditionChips
              options={availableConditions}
              value={condition}
              onSelect={setCondition}
              labelledBy="finder-step-2-heading"
            />
            <p className="mt-4.5 max-w-[52ch] text-[13.5px] leading-[1.6] text-grey">
              These are the conditions {application.toLowerCase()} is specified
              against.
            </p>
          </FinderStep>
        )}

        {/*
         * The result is announced rather than scrolled to, so a selection
         * never moves the page out from under the person making it.
         */}
        <div aria-live="polite">
          {application && condition && (
            <div key={`${application}|${condition}`} className={REVEAL}>
              {recommendation ? (
                <RecommendationPanel recommendation={recommendation} />
              ) : (
                <NoMatchPanel />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
