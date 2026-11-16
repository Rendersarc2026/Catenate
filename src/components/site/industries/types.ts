export type SectorCategory = {
  id: string
  label: string
  slugs: string[]
}

export const SECTOR_CATEGORIES: SectorCategory[] = [
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
    id: "energy-chemicals",
    label: "Energy, Chemicals & Metals",
    slugs: [
      "oil-gas-petrochemical",
      "lubricants-chemical",
      "battery-manufacturing",
      "metals-fabrication",
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing",
    slugs: [
      "tobacco-manufacturing",
      "furniture-woodworking",
      "electronics-assembly",
      "footwear-leather",
    ],
  },
  {
    id: "packaging",
    label: "Packaging & Paper",
    slugs: [
      "paper-packaging",
      "packaging-converting",
    ],
  },
  {
    id: "life-sciences",
    label: "Food, Water & Life Sciences",
    slugs: [
      "food-beverage",
      "bottled-water",
      "healthcare-life-sciences",
    ],
  },
]

export function getCategoryLabelForSlug(slug: string): string {
  for (const cat of SECTOR_CATEGORIES) {
    if (cat.slugs.includes(slug)) {
      return cat.label
    }
  }
  return "Specialized Sector"
}
