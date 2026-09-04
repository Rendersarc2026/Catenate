export type SectorCategory = {
  id: string
  label: string
  slugs: string[]
}

export const SECTOR_CATEGORIES: SectorCategory[] = [
  {
    id: "all",
    label: "All Sectors (14)",
    slugs: [],
  },
  {
    id: "built-env",
    label: "Infrastructure & Built Env.",
    slugs: [
      "building-infrastructure",
      "water-wastewater",
      "hvac-plumbing",
      "retail-fit-out",
    ],
  },
  {
    id: "energy-marine",
    label: "Energy, Marine & Metals",
    slugs: [
      "oil-gas-petrochemical",
      "marine-offshore",
      "metals-fabrication",
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing & Mobility",
    slugs: [
      "automotive-transport",
      "electronics-assembly",
      "packaging-converting",
      "furniture-woodworking",
      "footwear-leather",
    ],
  },
  {
    id: "life-sciences",
    label: "Life Sciences & Cleanrooms",
    slugs: [
      "healthcare-life-sciences",
      "food-beverage",
    ],
  },
]

export function getCategoryLabelForSlug(slug: string): string {
  for (const cat of SECTOR_CATEGORIES) {
    if (cat.id !== "all" && cat.slugs.includes(slug)) {
      return cat.label
    }
  }
  return "Specialized Sector"
}
