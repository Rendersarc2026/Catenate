import {
  applicationConditions,
  conditionNotes,
  conditionPhrases,
  systems,
  type Application,
  type Condition,
  type SystemStep,
} from "@/data/catenate"

/**
 * A resolved system build-up for one application worked under one condition.
 * Everything on it comes from `src/data/catenate.ts` — this module only picks
 * and phrases, it holds no product knowledge of its own.
 */
export type Recommendation = {
  application: Application
  condition: Condition
  /** Human-readable, e.g. "Waterproofing for externally exposed areas". */
  title: string
  /** Standard the build-up is specified against, e.g. "EN 13707 / EN 14891". */
  standard: string
  steps: readonly SystemStep[]
  /** The condition's technical caveat, shown as secondary information. */
  note: string
}

/** The conditions worth offering for an application, in data order. */
export function conditionsFor(application: Application): readonly Condition[] {
  return applicationConditions[application] ?? []
}

export function isConditionAvailable(
  application: Application,
  condition: Condition
): boolean {
  return conditionsFor(application).includes(condition)
}

/**
 * Resolves a selection to a system. Returns null when the pair falls outside
 * what the catalogue is specified for, which the finder answers with the
 * no-match state rather than a blank panel.
 */
export function findRecommendation(
  application: Application,
  condition: Condition
): Recommendation | null {
  if (!isConditionAvailable(application, condition)) return null

  const system = systems[application]
  if (!system) return null

  return {
    application,
    condition,
    title: `${application} for ${conditionPhrases[condition]}`,
    standard: system.standard,
    steps: system.steps,
    note: conditionNotes[condition],
  }
}
