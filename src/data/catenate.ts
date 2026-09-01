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
  industry: (index: number) => placeholder(`catenateind${index}`, 1200, 800),
  project: (index: number) => placeholder(`catenateproj${index}`, 600, 800),
  contactInquiry: placeholder("catenatesupport", 700, 525),
  contactChannel: placeholder("catenatechannel", 700, 525),
  contactPartner: placeholder("catenatepartner", 700, 525),
} as const;

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
    key: "do",
    navLabel: "What we do",
    label: "What we do",
    href: "#brands",
    items: [
      "Distribution and supply",
      "System specification",
      "Technical support and site inspection",
      "Applicator training",
      "Stock and logistics",
    ],
  },
  {
    key: "industries",
    navLabel: "Industries",
    label: "Industries we serve",
    href: "#industries",
    items: [
      "Building and infrastructure",
      "Marine and offshore",
      "Oil, gas and petrochemical",
      "Water and wastewater",
      "Food and beverage",
      "Packaging and converting",
      "Automotive and transport",
      "Metals and fabrication",
      "Furniture and woodworking",
      "Electronics and assembly",
      "Footwear and leather",
      "HVAC and plumbing",
      "Healthcare and life sciences",
      "Retail and fit-out",
    ],
  },
  {
    key: "brands",
    navLabel: "Brands",
    label: "Brands and Products",
    href: "#brands",
    groups: [
      {
        title: "Henkel",
        items: [
          "Polybit",
          "Technomelt",
          "Aquence",
          "Pattex",
          "Tangit",
          "Metylan",
          "Ceresit",
          "Bonderite",
          "Loctite",
        ],
      },
      { title: "Weld-On", items: ["EZ-Weld"] },
      {
        title: "Würth",
        items: [
          "Anchors and fasteners",
          "Hand and power tools",
          "Safety and workwear",
          "Lubricants and rust removers",
          "Building chemicals",
        ],
      },
      {
        title: "GE Sealants",
        items: ["General purpose", "Weather sealants", "PU sealants and caulks"],
      },
      { title: "Browse", items: ["By application", "By chemistry"] },
    ],
  },
  {
    key: "tech",
    navLabel: "Technologies",
    label: "Technologies and Approvals",
    href: "#technologies",
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
    key: "about",
    navLabel: "About",
    label: "About Catenate",
    href: "#approvals",
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
    "Connecting international legacy",
    "brands from around the world",
    "to your doorstep.",
  ],
  body:
    "A global market intelligence & distribution platform built around Trusted Brands, Efficient Teams, Technical knowhow & Dependable Supply Chain.",
  stats: [
    { value: "38", label: "Markets served" },
    { value: "4", label: "Regions" },
    { value: "13", label: "Brands represented" },
    { value: "14", label: "Industries supplied" },
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
  heading: "Specified in 38 markets, across four regions.",
  lead:
    "Held stock, technical attendance and approved systems, wherever the programme runs.",
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
  challenge: string;
  systems: string[];
  reference: string;
};

export const industries: Industry[] = [
  {
    name: "Building and infrastructure",
    challenge:
      "Podium decks, basements, wet areas and facades under long warranty periods.",
    systems: ["Waterproofing systems", "Tiling and flooring", "Concrete repair", "Sealants"],
    reference: "Mixed-use podium, 42,000 m² deck",
  },
  {
    name: "Marine and offshore",
    challenge:
      "Constant salt exposure, movement and coating windows measured in hours.",
    systems: ["Metal pretreatment", "Structural adhesives", "PU sealants"],
    reference: "Port container terminal, phase two",
  },
  {
    name: "Oil, gas and petrochemical",
    challenge: "Chemical attack, thermal cycling and permit-controlled application.",
    systems: ["Protective coatings", "Structural repair mortars", "Thread lockers"],
    reference: "Tank farm bund lining refurbishment",
  },
  {
    name: "Water and wastewater",
    challenge:
      "Potable contact approval and immersion performance are non-negotiable.",
    systems: ["Liquid membranes", "Pipe joining adhesives", "Repair mortars"],
    reference: "Reservoir roof and joint replacement",
  },
  {
    name: "Food and beverage",
    challenge:
      "Washdown temperatures, hygiene classification and food-contact compliance.",
    systems: ["Resin flooring", "Hygienic sealants", "Water-based adhesives"],
    reference: "Dairy processing hall, 8,600 m²",
  },
  {
    name: "Packaging and converting",
    challenge: "Line speed decides the adhesive before anything else does.",
    systems: ["Hot melt adhesives", "Water-based adhesives"],
    reference: "Carton line changeover, three plants",
  },
  {
    name: "Automotive and transport",
    challenge:
      "Bonded assemblies replacing mechanical fixing, with pretreatment to match.",
    systems: ["Structural adhesives", "Metal pretreatment", "Threadlocking"],
    reference: "Bus body assembly programme",
  },
  {
    name: "Metals and fabrication",
    challenge:
      "Cleaning, forming and coating handled as one sequence, not three purchases.",
    systems: ["Bonderite pretreatment", "Anaerobic adhesives", "Lubricants"],
    reference: "Galvanising line pretreatment upgrade",
  },
  {
    name: "Furniture and woodworking",
    challenge:
      "Edge, panel and assembly bonding with finish quality visible on day one.",
    systems: ["Hot melt adhesives", "Water-based adhesives", "Construction adhesives"],
    reference: "Contract furniture facility",
  },
  {
    name: "Electronics and assembly",
    challenge: "Small bond lines, fast fixture times and controlled outgassing.",
    systems: ["Cyanoacrylates", "Threadlockers", "Specialty adhesives"],
    reference: "Control panel assembly line",
  },
  {
    name: "Footwear and leather",
    challenge: "Flexibility and peel strength after thousands of cycles.",
    systems: ["Water-based adhesives", "Contact adhesives"],
    reference: "Footwear plant bonding trial",
  },
  {
    name: "HVAC and plumbing",
    challenge: "Pipe joining, pressure testing windows and potable water approval.",
    systems: ["Tangit solvent cement", "EZ-Weld cements", "Thread sealants"],
    reference: "District cooling network extension",
  },
  {
    name: "Healthcare and life sciences",
    challenge: "Low emission, cleanable surfaces and documented compliance.",
    systems: ["Resin flooring", "Low-VOC sealants", "Hygienic systems"],
    reference: "Hospital theatre block fit-out",
  },
  {
    name: "Retail and fit-out",
    challenge: "Short programmes, fast cure and finishes that survive footfall.",
    systems: ["Tile adhesives", "Levelling compounds", "Construction adhesives"],
    reference: "Mall refurbishment, 60 units",
  },
];

/* ------------------------------------------------------------------ *
 * Brands
 * ------------------------------------------------------------------ */

export type Brand = {
  name: string;
  description: string;
  familyCount: string;
  /** Tailwind text colour for the partner strip wordmark. */
  wordmarkClass: string;
  groups: MegaGroup[];
};

export const brands: Brand[] = [
  {
    name: "Henkel",
    description:
      "Umbrella principal across construction, industrial and consumer bonding",
    familyCount: "9 families",
    wordmarkClass: "text-[#e1000f]",
    groups: [
      {
        title: "Construction systems",
        items: [
          "Polybit waterproofing",
          "Polybit concrete repair",
          "Polybit sealants",
          "Polybit tiling",
          "Polybit flooring",
          "Polybit Fully Bonded System",
          "Ceresit flooring and screeds",
          "Metylan wallcovering",
        ],
      },
      {
        title: "Industrial",
        items: [
          "Technomelt hot melt",
          "Aquence water-based",
          "Bonderite pretreatment",
          "Bonderite cleaning",
          "Bonderite coating",
        ],
      },
      {
        title: "Specialty and trade",
        items: [
          "Loctite threadlockers",
          "Loctite instant adhesives",
          "Loctite sealants and foams",
          "Pattex trade adhesives",
          "Tangit pipe cements",
        ],
      },
    ],
  },
  {
    name: "Weld-On",
    description: "Solvent cement systems for pressure pipework",
    familyCount: "1 family",
    wordmarkClass: "text-[#0b5fa5]",
    groups: [
      {
        title: "EZ-Weld",
        items: ["UPVC cements", "CPVC cements", "Primers and cleaners", "Pipe lubricants"],
      },
    ],
  },
  {
    name: "Würth",
    description: "Fixings, tools and building chemicals for the working site",
    familyCount: "7 families",
    wordmarkClass: "text-[#cc0000]",
    groups: [
      {
        title: "Fixing",
        items: [
          "Chemical anchors",
          "Mechanical anchors",
          "Screws and fasteners",
          "Direct fastening",
        ],
      },
      { title: "Tools", items: ["Hand tools", "Power tools", "Abrasives and accessories"] },
      {
        title: "Chemicals and safety",
        items: [
          "Sealants and adhesives",
          "Tapes",
          "Aerosols and lubricants",
          "Rust removers",
          "Cleaning agents",
          "Safety and workwear",
        ],
      },
    ],
  },
  {
    name: "GE Sealants",
    description: "Silicone and polyurethane sealing for envelope and interior",
    familyCount: "3 families",
    wordmarkClass: "text-[#3874c8]",
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
    name: "Sika",
    description:
      "Concrete, waterproofing and building-finish systems for refurbishment and new build",
    familyCount: "8 families",
    wordmarkClass: "text-[#d50032]",
    groups: [
      {
        title: "Structural",
        items: [
          "Refurbishment: grouting, anchoring and structural strengthening",
          "Concrete repair and protection",
          "Concrete admixtures and cement additives",
        ],
      },
      {
        title: "Waterproofing and roofing",
        items: [
          "Liquid-applied and injection waterproofing",
          "Joint waterproofing and sheet membrane",
          "Single-ply and bituminous roof membranes",
        ],
      },
      {
        title: "Flooring and sealing",
        items: [
          "Industrial coating and decorative floor systems",
          "Construction adhesives and expansion foam",
          "Firestop systems",
        ],
      },
      {
        title: "Facade and finishing",
        items: [
          "Hygienic and interior wall coatings",
          "Facade mortars and protection",
          "Tiling systems and external wall insulation",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Technologies
 * ------------------------------------------------------------------ */

export type Technology = {
  name: string;
  description: string;
  spec: [label: string, value: string][];
};

export const technologies: Technology[] = [
  {
    name: "Bituminous and liquid-applied membranes",
    description:
      "Waterproofing that has to survive burial, ponding and movement for the design life of the structure. Selection turns on whether the deck is trafficked, whether the membrane is bonded or loose-laid, and how much detailing sits around penetrations.",
    spec: [
      ["Service temperature", "−20 to +90 °C"],
      ["Cure mechanism", "Heat fusion or moisture cure"],
      ["Substrate", "Concrete, screed, metal deck"],
      ["Application", "Torch, roller, spray"],
    ],
  },
  {
    name: "Polyurethane and silicone sealants",
    description:
      "Movement joints, glazing perimeters and sanitary junctions. The governing figure is movement accommodation factor, followed by whether the joint will be painted and whether it sees standing water.",
    spec: [
      ["Service temperature", "−40 to +120 °C"],
      ["Cure mechanism", "Moisture cure"],
      ["Substrate", "Concrete, glass, aluminium, PVC"],
      ["Application", "Cartridge and sausage gun"],
    ],
  },
  {
    name: "Cyanoacrylate and anaerobic adhesives",
    description:
      "Fast fixture on close-fitting parts, and controlled locking on threaded assemblies. Gap fill and material pairing decide the grade far more than headline strength figures do.",
    spec: [
      ["Service temperature", "−55 to +150 °C"],
      ["Cure mechanism", "Anaerobic or surface moisture"],
      ["Substrate", "Metals, elastomers, plastics"],
      ["Application", "Drop, bead, wicking"],
    ],
  },
  {
    name: "Hot melt and water-based adhesives",
    description:
      "Production bonding where the line speed sets the specification. Open time, set time and heat resistance are balanced against substrate porosity and the temperature the finished pack will see.",
    spec: [
      ["Service temperature", "−10 to +80 °C"],
      ["Cure mechanism", "Cooling or water evaporation"],
      ["Substrate", "Board, paper, film, wood"],
      ["Application", "Slot, wheel, spray, roller"],
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
  "Metal pretreatment",
  "Industrial assembly",
  "Fastening and tools",
] as const;

export const conditions = [
  "Submerged",
  "External exposed",
  "Internal wet",
  "High traffic",
  "High temperature",
  "Potable water contact",
  "Food contact",
] as const;

export type Application = (typeof applications)[number];
export type Condition = (typeof conditions)[number];

export type SystemStep = { stage: string; product: string; principal: string };
export type SystemBuildUp = { standard: string; steps: SystemStep[] };

const step = (stage: string, product: string, principal: string): SystemStep => ({
  stage,
  product,
  principal,
});

export const systems: Record<Application, SystemBuildUp> = {
  Waterproofing: {
    standard: "EN 13707 / EN 14891",
    steps: [
      step("Substrate repair", "Polybit structural repair mortar", "Henkel"),
      step("Primer", "Polybit bituminous primer", "Henkel"),
      step("Membrane", "Polybit torch-applied membrane", "Henkel"),
      step("Detailing", "Polybit sealing tape and PU sealant", "Henkel"),
      step("Protection", "Polybit protection board", "Henkel"),
    ],
  },
  Tiling: {
    standard: "EN 12004 / EN 13888",
    steps: [
      step("Surface preparation", "Ceresit primer", "Henkel"),
      step("Levelling", "Ceresit levelling compound", "Henkel"),
      step("Adhesive", "Ceresit CM flexible adhesive", "Henkel"),
      step("Grout", "Ceresit CE epoxy grout", "Henkel"),
      step("Perimeter seal", "GE sanitary silicone", "GE Sealants"),
    ],
  },
  Flooring: {
    standard: "EN 13813",
    steps: [
      step("Preparation", "Mechanical profiling and repair mortar", "Henkel"),
      step("Primer", "Polybit epoxy primer", "Henkel"),
      step("Body coat", "Polybit resin flooring system", "Henkel"),
      step("Topcoat", "Polybit epoxy or PU topcoat", "Henkel"),
      step("Joints", "Loctite PU joint sealant", "Henkel"),
    ],
  },
  "Concrete repair": {
    standard: "EN 1504",
    steps: [
      step("Preparation", "Breakout and reinforcement cleaning", "Henkel"),
      step("Bond coat", "Polybit bonding primer", "Henkel"),
      step("Repair mortar", "Polybit structural repair mortar", "Henkel"),
      step("Protection", "Polybit protective coating", "Henkel"),
    ],
  },
  "Pipe joining": {
    standard: "EN 14680 / ASTM D2564",
    steps: [
      step("Cleaning", "EZ-Weld cleaner", "Weld-On"),
      step("Priming", "EZ-Weld primer", "Weld-On"),
      step("Solvent cement", "Tangit or EZ-Weld cement", "Henkel / Weld-On"),
      step("Thread sealing", "Loctite thread sealant", "Henkel"),
    ],
  },
  "Sealing and glazing": {
    standard: "EN 15651 / ISO 11600",
    steps: [
      step("Cleaning", "Surface cleaner and activator", "Würth"),
      step("Backer", "Closed cell backer rod", "Würth"),
      step("Sealant", "GE weather sealant", "GE Sealants"),
      step("Interior joints", "Polybit hybrid sealant", "Henkel"),
    ],
  },
  "Metal pretreatment": {
    standard: "ISO 12944",
    steps: [
      step("Cleaning", "Bonderite alkaline cleaner", "Henkel"),
      step("Conversion", "Bonderite conversion coating", "Henkel"),
      step("Rinse and dry", "Bonderite process chemistry", "Henkel"),
      step("Bonding or coating", "Loctite structural adhesive", "Henkel"),
    ],
  },
  "Industrial assembly": {
    standard: "ISO 10365",
    steps: [
      step("Surface preparation", "Bonderite cleaner", "Henkel"),
      step("Structural bond", "Loctite structural adhesive", "Henkel"),
      step("Threadlocking", "Loctite anaerobic threadlocker", "Henkel"),
      step("Line bonding", "Technomelt hot melt", "Henkel"),
    ],
  },
  "Fastening and tools": {
    standard: "ETA assessed",
    steps: [
      step("Drilling and cleaning", "Würth tooling and blow-out pump", "Würth"),
      step("Chemical anchor", "Würth injection resin", "Würth"),
      step("Mechanical anchor", "Würth through-bolt", "Würth"),
      step("Protection", "Würth corrosion protection", "Würth"),
    ],
  },
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

export type Project = { name: string; sector: string; scope: string };

export const projects: Project[] = [
  {
    name: "Harbour terminal deck",
    sector: "Marine and offshore",
    scope: "Torch-applied membrane and protection build-up",
  },
  {
    name: "Dairy processing hall",
    sector: "Food and beverage",
    scope: "Resin flooring with hygienic coving and sealants",
  },
  {
    name: "Mixed-use podium",
    sector: "Building and infrastructure",
    scope: "Fully Bonded System across 42,000 m²",
  },
  {
    name: "District cooling network",
    sector: "HVAC and plumbing",
    scope: "Solvent cement jointing and thread sealing",
  },
  {
    name: "Hospital theatre block",
    sector: "Healthcare",
    scope: "Low-emission flooring and sealant package",
  },
  {
    name: "Galvanising line",
    sector: "Metals and fabrication",
    scope: "Bonderite pretreatment sequence",
  },
];

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

export const whyCatenate: Blurb[] = [
  {
    title: "Compatible by system, not by shelf",
    body: "Primer, membrane, screed and adhesive are selected as one chain so nothing fails at an interface.",
  },
  {
    title: "Held stock across the full range",
    body: "Depth in the fast-moving lines and access to the specialist ones, released against programme.",
  },
  {
    title: "Approvals carried, not claimed",
    body: "Every system supplied arrives with its certificates, test reports and data sheets in order.",
  },
  {
    title: "On site before the first coat",
    body: "Substrate readings, mock-ups and applicator briefings ahead of application, not after a defect.",
  },
  {
    title: "One accountable line",
    body: "A single point of responsibility across five principals and twenty-eight product families.",
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

export type Customer = { sector: string; name: string };

export const customers: Customer[] = [
  { sector: "Contracting", name: "Larsen & Toubro (Oman) LLC" },
  { sector: "Contracting", name: "STRABAG Oman LLC" },
  { sector: "Contracting", name: "Galfar Engineering & Contracting SAOG" },
  { sector: "Contracting", name: "Bahwan Engineering Company LLC" },
  { sector: "Food and beverage", name: "Nestlé" },
  { sector: "Food and beverage", name: "Coca-Cola Al Ahlia Beverages Company LLC" },
  { sector: "Food and beverage", name: "Oman Refreshment Company (Pepsi Oman)" },
  { sector: "Manufacturing", name: "Unilever Home & Personal Care Products Mfg LLC" },
  { sector: "Manufacturing", name: "RAK Ceramics" },
  { sector: "Manufacturing", name: "IFFCO Group" },
];

export const contactCards = [
  {
    title: "Can't find what you're looking for?",
    cta: "Submit your inquiry",
    image: images.contactInquiry,
  },
  {
    title: "Looking where to buy? Let us help you with that",
    cta: "Find a channel partner",
    image: images.contactChannel,
  },
  {
    title: "Channel Partner Network to serve your needs",
    cta: "Find out more",
    image: images.contactPartner,
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
    links: brands.map((brand) => ({ label: brand.name, href: "#brands" })),
  },
  {
    heading: "Systems",
    links: [
      "Waterproofing",
      "Concrete repair",
      "Sealants and glazing",
      "Tiling and flooring",
      "Metal pretreatment",
    ].map((label) => ({ label, href: "#technologies" })),
  },
  {
    heading: "Company",
    links: [
      { label: "Quality and HSE", href: "#approvals" },
      { label: "Projects", href: "#projects" },
      { label: "Industries", href: "#industries" },
      { label: "Become a partner", href: "#contact" },
      { label: "Careers", href: "#contact" },
    ],
  },
];
