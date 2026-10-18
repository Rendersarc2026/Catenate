/**
 * Content model for the Catenate site.
 *
 * Every string a visitor reads lives here so the marketing copy can be edited
 * without touching a component. Imagery is centralised in `images` — those are
 * placeholder sources and are the first thing to swap for real photography.
 */

/* ------------------------------------------------------------------ *
 * Imagery
 * ------------------------------------------------------------------ */

const placeholder = (seed: string, w: number, h: number, grayscale = false) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}${grayscale ? "?grayscale" : ""}`;

export const images = {
  /*
   * The hero's ground: Earth from orbit, the limb curving across the bottom of
   * a black sky. A global distributor's opening frame is the globe itself — the
   * picture carries the reach that the stat row underneath only counts.
   *
   * Local rather than a stock URL, and already a WebP at the size the hero
   * draws it, so it is served as-is; `hero.tsx` reads the arc's geometry off
   * this exact frame, so a replacement wants the same framing — limb centred,
   * crown a little under halfway up — or the constants there have to move with
   * it.
   */
  heroEarth: "/images/hero-earth.webp",
  /** Sector photography, keyed by the slug on each `Industry`. */
  industry: (slug: string) => `/images/industries/${slug}.jpg`,
  project: (index: number) => placeholder(`catenateproj${index}`, 600, 800),
  contactInquiry: placeholder("catenatesupport", 700, 525),
  contactChannel: placeholder("catenatechannel", 700, 525),
  contactPartner: placeholder("catenatepartner", 700, 525),
  contactBg: "/images/contact-bg.jpeg",
  /** Ground for the technologies page hero — chemistry, not cargo. */
  technologiesHero: "/images/industries/laboratory-microscope.jpg",
  /** Panel and inset detail for a chemistry, keyed by `Technology.slug`. */
  technology: (slug: string) => technologyShots[slug] ?? technologyShots.membranes,
} as const;

/*
 * Chemistry photography. Stand-ins borrowed from the sector set until the
 * product shots land — `panel` is the large picture, `detail` the inset that
 * rides over its corner. Swapping them is a one-line change here.
 */
const technologyShots: Record<string, { panel: string; detail: string }> = {
  membranes: {
    panel: "/images/industries/building-infrastructure.jpg",
    detail: "/images/industries/water-wastewater.jpg",
  },
  sealants: {
    panel: "/images/industries/retail-fit-out.jpg",
    detail: "/images/industries/hvac-plumbing.jpg",
  },
  "instant-adhesives": {
    panel: "/images/industries/electronics-assembly.jpg",
    detail: "/images/industries/metals-fabrication.jpg",
  },
  "hot-melt": {
    panel: "/images/industries/packaging-converting.jpg",
    detail: "/images/industries/furniture-woodworking.jpg",
  },
  "flooring-repair": {
    panel: "/images/industries/retail-fit-out.jpg",
    detail: "/images/industries/building-infrastructure.jpg",
  },
  "facade-silicones": {
    panel: "/images/industries/building-infrastructure.jpg",
    detail: "/images/industries/retail-fit-out.jpg",
  },
  "pipe-cements": {
    panel: "/images/industries/hvac-plumbing.jpg",
    detail: "/images/industries/water-wastewater.jpg",
  },
  "metal-treatment": {
    panel: "/images/industries/laboratory-microscope.jpg",
    detail: "/images/industries/metals-fabrication.jpg",
  },
  "oil-gas": {
    panel: "/images/industries/oil-gas-petrochemical.jpg",
    detail: "/images/industries/marine-offshore.jpg",
  },
  "bus-body": {
    panel: "/images/industries/automotive-transport.jpg",
    detail: "/images/industries/metals-fabrication.jpg",
  },
  solar: {
    panel: "/images/industries/electronics-assembly.jpg",
    detail: "/images/industries/laboratory-microscope.jpg",
  },
  mattress: {
    panel: "/images/industries/furniture-woodworking.jpg",
    detail: "/images/industries/packaging-converting.jpg",
  },
  "safety-cutting": {
    panel: "/images/industries/metals-fabrication.jpg",
    detail: "/images/industries/building-infrastructure.jpg",
  },
};

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

export type MegaGroup = { title: string; items: string[] };

export type MegaSection = {
  key: string;
  /** Label shown in the top-level nav bar. */
  navLabel: string;
  /** Heading shown in the mega menu's left column. */
  label: string;
  href: string;
  items?: string[];
  groups?: MegaGroup[];
};

export const megaMenu: MegaSection[] = [
  {
    key: "home",
    navLabel: "Home",
    label: "Home",
    href: "/",
  },
  {
    key: "tech",
    navLabel: "Technologies",
    label: "Technologies and Approvals",
    href: "/technologies",
    items: [
      "Waterproofing systems",
      "Concrete repair and protection",
      "Sealants and glazing",
      "Tiling and flooring systems",
      "Industrial and structural adhesives",
      "Metal surface treatment",
      "Certifications and accreditations",
      "Technical data sheets and SDS",
    ],
  },
  {
    key: "projects",
    navLabel: "Projects",
    label: "Projects",
    href: "/projects",
    items: [
      "Marine and offshore",
      "Food and beverage",
      "Building and infrastructure",
      "HVAC and plumbing",
      "Healthcare",
      "Metals and fabrication",
    ],
  },
  {
    key: "finder",
    navLabel: "Solutions Finder",
    label: "Solutions Finder",
    href: "/solutions-finder",
  },
  {
    key: "about",
    navLabel: "About",
    label: "About Catenate",
    href: "/about",
    items: [
      "Company",
      "Principals and partnerships",
      "Network and branches",
      "Quality and HSE",
      "Careers",
      "Request a specification",
      "Branch directory",
      "Become a partner",
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Global distribution · Bonding · Sealing · Construction chemicals",
  headlineLines: [
    "Connecting the world’s",
    "leading brands to your doorstep.",
  ],
  body:
    "A global market intelligence & distribution platform built around Trusted Brands, Efficient Teams, Technical know-how & Dependable Supply Chain.",
  stats: [
    { value: "38", label: "Markets served" },
    { value: "4", label: "Regions" },
    { value: "13", label: "Brands represented" },
    { value: "14", label: "Industries supplied" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * About Hero
 * ------------------------------------------------------------------ */

export const aboutHero = {
  title: "About us",
  subtitle: "Channel Partner Network to serve your needs",
  image: "/images/about-hero.jpg",
  stats: [
    { value: "100K+", label: "Products distributed" },
    { value: "100K+", label: "Square metres specified" },
    { value: "100K+", label: "Channel network reach" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Global presence
 * ------------------------------------------------------------------ */

/**
 * Dotted world map. Each row is a list of inclusive `[startColumn, endColumn]`
 * spans that carry land, rendered as a grid of dots.
 */
export const landRows: [number, number][][] = [
  [[10, 20], [24, 28], [44, 62]],
  [[8, 20], [23, 28], [42, 62]],
  [[3, 9], [9, 21], [23, 28], [33, 38], [38, 62]],
  [[2, 9], [9, 22], [24, 27], [29, 30], [32, 38], [38, 63]],
  [[2, 9], [9, 22], [32, 38], [38, 63]],
  [[6, 22], [30, 31], [32, 40], [40, 62]],
  [[6, 21], [30, 40], [40, 60]],
  [[7, 20], [31, 40], [40, 58]],
  [[7, 20], [30, 38], [38, 57]],
  [[8, 20], [31, 38], [38, 44], [44, 57]],
  [[9, 19], [30, 39], [39, 45], [45, 49], [49, 56]],
  [[10, 17], [30, 40], [39, 45], [45, 49], [49, 55]],
  [[11, 17], [30, 40], [40, 44], [45, 48], [49, 54]],
  [[13, 18], [30, 41], [45, 48], [50, 54]],
  [[14, 19], [31, 42], [50, 55]],
  [[18, 22], [32, 43], [50, 56]],
  [[18, 24], [33, 42], [51, 57]],
  [[18, 25], [33, 41], [51, 57]],
  [[18, 25], [34, 41], [52, 58]],
  [[18, 25], [34, 40], [55, 60]],
  [[19, 25], [34, 40], [54, 61]],
  [[19, 24], [35, 39], [53, 61]],
  [[19, 24], [35, 38], [53, 60]],
  [[20, 23], [36, 38], [54, 59]],
  [[20, 22], [61, 62]],
  [[20, 22], [61, 62]],
  [[20, 22]],
  [[20, 21]],
];

export type Region = {
  name: string;
  points: [number, number][];
  coordinates: string;
  markets?: string;
};

export const regions: Region[] = [
  {
    name: "Oman",
    points: [[41, 12], [42, 13]],
    coordinates: "23.5880, 58.3829",
    markets: "Muscat & regional distribution",
  },
  {
    name: "UAE",
    points: [[40, 11], [38, 10]],
    coordinates: "25.2048, 55.2708",
    markets: "Dubai & Abu Dhabi hubs",
  },
  {
    name: "Qatar",
    points: [[39, 9], [36, 14]],
    coordinates: "25.2854, 51.5310",
    markets: "Doha operations",
  },
  {
    name: "UK",
    points: [[31, 6], [33, 7]],
    coordinates: "51.5074, -0.1278",
    markets: "London & UK specification",
  },
];

export const presence = {
  eyebrow: "Global presence",
  heading: "Specified in 38 markets, across 4 regions.",
  stats: [
    { to: 38, suffix: "", label: "Markets served" },
    { to: 14, suffix: "", label: "Industries supplied" },
    { to: 500, suffix: "+", label: "Product lines stocked" },
    { to: 1500, suffix: "+", label: "Satisfied customers" },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * Industries
 * ------------------------------------------------------------------ */

export type Industry = {
  name: string;
  /** File stem under `/images/industries`. */
  slug: string;
  challenge: string;
  systems: string[];
  reference: string;
};

export const industries: Industry[] = [
  {
    name: "Building and infrastructure",
    slug: "building-infrastructure",
    challenge:
      "Podium decks, basements, wet areas and facades under long warranty periods.",
    systems: ["Waterproofing systems", "Tiling and flooring", "Concrete repair", "Sealants"],
    reference: "Mixed-use podium, 42,000 m² deck",
  },
  {
    name: "Marine and offshore",
    slug: "marine-offshore",
    challenge:
      "Constant salt exposure, movement and coating windows measured in hours.",
    systems: ["Metal pretreatment", "Structural adhesives", "PU sealants"],
    reference: "Port container terminal, phase two",
  },
  {
    name: "Oil, gas and petrochemical",
    slug: "oil-gas-petrochemical",
    challenge: "Chemical attack, thermal cycling and permit-controlled application.",
    systems: ["Protective coatings", "Structural repair mortars", "Thread lockers"],
    reference: "Tank farm bund lining refurbishment",
  },
  {
    name: "Water and wastewater",
    slug: "water-wastewater",
    challenge:
      "Potable contact approval and immersion performance are non-negotiable.",
    systems: ["Liquid membranes", "Pipe joining adhesives", "Repair mortars"],
    reference: "Reservoir roof and joint replacement",
  },
  {
    name: "Food and beverage",
    slug: "food-beverage",
    challenge:
      "Washdown temperatures, hygiene classification and food-contact compliance.",
    systems: ["Resin flooring", "Hygienic sealants", "Water-based adhesives"],
    reference: "Dairy processing hall, 8,600 m²",
  },
  {
    name: "Packaging and converting",
    slug: "packaging-converting",
    challenge: "Line speed decides the adhesive before anything else does.",
    systems: ["Hot melt adhesives", "Water-based adhesives"],
    reference: "Carton line changeover, three plants",
  },
  {
    name: "Automotive and transport",
    slug: "automotive-transport",
    challenge:
      "Bonded assemblies replacing mechanical fixing, with pretreatment to match.",
    systems: ["Structural adhesives", "Metal pretreatment", "Threadlocking"],
    reference: "Bus body assembly programme",
  },
  {
    name: "Metals and fabrication",
    slug: "metals-fabrication",
    challenge:
      "Cleaning, forming and coating handled as one sequence, not three purchases.",
    systems: ["Bonderite pretreatment", "Anaerobic adhesives", "Lubricants"],
    reference: "Galvanising line pretreatment upgrade",
  },
  {
    name: "Furniture and woodworking",
    slug: "furniture-woodworking",
    challenge:
      "Edge, panel and assembly bonding with finish quality visible on day one.",
    systems: ["Hot melt adhesives", "Water-based adhesives", "Construction adhesives"],
    reference: "Contract furniture facility",
  },
  {
    name: "Electronics and assembly",
    slug: "electronics-assembly",
    challenge: "Small bond lines, fast fixture times and controlled outgassing.",
    systems: ["Cyanoacrylates", "Threadlockers", "Specialty adhesives"],
    reference: "Control panel assembly line",
  },
  {
    name: "Footwear and leather",
    slug: "footwear-leather",
    challenge: "Flexibility and peel strength after thousands of cycles.",
    systems: ["Water-based adhesives", "Contact adhesives"],
    reference: "Footwear plant bonding trial",
  },
  {
    name: "HVAC and plumbing",
    slug: "hvac-plumbing",
    challenge: "Pipe joining, pressure testing windows and potable water approval.",
    systems: ["Tangit solvent cement", "EZ-Weld cements", "Thread sealants"],
    reference: "District cooling network extension",
  },
  {
    name: "Healthcare and life sciences",
    slug: "healthcare-life-sciences",
    challenge: "Low emission, cleanable surfaces and documented compliance.",
    systems: ["Resin flooring", "Low-VOC sealants", "Hygienic systems"],
    reference: "Hospital theatre block fit-out",
  },
  {
    name: "Retail and fit-out",
    slug: "retail-fit-out",
    challenge: "Short programmes, fast cure and finishes that survive footfall.",
    systems: ["Tile adhesives", "Levelling compounds", "Construction adhesives"],
    reference: "Mall refurbishment, 60 units",
  },
];

/* ------------------------------------------------------------------ *
 * Brands
 * ------------------------------------------------------------------ */

export type Brand = {
  /** URL segment for the principal's own page under /brands. */
  slug: string;
  name: string;
  description: string;
  familyCount: string;
  /** Tailwind text colour for the partner strip wordmark. */
  wordmarkClass: string;
  /**
   * Principal wordmark in `public/images/logos`. Optional: the brand wall
   * falls back to the name set in type when no file is supplied, so a logo
   * appears as soon as the asset is dropped in.
   */
  logo?: string;
  /**
   * White knockout of the mark in `public/images/logos/white`, for the dark
   * distributor row where the supplied colour marks would not read.
   */
  logoWhite?: string;
  /** Optical correction against the shared logo box. Defaults to 1. */
  logoScale?: number;
  groups: MegaGroup[];
  /**
   * Markets the principal's ranges are qualified for, listed under the panel.
   * Only set where the principal publishes them.
   */
  industries?: string[];
};

export const brands: Brand[] = [
  {
    slug: "henkel",
    name: "Henkel",
    description:
      "Umbrella principal across construction, industrial and consumer bonding",
    familyCount: "14 families",
    wordmarkClass: "text-[#e1000f]",
    logo: "/images/logos/henkel.svg",
    logoWhite: "/images/logos/white/henkel.svg",
    logoScale: 1.15,
    groups: [
      {
        title: "Polybit waterproofing",
        items: [
          "Acrylic coatings",
          "Bitumen membranes, torch-applied and self-adhesive",
          "Bitumen primers and tapes",
          "Bitumen thin coatings",
          "Cement slurry waterproofing coatings",
          "Curing compounds",
          "Epoxy coatings and special liquids",
          "Chemical injection liquids and hoses",
          "Protection boards and filler boards",
          "PU coatings",
          "Fully bonded HDPE system (FBS)",
          "Combo waterproofing system",
        ],
      },
      {
        title: "Polybit sealants",
        items: [
          "Bitumen sealants",
          "Polysulfide sealants",
          "Polyurethane sealants",
          "Sealant primers and backing rods",
          "Bitumen fibre and polyethylene joint fillers",
        ],
      },
      {
        title: "Polybit concrete repair",
        items: [
          "Structural repair mortars",
          "Protective coatings",
          "Cementitious repair mortars and fairing coats",
          "Non-shrink grout and micro concrete",
          "Epoxy bedding grout and mortar",
          "Pile head epoxy bedding grout",
        ],
      },
      {
        title: "Polybit flooring",
        items: [
          "Industrial wear and top coatings with primers",
          "Self-levelling compounds and screeds",
          "Floor hardeners",
          "Epoxy crack repair mortars",
        ],
      },
      {
        title: "Ceresit tiling",
        items: [
          "Standard cementitious adhesives",
          "Flexible polymer-modified adhesives",
          "Cement-based tile grouts",
          "Epoxy tile adhesives and grouts",
        ],
      },
      {
        title: "Aquence water-based",
        items: ["Water-based adhesive solutions"],
      },
      {
        title: "Technomelt hot melt",
        items: [
          "PUR and PA reactive ranges",
          "SUPRA and COOL non-reactive ranges",
        ],
      },
      {
        title: "Bonderite surface treatment",
        items: ["Metal forming", "Machining", "Cleaning", "Coating"],
      },
      {
        title: "Loctite specialties",
        items: [
          "Acrylates",
          "Thermosets",
          "Silicones and silane-modified polymers",
          "Thermal management",
          "Surface treatments and cleaners",
          "Lubricants and dispersions",
          "Polyurethanes",
          "Hot melts",
          "Water-based adhesives",
          "Rubber and plastisols",
          "Engineered infrastructure systems",
          "Inorganic construction adhesives",
        ],
      },
      {
        title: "Loctite industrial range",
        items: [
          "Industrial adhesives and sealants",
          "Dispensing equipment",
          "Thermal management materials",
          "Industrial coatings",
          "Compounds for electronics",
          "Industrial lubricants",
          "Surface treatments",
          "Industrial cleaners",
          "Industrial repair materials",
          "Composite assembly materials",
        ],
      },
      {
        title: "Tobacoll tobacco adhesives",
        items: [
          "Cigarette manufacturing adhesives",
          "Specialty tobacco adhesives",
          "Filter assembly adhesives",
          "Side-seam adhesives",
          "Packaging adhesives",
          "Labelling adhesives",
          "EVA water-based adhesives",
          "Technomelt hot melt adhesives",
        ],
      },
      {
        title: "Pattex trade and DIY",
        items: [
          "Super glues and instant repair",
          "No More Nails and PL construction adhesives",
          "Silicone, acrylic and polymer sealants",
          "Epoxy metal repair",
          "Contact and wood adhesives",
          "Mounting tapes",
          "PU foams",
        ],
      },
      {
        title: "Tangit pipe cements",
        items: ["PVC-U piping adhesives"],
      },
      {
        title: "Metylan wallcoverings",
        items: ["Normal wallpaper adhesives", "Special wallpaper adhesives"],
      },
    ],
    industries: [
      "Aerospace",
      "Automotive",
      "Building and construction components",
      "Consumer electronics",
      "Data and telecommunications",
      "Food and beverage manufacturing",
      "Furniture and interiors",
      "Industrial maintenance and repair",
      "Industrial manufacturing",
      "Medical",
      "Metals",
      "Packaging, printing and converting",
      "Personal care and hygiene",
      "Power",
      "Semiconductor",
      "Sports and fashion",
      "Tobacco and cigarette manufacturing",
      "Transportation",
      "Water bottling",
    ],
  },
  {
    slug: "weld-on",
    name: "Weld-On",
    description: "Solvent cement systems for pressure pipework",
    familyCount: "2 families",
    wordmarkClass: "text-[#0b5fa5]",
    logo: "/images/logos/weld-on.png",
    logoWhite: "/images/logos/white/weld-on.png",
    logoScale: 0.88,
    groups: [
      {
        title: "EZ-Weld solvent cements",
        items: [
          "218 PVC cement",
          "UPVC cements",
          "CPVC cements",
          "Primers and cleaners",
        ],
      },
      {
        title: "EZ-Weld lubricants",
        items: ["Pipe joint lubricant"],
      },
    ],
  },
  {
    slug: "wurth",
    name: "Würth",
    description: "Fixings, tools and building chemicals for the working site",
    familyCount: "6 families",
    wordmarkClass: "text-[#cc0000]",
    logo: "/images/logos/wurth.svg",
    logoWhite: "/images/logos/white/wurth.svg",
    logoScale: 1,
    groups: [
      {
        title: "Fixing and fastening",
        items: ["Anchors", "Direct fastening", "Fasteners", "Metal fittings"],
      },
      {
        title: "Tools",
        items: [
          "Hand tools",
          "Power tools",
          "Machining",
          "Measuring",
          "Brazing, soldering and welding",
        ],
      },
      {
        title: "Technical chemicals",
        items: [
          "Adhesives and sealants",
          "Adhesive tapes",
          "Building chemicals",
          "Lubricants and rust removers",
          "Cleaning agents and care products",
          "Surface protection and coatings",
        ],
      },
      {
        title: "Building and site supplies",
        items: [
          "Building supplies",
          "Plumbing and HVAC",
          "Electrical installation",
          "Fire protection",
          "Traffic and construction site safety",
          "Agriculture and gardening",
        ],
      },
      {
        title: "Automotive and workshop",
        items: [
          "Automotive parts",
          "Vehicle interior equipment",
          "Work equipment",
          "ORSY storage system",
          "Hoses, couplings and hose clamps",
          "Hydraulic, pneumatic and drive components",
          "Technical rubber and engineering plastics",
        ],
      },
      {
        title: "Safety and workwear",
        items: [
          "Personal protective equipment",
          "Occupational safety",
          "Footwear",
          "Workwear",
          "Skin protection",
          "Emergency equipment",
        ],
      },
    ],
  },
  {
    slug: "ge-sealants",
    name: "GE Sealants",
    description: "Silicone and polyurethane sealing for envelope and interior",
    familyCount: "1 family",
    wordmarkClass: "text-[#3874c8]",
    logo: "/images/logos/ge-sealants.png",
    logoWhite: "/images/logos/white/ge-sealants.png",
    logoScale: 1.3,
    groups: [
      {
        title: "Range",
        items: [
          "General purpose silicone",
          "Weather and window sealants",
          "PU sealants and caulks",
          "Kitchen and bath sealants",
        ],
      },
    ],
  },
  {
    slug: "sika",
    name: "Sika",
    description:
      "Concrete, waterproofing and building-finish systems for refurbishment and new build",
    familyCount: "8 families",
    wordmarkClass: "text-[#d50032]",
    logo: "/images/logos/sika.svg",
    logoWhite: "/images/logos/white/sika.svg",
    logoScale: 1.25,
    groups: [
      {
        title: "Refurbishment",
        items: [
          "Grouting",
          "Anchoring",
          "Structural strengthening",
          "Concrete repair",
          "Concrete protection",
        ],
      },
      {
        title: "Concrete",
        items: [
          "Concrete admixtures",
          "Additives for dry mortar and gypsum",
          "Cement additives",
        ],
      },
      {
        title: "Waterproofing",
        items: [
          "Liquid-applied waterproofing",
          "Injection",
          "Joint waterproofing",
          "Sheet membrane",
          "Waterproofing mortar",
          "Bituminous sheet membrane",
        ],
      },
      {
        title: "Roofing",
        items: [
          "Single-ply roof membrane",
          "Liquid-applied membrane",
          "Bituminous membrane",
          "Roof repair",
        ],
      },
      {
        title: "Flooring and coating",
        items: [
          "Industrial coating",
          "Floor joints",
          "Car park and traffic coating",
          "Decorative floor coating",
          "Concrete flooring",
        ],
      },
      {
        title: "Sealing and bonding",
        items: [
          "Construction adhesives",
          "Expansion foam",
          "Floor joint sealant",
          "Building envelope solutions",
          "Firestop systems",
        ],
      },
      {
        title: "Wall and facade systems",
        items: [
          "Hygienic wall coating",
          "Interior wall coating",
          "Facade mortars and protection",
        ],
      },
      {
        title: "Building finishing",
        items: ["Tiling systems", "External wall insulation systems"],
      },
    ],
  },
];

/** Look a principal up by its URL segment. */
export const brandBySlug = (slug: string): Brand | undefined =>
  brands.find((brand) => brand.slug === slug);

/**
 * Look a principal up by the name a system step carries. A step shared between
 * two principals ("Henkel / Weld-On") matches neither, and the caller falls
 * back to the row of marks on the home page.
 */
export const brandByName = (name: string): Brand | undefined =>
  brands.find((brand) => brand.name === name);

/* ------------------------------------------------------------------ *
 * Technologies
 * ------------------------------------------------------------------ */

export type Technology = {
  /** Anchor on the technologies page, and the key its photography is under. */
  slug: string;
  name: string;
  /** Short form for chips and captions, where the full name will not fit. */
  short: string;
  /** The trade the chemistry belongs to. */
  family: string;
  /** The principal ranges it is supplied from, e.g. "Loctite". */
  range: string;
  description: string;
  /** Where it goes to work. */
  uses: string[];
  spec: [label: string, value: string][];
};

export const technologies: Technology[] = [
  {
    slug: "membranes",
    name: "Bituminous and liquid-applied membranes",
    short: "Membranes",
    family: "Waterproofing",
    range: "Polybit",
    description:
      "Waterproofing that has to survive burial, ponding and movement for the design life of the structure. Selection turns on whether the deck is trafficked, whether the membrane is bonded or loose-laid, and how much detailing sits around penetrations.",
    uses: [
      "Podium decks",
      "Basement tanking",
      "Roof build-ups",
      "Wet areas",
      "Buried structures",
    ],
    spec: [
      ["Service temperature", "−20 to +90 °C"],
      ["Cure mechanism", "Heat fusion or moisture cure"],
      ["Substrate", "Concrete, screed, metal deck"],
      ["Application", "Torch, roller, spray"],
    ],
  },
  {
    slug: "sealants",
    name: "Polyurethane and silicone sealants",
    short: "Sealants",
    family: "Sealing and glazing",
    range: "GE Sealants and Polybit",
    description:
      "Movement joints, glazing perimeters and sanitary junctions. The governing figure is movement accommodation factor, followed by whether the joint will be painted and whether it sees standing water.",
    uses: [
      "Movement joints",
      "Curtain walling",
      "Facade perimeters",
      "Sanitary junctions",
      "Floor joints",
    ],
    spec: [
      ["Service temperature", "−40 to +120 °C"],
      ["Cure mechanism", "Moisture cure"],
      ["Substrate", "Concrete, glass, aluminium, PVC"],
      ["Application", "Cartridge and sausage gun"],
    ],
  },
  {
    slug: "instant-adhesives",
    name: "Cyanoacrylate and anaerobic adhesives",
    short: "Instant and anaerobic",
    family: "Industrial assembly",
    range: "Loctite",
    description:
      "Fast fixture on close-fitting parts, and controlled locking on threaded assemblies. Gap fill and material pairing decide the grade far more than headline strength figures do.",
    uses: [
      "Threadlocking",
      "Retaining bearings",
      "Pipe sealing",
      "Elastomer fixture",
      "Form-in-place gasketing",
    ],
    spec: [
      ["Service temperature", "−55 to +150 °C"],
      ["Cure mechanism", "Anaerobic or surface moisture"],
      ["Substrate", "Metals, elastomers, plastics"],
      ["Application", "Drop, bead, wicking"],
    ],
  },
  {
    slug: "hot-melt",
    name: "Hot melt and water-based adhesives",
    short: "Hot melt",
    family: "Packaging and converting",
    range: "Technomelt and Aquence",
    description:
      "Production bonding where the line speed sets the specification. Open time, set time and heat resistance are balanced against substrate porosity and the temperature the finished pack will see.",
    uses: [
      "Case sealing",
      "Carton forming",
      "Lamination",
      "Edge banding",
      "Labelling",
    ],
    spec: [
      ["Service temperature", "−10 to +80 °C"],
      ["Cure mechanism", "Cooling or water evaporation"],
      ["Substrate", "Board, paper, film, wood"],
      ["Application", "Slot, wheel, spray, roller"],
    ],
  },
  {
    slug: "flooring-repair",
    name: "Epoxy flooring and concrete repair",
    short: "Flooring and repair",
    family: "Construction chemicals",
    range: "Master Builders and Polybit",
    description:
      "Seamless resin floors for plants, warehouses and car parks, and the mortars that put damaged concrete back to profile underneath them. Traffic, chemical exposure and the slab's own moisture decide the system before colour or finish does.",
    uses: [
      "Industrial floors",
      "Warehouses",
      "Car park decks",
      "Food plant floors",
      "Structural repair",
      "Grouting",
    ],
    spec: [
      ["Service temperature", "−20 to +70 °C"],
      ["Cure mechanism", "Two-part reactive or hydraulic"],
      ["Substrate", "Concrete and cementitious screed"],
      ["Application", "Trowel, roller, squeegee, pour"],
    ],
  },
  {
    slug: "facade-silicones",
    name: "Neutral-cure silicones for glass facades",
    short: "Facade silicones",
    family: "Facade and glazing",
    range: "GE Momentive",
    description:
      "Structural glazing and weather sealing for curtain walls and glass towers. Neutral cure keeps coated glass, mirror backing and aluminium frames free of corrosion, and the bead has to hold through decades of UV, heat and wind load.",
    uses: [
      "Structural glazing",
      "Curtain walls",
      "Weather seals",
      "Insulating glass units",
      "Cladding joints",
    ],
    spec: [
      ["Service temperature", "−50 to +150 °C"],
      ["Cure mechanism", "Neutral moisture cure"],
      ["Substrate", "Glass, anodised and coated aluminium"],
      ["Application", "Cartridge, sausage, bulk pump"],
    ],
  },
  {
    slug: "pipe-cements",
    name: "UPVC and CPVC solvent cements and sealants",
    short: "Pipe cements",
    family: "Plumbing and piping",
    range: "EZ-Weld",
    description:
      "Solvent welding for pressure and drainage pipework, from domestic plumbing to irrigation and industrial lines. Pipe material, diameter and working pressure set the cement, and cure time before pressure testing sets the programme.",
    uses: [
      "Potable water lines",
      "Hot and cold plumbing",
      "Drainage and soil",
      "Irrigation",
      "Pool and process pipework",
    ],
    spec: [
      ["Service temperature", "Up to +93 °C (CPVC)"],
      ["Cure mechanism", "Solvent weld"],
      ["Substrate", "UPVC, CPVC, ABS"],
      ["Application", "Dauber, brush, primer then cement"],
    ],
  },
  {
    slug: "metal-treatment",
    name: "Metal treatment chemicals",
    short: "Metal treatment",
    family: "Surface treatment",
    range: "Bonderite",
    description:
      "Cleaners, conversion coatings, forming lubricants and machining fluids for the metal before it is painted, bonded or shipped. Each stage runs to a process window — concentration, temperature and dwell — that decides how long the finished coating lasts.",
    uses: [
      "Pretreatment before painting",
      "Conversion coating",
      "Industrial cleaning",
      "Metal forming",
      "Machining fluids",
    ],
    spec: [
      ["Process temperature", "Ambient to +60 °C"],
      ["Mechanism", "Chemical conversion"],
      ["Substrate", "Steel, galvanised, aluminium"],
      ["Application", "Spray, immersion, wipe"],
    ],
  },
  {
    slug: "oil-gas",
    name: "Maintenance and repair for oil and gas",
    short: "Oil and gas",
    family: "Oil and gas",
    range: "Loctite",
    description:
      "Threadlockers, gasketing, pipe repair composites and wear coatings that keep pumps, valves and pipelines running between shutdowns. Pressure, media and temperature rule out grades long before price does.",
    uses: [
      "Pipe and tank repair",
      "Flange sealing",
      "Pump and valve rebuilds",
      "Wear and corrosion coatings",
      "Threadlocking",
    ],
    spec: [
      ["Service temperature", "−55 to +200 °C"],
      ["Cure mechanism", "Anaerobic or two-part epoxy"],
      ["Substrate", "Carbon and stainless steel, alloys"],
      ["Application", "Bead, wrap, brush, trowel"],
    ],
  },
  {
    slug: "bus-body",
    name: "Bus body and automotive bonding",
    short: "Bus and automotive",
    family: "Automotive and transport",
    range: "Loctite",
    description:
      "Structural adhesives and sealants that replace rivets and welds on bus bodies, trailers and vehicle panels. Bonding spreads the load, stops corrosion at the joint and cuts weight; the grade turns on panel material and how much the body flexes.",
    uses: [
      "Panel bonding",
      "Windscreen and glazing",
      "Seam sealing",
      "Floor and roof bonding",
      "Threadlocking",
    ],
    spec: [
      ["Service temperature", "−40 to +90 °C"],
      ["Cure mechanism", "Moisture or two-part"],
      ["Substrate", "Steel, aluminium, GRP, glass"],
      ["Application", "Cartridge, dispensing gun, robot"],
    ],
  },
  {
    slug: "solar",
    name: "PV and conductive adhesives for solar panels",
    short: "Solar",
    family: "Solar energy",
    range: "Henkel",
    description:
      "Electrically conductive adhesives for cell interconnection, and sealants and potting compounds for frames and junction boxes. A module is expected to last twenty-five years outdoors, so resistance to heat cycling and damp heat leads the specification.",
    uses: [
      "Cell interconnection",
      "Frame sealing",
      "Junction box potting",
      "Back-rail bonding",
      "Module assembly",
    ],
    spec: [
      ["Service temperature", "−40 to +85 °C"],
      ["Cure mechanism", "Heat or moisture cure"],
      ["Substrate", "Silicon cells, glass, aluminium"],
      ["Application", "Printing, dispensing, bead"],
    ],
  },
  {
    slug: "mattress",
    name: "Sprayable adhesives for mattresses",
    short: "Mattress",
    family: "Bedding and upholstery",
    range: "Henkel",
    description:
      "Spray adhesives for foam lamination, pocket springs and quilted layers. The bond has to stay soft so the mattress does not feel it, set fast enough for the line, and keep emissions low for a product people sleep on.",
    uses: [
      "Foam to foam",
      "Pocket spring bonding",
      "Fabric lamination",
      "Border panels",
      "Upholstery",
    ],
    spec: [
      ["Service temperature", "−10 to +70 °C"],
      ["Cure mechanism", "Cooling or water evaporation"],
      ["Substrate", "PU foam, latex, fabric, spring units"],
      ["Application", "Spray gun, automated spray line"],
    ],
  },
  {
    slug: "safety-cutting",
    name: "Safety gear and metal cutting discs",
    short: "Safety and cutting",
    family: "Site safety and metalworking",
    range: "Würth",
    description:
      "Personal protective equipment for the site and the workshop, and cutting and grinding discs that stay true at speed. Each one is rated to its standard, so it is chosen by the hazard and the material, not by the catalogue page.",
    uses: [
      "Gloves and eye protection",
      "Respiratory and hearing",
      "Safety footwear and workwear",
      "Cutting discs",
      "Grinding and flap discs",
    ],
    spec: [
      ["Standards", "EN 388, EN 166, EN 12413"],
      ["Disc diameters", "115 to 230 mm"],
      ["Materials cut", "Steel, stainless, aluminium"],
      ["Supply", "Site, workshop and plant"],
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Solutions finder
 * ------------------------------------------------------------------ */

export const applications = [
  "Waterproofing",
  "Tiling",
  "Flooring",
  "Concrete repair",
  "Pipe joining",
  "Sealing and glazing",
  "Building facades",
  "Gypsum and drywall",
  "Metal treatment",
  "Industrial assembly",
  "Fastening and tools",
  "Food packaging",
  "Dairy and beverages",
  "Paper converting",
  "Mattress manufacturing",
] as const;

export const conditions = [
  "Submerged",
  "External exposed",
  "Internal wet",
  "High traffic",
  "High temperature",
  "Potable water contact",
  "Food contact",
  "Dry interior",
  "Chilled and frozen",
  "High line speed",
] as const;

export type Application = (typeof applications)[number];
export type Condition = (typeof conditions)[number];

export type SystemStep = {
  stage: string;
  product: string;
  principal: string;
  /** One line on what the product is there to do. */
  role: string;
};

export type SystemBuildUp = { standard: string; steps: SystemStep[] };

const step = (
  stage: string,
  product: string,
  principal: string,
  role: string
): SystemStep => ({
  stage,
  product,
  principal,
  role,
});

/**
 * The conditions each application is specified against. Not every condition
 * belongs to every job, so the finder only offers the ones that do.
 */
export const applicationConditions: Record<Application, readonly Condition[]> = {
  Waterproofing: [
    "Submerged",
    "External exposed",
    "Internal wet",
    "High traffic",
    "High temperature",
    "Potable water contact",
    "Food contact",
  ],
  Tiling: [
    "Submerged",
    "External exposed",
    "Internal wet",
    "High traffic",
    "Food contact",
  ],
  Flooring: [
    "External exposed",
    "Internal wet",
    "High traffic",
    "High temperature",
    "Food contact",
  ],
  "Concrete repair": [
    "Submerged",
    "External exposed",
    "Internal wet",
    "High traffic",
    "High temperature",
    "Potable water contact",
  ],
  "Pipe joining": [
    "Submerged",
    "External exposed",
    "Internal wet",
    "High temperature",
    "Potable water contact",
    "Food contact",
  ],
  "Sealing and glazing": [
    "Submerged",
    "External exposed",
    "Internal wet",
    "High temperature",
    "Food contact",
  ],
  "Metal treatment": [
    "External exposed",
    "Internal wet",
    "High temperature",
    "Food contact",
  ],
  "Industrial assembly": [
    "External exposed",
    "Internal wet",
    "High temperature",
    "Food contact",
  ],
  "Fastening and tools": [
    "External exposed",
    "Internal wet",
    "High traffic",
    "High temperature",
  ],
  "Building facades": ["External exposed", "High temperature"],
  "Gypsum and drywall": ["Dry interior", "Internal wet", "High traffic"],
  "Food packaging": [
    "Food contact",
    "Chilled and frozen",
    "High temperature",
    "High line speed",
  ],
  "Dairy and beverages": [
    "Food contact",
    "Chilled and frozen",
    "Internal wet",
    "High line speed",
  ],
  "Paper converting": ["Food contact", "Internal wet", "High line speed"],
  "Mattress manufacturing": ["Dry interior", "High temperature", "High line speed"],
};

export const systems: Record<Application, SystemBuildUp> = {
  Waterproofing: {
    standard: "EN 13707 / EN 14891",
    steps: [
      step(
        "Substrate repair",
        "Polybit structural repair mortar",
        "Henkel",
        "Makes the deck good before anything is applied."
      ),
      step(
        "Primer",
        "Polybit bituminous primer",
        "Henkel",
        "Binds dust and keys the surface to the membrane."
      ),
      step(
        "Membrane",
        "Polybit torch-applied membrane",
        "Henkel",
        "The waterproofing layer itself."
      ),
      step(
        "Detailing",
        "Polybit sealing tape and PU sealant",
        "Henkel",
        "Seals upstands, penetrations and movement joints."
      ),
      step(
        "Protection",
        "Polybit protection board",
        "Henkel",
        "Shields the membrane through backfill and follow-on trades."
      ),
    ],
  },
  Tiling: {
    standard: "EN 12004 / EN 13888",
    steps: [
      step(
        "Surface preparation",
        "Ceresit primer",
        "Henkel",
        "Regulates absorption so the adhesive cures evenly."
      ),
      step(
        "Levelling",
        "Ceresit levelling compound",
        "Henkel",
        "Brings the substrate flat within tolerance."
      ),
      step(
        "Adhesive",
        "Ceresit CM flexible adhesive",
        "Henkel",
        "Bonds the tile and absorbs substrate movement."
      ),
      step(
        "Grout",
        "Ceresit CE epoxy grout",
        "Henkel",
        "Fills and seals the joints between tiles."
      ),
      step(
        "Perimeter seal",
        "GE sanitary silicone",
        "GE Sealants",
        "Takes up movement at every change of plane."
      ),
    ],
  },
  Flooring: {
    standard: "EN 13813",
    steps: [
      step(
        "Preparation",
        "Mechanical profiling and repair mortar",
        "Henkel",
        "Opens the surface profile and makes good defects."
      ),
      step(
        "Primer",
        "Polybit epoxy primer",
        "Henkel",
        "Seals the slab and locks the body coat down."
      ),
      step(
        "Body coat",
        "Polybit resin flooring system",
        "Henkel",
        "Builds the wearing thickness of the floor."
      ),
      step(
        "Topcoat",
        "Polybit epoxy or PU topcoat",
        "Henkel",
        "Sets the finish, chemical and wear resistance."
      ),
      step(
        "Joints",
        "Loctite PU joint sealant",
        "Henkel",
        "Carries movement across bay and perimeter joints."
      ),
    ],
  },
  "Concrete repair": {
    standard: "EN 1504",
    steps: [
      step(
        "Preparation",
        "Breakout and reinforcement cleaning",
        "Henkel",
        "Removes unsound concrete and cleans the steel."
      ),
      step(
        "Bond coat",
        "Polybit bonding primer",
        "Henkel",
        "Ties the repair mortar to the parent concrete."
      ),
      step(
        "Repair mortar",
        "Polybit structural repair mortar",
        "Henkel",
        "Rebuilds the section back to profile."
      ),
      step(
        "Protection",
        "Polybit protective coating",
        "Henkel",
        "Slows carbonation and chloride ingress."
      ),
    ],
  },
  "Pipe joining": {
    standard: "EN 14680 / ASTM D2564",
    steps: [
      step(
        "Cleaning",
        "EZ-Weld cleaner",
        "Weld-On",
        "Takes soil and surface film off the joint."
      ),
      step(
        "Priming",
        "EZ-Weld primer",
        "Weld-On",
        "Softens the pipe wall so the cement can weld."
      ),
      step(
        "Solvent cement",
        "Tangit or EZ-Weld cement",
        "Henkel / Weld-On",
        "Fuses socket and spigot into a single joint."
      ),
      step(
        "Thread sealing",
        "Loctite thread sealant",
        "Henkel",
        "Seals threaded transitions without tape."
      ),
    ],
  },
  "Sealing and glazing": {
    standard: "EN 15651 / ISO 11600",
    steps: [
      step(
        "Cleaning",
        "Surface cleaner and activator",
        "Würth",
        "Prepares the joint faces for adhesion."
      ),
      step(
        "Backer",
        "Closed cell backer rod",
        "Würth",
        "Sets the joint depth and stops three-sided adhesion."
      ),
      step(
        "Sealant",
        "GE weather sealant",
        "GE Sealants",
        "Weatherproofs the joint and carries movement."
      ),
      step(
        "Interior joints",
        "Polybit hybrid sealant",
        "Henkel",
        "Seals internal junctions and perimeter details."
      ),
    ],
  },
  "Metal treatment": {
    standard: "ISO 12944",
    steps: [
      step(
        "Cleaning",
        "Bonderite alkaline cleaner",
        "Henkel",
        "Strips oil and swarf off the metal."
      ),
      step(
        "Conversion",
        "Bonderite conversion coating",
        "Henkel",
        "Lays down the corrosion-resistant bonding layer."
      ),
      step(
        "Rinse and dry",
        "Bonderite process chemistry",
        "Henkel",
        "Controls the rinse so no residue is left behind."
      ),
      step(
        "Bonding or coating",
        "Loctite structural adhesive",
        "Henkel",
        "Bonds or coats the treated surface."
      ),
    ],
  },
  "Industrial assembly": {
    standard: "ISO 10365",
    steps: [
      step(
        "Surface preparation",
        "Bonderite cleaner",
        "Henkel",
        "Degreases the parts before bonding."
      ),
      step(
        "Structural bond",
        "Loctite structural adhesive",
        "Henkel",
        "Carries the load between assembled parts."
      ),
      step(
        "Threadlocking",
        "Loctite anaerobic threadlocker",
        "Henkel",
        "Stops fasteners backing off under vibration."
      ),
      step(
        "Line bonding",
        "Technomelt hot melt",
        "Henkel",
        "Bonds at line speed on the assembly run."
      ),
    ],
  },
  "Fastening and tools": {
    standard: "ETA assessed",
    steps: [
      step(
        "Drilling and cleaning",
        "Würth tooling and blow-out pump",
        "Würth",
        "Forms and clears the hole to the approval."
      ),
      step(
        "Chemical anchor",
        "Würth injection resin",
        "Würth",
        "Bonds the threaded rod into the substrate."
      ),
      step(
        "Mechanical anchor",
        "Würth through-bolt",
        "Würth",
        "Expands into the hole for immediate load."
      ),
      step(
        "Protection",
        "Würth corrosion protection",
        "Würth",
        "Protects the fixing where it stays exposed."
      ),
    ],
  },
  "Building facades": {
    standard: "ASTM C1184 / EN 15434",
    steps: [
      step(
        "Cleaning",
        "Solvent cleaner, two-cloth method",
        "Würth",
        "Leaves glass and frame free of film before bonding."
      ),
      step(
        "Primer",
        "GE silicone primer",
        "GE Sealants",
        "Promotes adhesion on coated and anodised aluminium."
      ),
      step(
        "Structural glazing",
        "GE neutral-cure structural silicone",
        "GE Sealants",
        "Bonds the glass to the frame and carries wind load."
      ),
      step(
        "Backer",
        "Closed cell backer rod",
        "Würth",
        "Sets the weather-seal depth and stops three-sided adhesion."
      ),
      step(
        "Weather seal",
        "GE neutral-cure weatherproofing silicone",
        "GE Sealants",
        "Seals the joints between panels against rain and UV."
      ),
    ],
  },
  "Gypsum and drywall": {
    standard: "EN 13963 / EN 14496",
    steps: [
      step(
        "Plaster and board",
        "Sika gypsum additives",
        "Sika",
        "Controls set time and workability in gypsum plasters."
      ),
      step(
        "Board fixing",
        "Pattex construction adhesive",
        "Henkel",
        "Bonds plasterboard and cornices without mechanical fixings."
      ),
      step(
        "Joints",
        "Pattex acrylic sealant",
        "Henkel",
        "Fills paintable junctions at walls, ceilings and frames."
      ),
      step(
        "Primer",
        "Ceresit deep primer",
        "Henkel",
        "Evens out absorption before tiling or wallcovering."
      ),
      step(
        "Finish",
        "Metylan wallcovering adhesive",
        "Henkel",
        "Hangs paper and vinyl wallcoverings on the board."
      ),
    ],
  },
  "Food packaging": {
    standard: "EU 10/2011 / FDA 21 CFR 175.105",
    steps: [
      step(
        "Laminating",
        "Loctite Liofol laminating adhesive",
        "Henkel",
        "Bonds film layers in flexible food packs."
      ),
      step(
        "Carton forming",
        "Technomelt hot melt",
        "Henkel",
        "Erects and closes cartons at line speed."
      ),
      step(
        "Case and tray sealing",
        "Technomelt Supra hot melt",
        "Henkel",
        "Seals shipping cases with low adhesive consumption."
      ),
      step(
        "Labelling",
        "Aquence water-based label adhesive",
        "Henkel",
        "Holds labels through handling and storage."
      ),
    ],
  },
  "Dairy and beverages": {
    standard: "EU 10/2011 / NSF H1",
    steps: [
      step(
        "Bottle labelling",
        "Aquence cold-glue label adhesive",
        "Henkel",
        "Keeps labels on wet, cold and condensing bottles."
      ),
      step(
        "Cartons and multipacks",
        "Technomelt hot melt",
        "Henkel",
        "Closes cartons and wraps multipacks on the filler line."
      ),
      step(
        "Line maintenance",
        "Loctite food-grade threadlocker and lubricant",
        "Henkel",
        "Keeps fillers and conveyors running, safe for incidental contact."
      ),
      step(
        "Hygienic joints",
        "GE sanitary silicone",
        "GE Sealants",
        "Seals junctions in wash-down areas against mould."
      ),
    ],
  },
  "Paper converting": {
    standard: "BfR XIV / FDA 21 CFR 175.105",
    steps: [
      step(
        "Tube and core winding",
        "Aquence water-based adhesive",
        "Henkel",
        "Builds spiral and parallel tubes and cores."
      ),
      step(
        "Bag and sack making",
        "Aquence starch and PVAc adhesives",
        "Henkel",
        "Forms side seams and bottoms on paper bags."
      ),
      step(
        "Lamination",
        "Loctite Liofol laminating adhesive",
        "Henkel",
        "Laminates paper to film and foil."
      ),
      step(
        "Book and tissue",
        "Technomelt hot melt",
        "Henkel",
        "Binds books and transfers tissue logs at speed."
      ),
    ],
  },
  "Mattress manufacturing": {
    standard: "EN 16516 / CertiPUR",
    steps: [
      step(
        "Foam lamination",
        "Aquence water-based spray adhesive",
        "Henkel",
        "Bonds foam layers with a soft, low-odour glue line."
      ),
      step(
        "Pocket springs",
        "Technomelt pocket spring hot melt",
        "Henkel",
        "Joins spring strings into a unit at line speed."
      ),
      step(
        "Fabric and quilting",
        "Technomelt spray hot melt",
        "Henkel",
        "Laminates fabric and wadding without stiffening the cover."
      ),
      step(
        "Packing",
        "Technomelt case-sealing hot melt",
        "Henkel",
        "Closes roll-pack and boxed mattresses for shipping."
      ),
    ],
  },
};

/** Reads back as "Waterproofing for externally exposed areas". */
export const conditionPhrases: Record<Condition, string> = {
  Submerged: "permanently submerged areas",
  "External exposed": "externally exposed areas",
  "Internal wet": "internal wet areas",
  "High traffic": "high-traffic areas",
  "High temperature": "high-temperature service",
  "Potable water contact": "potable water contact",
  "Food contact": "food-contact areas",
  "Dry interior": "dry interior areas",
  "Chilled and frozen": "chilled and frozen service",
  "High line speed": "high-speed production lines",
};

export const conditionNotes: Record<Condition, string> = {
  Submerged:
    "Specify the immersion-grade variant and extend the cure window before filling.",
  "External exposed":
    "Confirm UV stability and add the protective topcoat where the surface stays visible.",
  "Internal wet":
    "Use the flexible and sanitary grades throughout, with taped junctions at every change of plane.",
  "High traffic":
    "Step up to the heavy-duty topcoat and specify the wider movement joints.",
  "High temperature":
    "Check the upper service limit against the peak surface temperature, not the ambient.",
  "Potable water contact":
    "Only the approved variants may be used. Certificates must accompany the delivery.",
  "Food contact":
    "Select the food-contact compliant grades and confirm the hygiene classification with the operator.",
  "Dry interior":
    "Standard grades apply. Confirm the substrate is dry and at room temperature before application.",
  "Chilled and frozen":
    "Specify the cold-flexible grade and test the bond at the lowest storage temperature, including condensation on removal.",
  "High line speed":
    "Match open and set time to the line speed and compression time, and confirm on a line trial before switching grades.",
};

/* ------------------------------------------------------------------ *
 * Approvals
 * ------------------------------------------------------------------ */

export type CertificateTier = "own" | "principal";

export type Certificate = {
  code: string;
  name: string;
  body: string;
  scope: string;
  validThrough: string;
};

export const certificatesOwn: Certificate[] = [
  {
    code: "ISO 9001:2015",
    name: "Quality management system",
    body: "Accredited certification body",
    scope: "Sourcing, storage, distribution and technical support.",
    validThrough: "2027",
  },
  {
    code: "ISO 45001:2018",
    name: "Occupational health and safety",
    body: "Accredited certification body",
    scope: "Warehouse, logistics and site attendance activities.",
    validThrough: "2027",
  },
  {
    code: "ISO 14001:2015",
    name: "Environmental management",
    body: "Accredited certification body",
    scope: "Storage and handling of chemical products.",
    validThrough: "2028",
  },
  {
    code: "TL-000000",
    name: "Trade licence",
    body: "Local authority",
    scope: "Trading in construction chemicals and industrial adhesives.",
    validThrough: "Annual",
  },
  {
    code: "AD-HENKEL",
    name: "Authorised distributor",
    body: "Henkel",
    scope:
      "Polybit, Ceresit, Loctite, Technomelt, Aquence, Bonderite, Pattex, Tangit, Metylan.",
    validThrough: "2027",
  },
  {
    code: "AD-WELDON",
    name: "Authorised distributor",
    body: "Weld-On",
    scope: "EZ-Weld solvent cement range.",
    validThrough: "2027",
  },
  {
    code: "AD-WURTH",
    name: "Authorised distributor",
    body: "Würth",
    scope: "Fixings, tools, building chemicals and safety.",
    validThrough: "2027",
  },
  {
    code: "AD-GE",
    name: "Authorised distributor",
    body: "GE Sealants",
    scope: "Silicone and polyurethane sealant range.",
    validThrough: "2027",
  },
  {
    code: "AD-SIKA",
    name: "Authorised distributor",
    body: "Sika",
    scope: "Concrete, waterproofing, flooring and facade systems.",
    validThrough: "2027",
  },
];

export const certificatesPrincipal: Certificate[] = [
  {
    code: "CD-APPROVED",
    name: "Civil defence approval",
    body: "Civil defence authority",
    scope: "Waterproofing and fire-rated sealant systems.",
    validThrough: "Under renewal",
  },
  {
    code: "AGRÉMENT",
    name: "Agrément certificate",
    body: "Technical approvals body",
    scope: "Liquid-applied and sheet membrane systems.",
    validThrough: "2029",
  },
  {
    code: "EN 13707",
    name: "Sheet membrane performance",
    body: "Notified body",
    scope: "Reinforced bitumen membranes for roof waterproofing.",
    validThrough: "Ongoing",
  },
  {
    code: "EN 14891",
    name: "Liquid membrane performance",
    body: "Notified body",
    scope: "Liquid-applied membranes under ceramic tiling.",
    validThrough: "Ongoing",
  },
  {
    code: "POTABLE",
    name: "Potable water contact",
    body: "Water regulatory body",
    scope: "Pipe cements and coatings in contact with drinking water.",
    validThrough: "2028",
  },
  {
    code: "EN 13501-1",
    name: "Reaction to fire",
    body: "Notified body",
    scope: "Classification of membranes and insulation build-ups.",
    validThrough: "Ongoing",
  },
  {
    code: "LOW-VOC",
    name: "Low emission certification",
    body: "Indoor air quality scheme",
    scope: "Adhesives, sealants and flooring for occupied interiors.",
    validThrough: "2027",
  },
  {
    code: "FOOD-CONTACT",
    name: "Food contact compliance",
    body: "Regulatory framework",
    scope: "Adhesives used in food packaging and processing areas.",
    validThrough: "Ongoing",
  },
];

/* ------------------------------------------------------------------ *
 * Projects
 * ------------------------------------------------------------------ */

export type ProjectStat = { value: string; label: string };

export type Project = {
  /** URL segment under `/projects`. */
  slug: string;
  name: string;
  sector: string;
  scope: string;
  location?: string;
  system?: string;
  challenge?: string;
  /** Card and case-study lead image. */
  image?: string;
  /** Case-study meta row. */
  year?: string;
  role?: string;
  /** Short reading of the delivery, shown under `Type`. */
  type?: string;
  /** Trailing link in the meta row. */
  link?: { label: string; href: string };
  /** Long-form narrative, one string per paragraph. */
  story?: string[];
  /** Outcome figures printed under the narrative. */
  stats?: ProjectStat[];
  /** Supporting photography, shown full-column down the case study. */
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "harbour-terminal-deck",
    name: "Harbour terminal deck",
    sector: "Marine and offshore",
    scope: "Torch-applied membrane and protection build-up",
    location: "Sultan Qaboos Port, Oman",
    system: "SBS modified bituminous waterproofing & heavy-duty wearing layer",
    challenge: "High saline exposure, tidal vibration, and direct heavy container transport loading.",
    image: "/images/industries/marine-offshore.jpg",
    year: "2024",
    role: "Specification and site supervision",
    type: "Waterproofing, Protection",
    link: { label: "Request pack", href: "/#contact" },
    story: [
      "A container terminal deck sits in the hardest environment a waterproofing system can be asked to work in — salt spray on every tide, structural movement from berthing loads, and reach stackers running across the finished surface all day.",
      "The specification started from the substrate rather than the product. We surveyed the deck with the contractor, recorded moisture content and surface tensile strength, and set the primer and build-up around what the concrete could actually carry rather than around a datasheet ideal.",
      "The result was a torch-applied SBS modified bituminous system with a heavy-duty wearing layer over it, detailed at every upstand, drain, and movement joint before a single roll went down. Pull-off testing was carried out on site through the application programme, with results logged against the specification.",
      "Catenate stayed on the project past handover: the maintenance team was trained on inspection intervals and on the repair detail for any local damage, so the deck can be kept in warranty without a specialist return visit.",
    ],
    stats: [
      { value: "18,000 m²", label: "Deck area treated" },
      { value: "1.4 N/mm²", label: "Mean pull-off result" },
      { value: "10 yr", label: "System warranty" },
    ],
    gallery: ["/images/industries/oil-gas-petrochemical.jpg"],
  },
  {
    slug: "dairy-processing-hall",
    name: "Dairy processing hall",
    sector: "Food and beverage",
    scope: "Resin flooring with hygienic coving and sealants",
    location: "Sohar Industrial City, Oman",
    system: "Heavy-duty polyurethane resin screed & antimicrobial jointing",
    challenge: "Thermal shock from boiling water washdowns, organic acids, and continuous wet processing.",
    image: "/images/industries/food-beverage.jpg",
    year: "2025",
    role: "Specification and commissioning support",
    type: "Resin flooring, Hygienic sealing",
    link: { label: "Request pack", href: "/#contact" },
    story: [
      "A dairy hall is washed down with near-boiling water several times a day, then returned to production within the hour. The floor has to absorb that thermal cycle, shed lactic and citric acid, and leave nowhere for bacteria to sit.",
      "We specified a heavy-duty polyurethane resin screed laid at a thickness matched to the shock loading in each zone — thicker under the filling lines and the CIP skids, lighter through the low-traffic corridors — rather than one blanket build-up across the hall.",
      "Coving, drainage falls, and equipment plinths were detailed as part of the same pour so the floor turns up the wall in a continuous surface. Jointing was closed with an antimicrobial sealant approved for direct food-zone contact.",
      "Phasing mattered as much as chemistry. The hall stayed partly in production throughout, so the programme was cut into bays that could be isolated, laid, cured, and returned to the client between shifts.",
    ],
    stats: [
      { value: "6,200 m²", label: "Resin screed laid" },
      { value: "9 mm", label: "Build-up at CIP zones" },
      { value: "0", label: "Production days lost" },
    ],
    gallery: ["/images/industries/packaging-converting.jpg"],
  },
  {
    slug: "mixed-use-podium",
    name: "Mixed-use podium",
    sector: "Building and infrastructure",
    scope: "Fully bonded waterproofing across 42,000 m²",
    location: "Downtown Dubai, UAE",
    system: "Pre-applied fully bonded waterproofing membrane & expansion joints",
    challenge: "High water table with extreme hydrostatic pressure and complex multi-level underground geometry.",
    image: "/images/industries/building-infrastructure.jpg",
    year: "2024",
    role: "End to end specification",
    type: "Waterproofing, Movement joints",
    link: { label: "Request pack", href: "/#contact" },
    story: [
      "Below-grade waterproofing in Downtown Dubai has no margin for error. The water table sits high, the hydrostatic head is permanent, and once the raft is poured the membrane is unreachable for the life of the building.",
      "The podium was specified as a fully bonded pre-applied system, chosen so that any breach stays local instead of tracking between the membrane and the slab. That single decision is what makes a remedial injection viable years later.",
      "Across 42,000 m² the difficult work was geometry, not area — pile heads, lift pits, transfer slabs, and a three-level basement that changes level repeatedly. Every one of those conditions was drawn as a detail and agreed with the consultant before it reached site.",
      "Expansion joints were specified as part of the same system rather than bought separately, so the joint chemistry, the membrane, and the protection layer were compatible by design rather than by accident.",
    ],
    stats: [
      { value: "42,000 m²", label: "Membrane specified" },
      { value: "3", label: "Basement levels" },
      { value: "14 m", label: "Hydrostatic head" },
    ],
    gallery: ["/images/industries/water-wastewater.jpg"],
  },
  {
    slug: "district-cooling-network",
    name: "District cooling network",
    sector: "HVAC and plumbing",
    scope: "Solvent cement jointing and thread sealing",
    location: "Lusail City, Qatar",
    system: "Industrial CPVC solvent cements & anaerobic thread sealants",
    challenge: "Continuous chilled water loop circulation under high operating pressures up to 16 bar.",
    image: "/images/industries/hvac-plumbing.jpg",
    year: "2023",
    role: "Product specification and installer training",
    type: "Jointing, Thread sealing",
    link: { label: "Request pack", href: "/#contact" },
    story: [
      "A district cooling loop is only as reliable as its weakest joint. At 16 bar and in continuous circulation, a joint that was cured five degrees too warm or clamped thirty seconds too early becomes a callout two years into operation.",
      "We specified industrial CPVC solvent cements matched to pipe diameter and to the ambient conditions the crews were actually working in, along with anaerobic thread sealants for the mechanical connections at the plant room.",
      "The larger part of the work was training. Catenate ran toolbox sessions with the installing teams on cut preparation, cement application window, set time against site temperature, and how to record each joint — so the method survived crew changes across the programme.",
      "Joint records were handed over with the network. When the client later extended the loop, the same specification and the same record format carried straight into the new section.",
    ],
    stats: [
      { value: "16 bar", label: "Operating pressure" },
      { value: "4,800", label: "Recorded joints" },
      { value: "60+", label: "Installers trained" },
    ],
    gallery: ["/images/industries/water-wastewater.jpg"],
  },
  {
    slug: "hospital-theatre-block",
    name: "Hospital theatre block",
    sector: "Healthcare",
    scope: "Low-emission flooring and sealant package",
    location: "London, United Kingdom",
    system: "EC1 Plus certified conductive flooring adhesives & cleanroom silicone sealants",
    challenge: "Zero VOC emission tolerance, electrostatic dissipation, and resistance to aggressive chemical disinfectants.",
    image: "/images/industries/healthcare-life-sciences.jpg",
    year: "2025",
    role: "Specification and compliance documentation",
    type: "Flooring adhesives, Cleanroom sealing",
    link: { label: "Request pack", href: "/#contact" },
    story: [
      "An operating theatre asks three things of a floor at once: it must not off-gas, it must dissipate static, and it must survive disinfectants that would strip an ordinary finish inside a year.",
      "The adhesive package was specified to EC1 Plus, the strictest emission class available, and paired with a conductive build-up that ties the floor covering into the theatre's earthing. Copper grid layout and resistance targets were agreed with the electrical consultant before installation.",
      "Perimeter and penetration sealing used cleanroom-grade silicones chosen for their behaviour under repeated chemical disinfection rather than for their initial cure speed.",
      "Because this was an NHS handover, documentation was part of the deliverable. Every product in the package arrived with emission certification, batch traceability, and a signed installation record that went into the building file.",
    ],
    stats: [
      { value: "EC1 Plus", label: "Emission class" },
      { value: "12", label: "Theatres fitted out" },
      { value: "10⁶ Ω", label: "Resistance to earth" },
    ],
    gallery: ["/images/industries/laboratory-microscope.jpg"],
  },
  {
    slug: "galvanising-line",
    name: "Galvanising line",
    sector: "Metals and fabrication",
    scope: "Bonderite pretreatment sequence",
    location: "Abu Dhabi Industrial Zone, UAE",
    system: "Henkel Bonderite conversion coating & chemical conversion wash",
    challenge: "Rigorous corrosion prevention specification meeting 1,000-hour salt spray endurance standards.",
    image: "/images/industries/metals-fabrication.jpg",
    year: "2023",
    role: "Process specification and line commissioning",
    type: "Pretreatment, Corrosion protection",
    link: { label: "Request pack", href: "/#contact" },
    story: [
      "The client needed coated steel to clear 1,000 hours of neutral salt spray. That figure is decided in the pretreatment stages, long before any topcoat is applied.",
      "Catenate specified a Henkel Bonderite conversion sequence and set the process window for each stage — bath concentration, temperature, dwell, and rinse quality — against the substrate mix actually running on the line.",
      "Commissioning ran alongside the client's process engineers. Panels were pulled at intervals, coating weights checked, and the sequence tuned until the line held the specification at full production rate rather than only on a test run.",
      "The bath control schedule handed over at the end is the part that keeps the result: titration intervals, top-up ratios, and the trigger points at which a bath is dumped rather than corrected.",
    ],
    stats: [
      { value: "1,000 hr", label: "Salt spray endurance" },
      { value: "5", label: "Pretreatment stages" },
      { value: "2 wk", label: "Line commissioning" },
    ],
    gallery: ["/images/industries/automotive-transport.jpg"],
  },
];

/** Look a case study up by its URL segment. */
export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

/* ------------------------------------------------------------------ *
 * Editorial blocks
 * ------------------------------------------------------------------ */

export type Blurb = { title: string; body: string };

export const strengths: Blurb[] = [
  {
    title: "An international legacy",
    body: "Decades of brand equity built across the Middle East and Europe, carried into every market we now serve.",
  },
  {
    title: "Range built for the extremes",
    body: "A catalogue deep enough to answer conditions ordinary systems were never built to survive.",
  },
  {
    title: "1,500+ customers, and rising",
    body: "A customer base that keeps compounding, the clearest proof a supply chain is holding.",
  },
  {
    title: "15 years of market intelligence",
    body: "Product knowledge that goes deeper than a data sheet, built one specification at a time.",
  },
  {
    title: "An integrity-led team",
    body: "People who treat every specification as their own, long after the delivery note is signed.",
  },
  {
    title: "Capability, proven on site",
    body: "Technical claims validated in person, through joint site visits with the principals whose names we carry.",
  },
  {
    title: "Class-A clientele",
    body: "Trusted by global MNCs and class-A developers who specify Catenate by name, not by default.",
  },
  {
    title: "Testing on every continent",
    body: "Performance validated in our own laboratories, wherever in the world the work is happening.",
  },
];

export type WhyCatenatePillar = Blurb & {
  headline: string;
  detail: string;
  image: string;
  tag: string;
};

export const whyCatenate: WhyCatenatePillar[] = [
  {
    title: "System Compatibility",
    headline: "Compatible by system, not by shelf.",
    body: "Primer, membrane, screed and adhesive selected as one chain so nothing fails at an interface.",
    detail: "We engineer chemical and mechanical compatibility across the entire building envelope. When primer, screed, waterproofing membrane, and wear layers are specified as a unified system from proven principals, interlayer failure is eliminated before work begins.",
    image: "/images/industries/building-infrastructure.jpg",
    tag: "Interlayer Integrity",
  },
  {
    title: "Held Stock Depth",
    headline: "Committed inventory across the full catalogue.",
    body: "Depth in fast-moving lines and access to specialist ones, released against programme.",
    detail: "Critical infrastructure schedules cannot stall on bespoke chemistry lead times. We maintain committed inventory across rapid-turnaround commodities and heavy-duty specialty formulations, staged locally and released against project milestones.",
    image: "/images/industries/metals-fabrication.jpg",
    tag: "Milestone Logistics",
  },
  {
    title: "Certified Approvals",
    headline: "Approvals carried, not claimed.",
    body: "Every system supplied arrives with certificates, test reports and data sheets in order.",
    detail: "Class-A developers and engineering consultants demand verifiable provenance. Every delivery note is backed by complete technical data sheets, independent laboratory pull-off assays, fire ratings, and environmental compliance documentation ready for audit.",
    image: "/images/industries/laboratory-microscope.jpg",
    tag: "Audit-Ready Provenance",
  },
  {
    title: "On-Site Validation",
    headline: "On site before the first coat is applied.",
    body: "Substrate readings, mock-ups and applicator briefings ahead of application, not after a defect.",
    detail: "Field failure prevention happens before application begins. Our technical specialists inspect substrate moisture, surface profiles, and ambient conditions, conducting on-site mockups and direct applicator briefings before a single bucket is opened.",
    image: "/images/industries/marine-offshore.jpg",
    tag: "Field Quality Assurance",
  },
  {
    title: "One Accountable Line",
    headline: "A single point of technical responsibility.",
    body: "Direct responsibility across five world-class principals and thirty-one product families.",
    detail: "No finger-pointing between manufacturers when multiple chemistries intersect. Catenate acts as your single technical and commercial point of responsibility, guaranteeing cohesive performance from sub-grade foundations to the finished surface.",
    image: "/images/industries/oil-gas-petrochemical.jpg",
    tag: "Unified Warranty",
  },
];

export const technicalSupport: Blurb[] = [
  {
    title: "Site inspection",
    body: "Substrate moisture, pull-off and surface profile readings taken before a system is confirmed.",
  },
  {
    title: "System specification",
    body: "Written build-ups with product references, consumption rates and sequence for the main contractor.",
  },
  {
    title: "Applicator training",
    body: "Hands-on sessions with the applying crew, run on the actual substrate where possible.",
  },
  {
    title: "Toolbox talks",
    body: "Short site briefings on mixing ratios, overcoat windows and safe handling before each phase.",
  },
];

/* ------------------------------------------------------------------ *
 * Power brands
 * ------------------------------------------------------------------ */

export type PowerBrand = {
  name: string;
  /** The principal the range is supplied through. */
  principal: string;
  /** What the range covers, in a few words. */
  line: string;
  /**
   * Official mark in `public/images/logos`. Optional: the strip sets the name
   * in type until the file is supplied.
   */
  logo?: string;
  /** Optical correction against the shared logo box. Defaults to 1. */
  logoScale?: number;
};

export const powerBrands: PowerBrand[] = [
  { name: "Loctite", principal: "Henkel", line: "Industrial adhesives and sealants" },
  { name: "Pattex", principal: "Henkel", line: "Trade and DIY bonding" },
  { name: "Technomelt", principal: "Henkel", line: "Hot melt adhesives" },
  { name: "Aquence", principal: "Henkel", line: "Water-based adhesives" },
  { name: "Bonderite", principal: "Henkel", line: "Metal treatment" },
  { name: "Polybit", principal: "Henkel", line: "Waterproofing and construction" },
  { name: "Tangit", principal: "Henkel", line: "PVC-U pipe cements" },
  { name: "Metylan", principal: "Henkel", line: "Wallcovering adhesives" },
  { name: "EZ-Weld", principal: "Weld-On", line: "UPVC and CPVC solvent cements" },
  { name: "Master Builders", principal: "Sika", line: "Flooring and concrete repair" },
  { name: "Sika", principal: "Sika", line: "Construction chemicals" },
];

export type Customer = {
  sector: string;
  name: string;
  /** Wordmark in `public/images/logos`. */
  logo: string;
  /**
   * Optical correction for the logo wall. Every mark is fitted to the same
   * box, which leaves square lockups reading smaller than wide wordmarks;
   * this nudges that box per logo. Defaults to 1.
   */
  logoScale?: number;
};

const logo = (file: string) => `/images/logos/${file}`;

export const customers: Customer[] = [
  {
    sector: "Contracting",
    name: "Larsen & Toubro (Oman) LLC",
    logo: logo("larsen-toubro.svg"),
    logoScale: 1.2,
  },
  {
    sector: "Contracting",
    name: "STRABAG Oman LLC",
    logo: logo("strabag.svg"),
    logoScale: 0.9,
  },
  {
    sector: "Contracting",
    name: "Galfar Engineering & Contracting SAOG",
    logo: logo("galfar.png"),
    logoScale: 1.15,
  },
  {
    sector: "Contracting",
    name: "Bahwan Engineering Company LLC",
    logo: logo("bahwan.svg"),
  },
  {
    sector: "Food and beverage",
    name: "Nestlé",
    logo: logo("nestle.svg"),
    logoScale: 1.3,
  },
  {
    sector: "Food and beverage",
    name: "Coca-Cola Al Ahlia Beverages Company LLC",
    logo: logo("coca-cola.svg"),
    logoScale: 0.95,
  },
  {
    sector: "Food and beverage",
    name: "Oman Refreshment Company (Pepsi Oman)",
    logo: logo("oman-refreshment.png"),
  },
  {
    sector: "Manufacturing",
    name: "Unilever Home & Personal Care Products Mfg LLC",
    logo: logo("unilever.svg"),
    logoScale: 1.25,
  },
  {
    sector: "Manufacturing",
    name: "RAK Ceramics",
    logo: logo("rak-ceramics.svg"),
  },
  {
    sector: "Manufacturing",
    name: "IFFCO Group",
    logo: logo("iffco.svg"),
    logoScale: 0.95,
  },
];

export const contactCards = [
  {
    title: "Can't find what you're looking for?",
    cta: "Submit your enquiry",
    href: "#enquiry",
    action: "enquiry",
    image: images.contactBg,
  },
  {
    title: "Looking where to buy? Let us help you with that",
    cta: "Find a channel partner",
    href: "/about",
    action: "navigate",
    image: images.contactBg,
  },
  {
    title: "Channel Partner Network to serve your needs",
    cta: "Find out more",
    href: "/technologies",
    action: "navigate",
    image: images.contactBg,
  },
] as const;

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */

export const company = {
  address: [
    "Head office and central warehouse",
    "Industrial Area 12, Plot 44",
    "Regional branches in four territories",
  ],
  phone: "+000 0000 0000",
  email: "specification@catenate.com",
  legal: "Trade licence 000000 · ISO 9001:2015 · ISO 45001:2018",
} as const;

export const footerColumns = [
  {
    heading: "Brands",
    links: brands.map((brand) => ({
      label: brand.name,
      href: `/brands/${brand.slug}`,
    })),
  },
  {
    heading: "Systems",
    links: [
      "Waterproofing",
      "Concrete repair",
      "Sealants and glazing",
      "Tiling and flooring",
      "Metal pretreatment",
    ].map((label) => ({ label, href: "/technologies" })),
  },
  {
    heading: "Company",
    links: [
      { label: "Quality and HSE", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Industries", href: "/#industries" },
      { label: "Become a partner", href: "/#contact" },
      { label: "Careers", href: "/#contact" },
    ],
  },
];
