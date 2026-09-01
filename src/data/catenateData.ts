export interface MegaItem {
  label: string;
  items?: string[];
  groups?: {
    t: string;
    items: string[];
  }[];
}

export interface IndustryItem {
  id: number;
  n: string;
  c: string;
  f: string[];
  p: string;
  image: string;
}

export interface BrandGroup {
  t: string;
  items: string[];
}

export interface BrandItem {
  n: string;
  d: string;
  c: string;
  groups: BrandGroup[];
}

export interface TechItem {
  n: string;
  d: string;
  s: [string, string][];
}

export interface SystemStep {
  phase: string;
  product: string;
  brand: string;
}

export interface SystemRecommendation {
  std: string;
  steps: [string, string, string][];
}

export interface CertificateItem {
  c: string; // code
  n: string; // name
  b: string; // issuing body
  s: string; // scope
  v: string; // validity
}

export interface ProjectItem {
  n: string; // name
  s: string; // sector
  y: string; // description / build-up
  img: string;
}

export interface AssemblyLayer {
  n: string;
  p: string;
  h: number;
  f: string;
}

export interface AssemblyItem {
  id: string;
  name: string;
  layers: AssemblyLayer[];
}

export const MEGA_DATA: Record<string, MegaItem> = {
  do: {
    label: "What we do",
    items: [
      "Distribution and supply",
      "System specification",
      "Technical support and site inspection",
      "Applicator training",
      "Stock and logistics",
    ],
  },
  industries: {
    label: "Industries we serve",
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
  brands: {
    label: "Brands and Products",
    groups: [
      {
        t: "Henkel",
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
      {
        t: "Weld-On",
        items: ["EZ-Weld"],
      },
      {
        t: "Würth",
        items: [
          "Anchors and fasteners",
          "Hand and power tools",
          "Safety and workwear",
          "Lubricants and rust removers",
          "Building chemicals",
        ],
      },
      {
        t: "GE Sealants",
        items: ["General purpose", "Weather sealants", "PU sealants and caulks"],
      },
      {
        t: "Browse",
        items: ["By application", "By chemistry"],
      },
    ],
  },
  tech: {
    label: "Technologies and Approvals",
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
  about: {
    label: "About Catenate",
    items: [
      "Company overview",
      "Principals and partnerships",
      "Network and regional branches",
      "Quality and HSE compliance",
      "Careers",
      "Request a specification",
      "Branch directory",
      "Become a partner",
    ],
  },
};

export const HERO_STATS = [
  { value: "38", label: "Markets served" },
  { value: "4", label: "Regions" },
  { value: "13", label: "Brands represented" },
  { value: "14", label: "Industries supplied" },
];

export const PRESENCE_STATS = [
  { value: 38, suffix: "", label: "Markets served" },
  { value: 14, suffix: "", label: "Industries supplied" },
  { value: 500, suffix: "+", label: "Product lines stocked" },
  { value: 1500, suffix: "+", label: "Satisfied customers" },
];

export const REGIONS_DATA = [
  { id: 0, n: "Oman", pts: [[41, 12], [42, 13]], desc: "Central Distribution & Head Office" },
  { id: 1, n: "UAE", pts: [[40, 11], [38, 10]], desc: "Regional Warehousing & Tech Center" },
  { id: 2, n: "Qatar", pts: [[39, 9], [36, 14]], desc: "Major Infrastructure Supply" },
  { id: 3, n: "UK", pts: [[31, 6], [33, 7]], desc: "European Operations & Sourcing" },
];

export const LAND_MATRIX: number[][][] = [
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

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 0,
    n: "Building and infrastructure",
    c: "Podium decks, basements, wet areas and facades under long warranty periods.",
    f: ["Waterproofing systems", "Tiling and flooring", "Concrete repair", "Sealants"],
    p: "Mixed-use podium, 42,000 m² deck",
    image: "https://picsum.photos/seed/catenateind0/1200/800",
  },
  {
    id: 1,
    n: "Marine and offshore",
    c: "Constant salt exposure, movement and coating windows measured in hours.",
    f: ["Metal pretreatment", "Structural adhesives", "PU sealants"],
    p: "Port container terminal, phase two",
    image: "https://picsum.photos/seed/catenateind1/1200/800",
  },
  {
    id: 2,
    n: "Oil, gas and petrochemical",
    c: "Chemical attack, thermal cycling and permit-controlled application.",
    f: ["Protective coatings", "Structural repair mortars", "Thread lockers"],
    p: "Tank farm bund lining refurbishment",
    image: "https://picsum.photos/seed/catenateind2/1200/800",
  },
  {
    id: 3,
    n: "Water and wastewater",
    c: "Potable contact approval and immersion performance are non-negotiable.",
    f: ["Liquid membranes", "Pipe joining adhesives", "Repair mortars"],
    p: "Reservoir roof and joint replacement",
    image: "https://picsum.photos/seed/catenateind3/1200/800",
  },
  {
    id: 4,
    n: "Food and beverage",
    c: "Washdown temperatures, hygiene classification and food-contact compliance.",
    f: ["Resin flooring", "Hygienic sealants", "Water-based adhesives"],
    p: "Dairy processing hall, 8,600 m²",
    image: "https://picsum.photos/seed/catenateind4/1200/800",
  },
  {
    id: 5,
    n: "Packaging and converting",
    c: "Line speed decides the adhesive before anything else does.",
    f: ["Hot melt adhesives", "Water-based adhesives"],
    p: "Carton line changeover, three plants",
    image: "https://picsum.photos/seed/catenateind5/1200/800",
  },
  {
    id: 6,
    n: "Automotive and transport",
    c: "Bonded assemblies replacing mechanical fixing, with pretreatment to match.",
    f: ["Structural adhesives", "Metal pretreatment", "Threadlocking"],
    p: "Bus body assembly programme",
    image: "https://picsum.photos/seed/catenateind6/1200/800",
  },
  {
    id: 7,
    n: "Metals and fabrication",
    c: "Cleaning, forming and coating handled as one sequence, not three purchases.",
    f: ["Bonderite pretreatment", "Anaerobic adhesives", "Lubricants"],
    p: "Galvanising line pretreatment upgrade",
    image: "https://picsum.photos/seed/catenateind7/1200/800",
  },
  {
    id: 8,
    n: "Furniture and woodworking",
    c: "Edge, panel and assembly bonding with finish quality visible on day one.",
    f: ["Hot melt adhesives", "Water-based adhesives", "Construction adhesives"],
    p: "Contract furniture facility",
    image: "https://picsum.photos/seed/catenateind8/1200/800",
  },
  {
    id: 9,
    n: "Electronics and assembly",
    c: "Small bond lines, fast fixture times and controlled outgassing.",
    f: ["Cyanoacrylates", "Threadlockers", "Specialty adhesives"],
    p: "Control panel assembly line",
    image: "https://picsum.photos/seed/catenateind9/1200/800",
  },
  {
    id: 10,
    n: "Footwear and leather",
    c: "Flexibility and peel strength after thousands of cycles.",
    f: ["Water-based adhesives", "Contact adhesives"],
    p: "Footwear plant bonding trial",
    image: "https://picsum.photos/seed/catenateind10/1200/800",
  },
  {
    id: 11,
    n: "HVAC and plumbing",
    c: "Pipe joining, pressure testing windows and potable water approval.",
    f: ["Tangit solvent cement", "EZ-Weld cements", "Thread sealants"],
    p: "District cooling network extension",
    image: "https://picsum.photos/seed/catenateind11/1200/800",
  },
  {
    id: 12,
    n: "Healthcare and life sciences",
    c: "Low emission, cleanable surfaces and documented compliance.",
    f: ["Resin flooring", "Low-VOC sealants", "Hygienic systems"],
    p: "Hospital theatre block fit-out",
    image: "https://picsum.photos/seed/catenateind12/1200/800",
  },
  {
    id: 13,
    n: "Retail and fit-out",
    c: "Short programmes, fast cure and finishes that survive footfall.",
    f: ["Tile adhesives", "Levelling compounds", "Construction adhesives"],
    p: "Mall refurbishment, 60 units",
    image: "https://picsum.photos/seed/catenateind13/1200/800",
  },
];

export const BRANDS_DATA: BrandItem[] = [
  {
    n: "Henkel",
    d: "Umbrella principal across construction, industrial and consumer bonding",
    c: "9 families",
    groups: [
      {
        t: "Construction systems",
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
        t: "Industrial",
        items: [
          "Technomelt hot melt",
          "Aquence water-based",
          "Bonderite pretreatment",
          "Bonderite cleaning",
          "Bonderite coating",
        ],
      },
      {
        t: "Specialty and trade",
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
    n: "Weld-On",
    d: "Solvent cement systems for pressure pipework",
    c: "1 family",
    groups: [
      {
        t: "EZ-Weld",
        items: ["UPVC cements", "CPVC cements", "Primers and cleaners", "Pipe lubricants"],
      },
    ],
  },
  {
    n: "Würth",
    d: "Fixings, tools and building chemicals for the working site",
    c: "7 families",
    groups: [
      {
        t: "Fixing",
        items: ["Chemical anchors", "Mechanical anchors", "Screws and fasteners", "Direct fastening"],
      },
      {
        t: "Tools",
        items: ["Hand tools", "Power tools", "Abrasives and accessories"],
      },
      {
        t: "Chemicals and safety",
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
    n: "GE Sealants",
    d: "Silicone and polyurethane sealing for envelope and interior",
    c: "3 families",
    groups: [
      {
        t: "Range",
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
    n: "Sika",
    d: "Concrete, waterproofing and building-finish systems for refurbishment and new build",
    c: "8 families",
    groups: [
      {
        t: "Structural",
        items: [
          "Refurbishment: grouting, anchoring and structural strengthening",
          "Concrete repair and protection",
          "Concrete admixtures and cement additives",
        ],
      },
      {
        t: "Waterproofing and roofing",
        items: [
          "Liquid-applied and injection waterproofing",
          "Joint waterproofing and sheet membrane",
          "Single-ply and bituminous roof membranes",
        ],
      },
      {
        t: "Flooring and sealing",
        items: [
          "Industrial coating and decorative floor systems",
          "Construction adhesives and expansion foam",
          "Firestop systems",
        ],
      },
      {
        t: "Facade and finishing",
        items: [
          "Hygienic and interior wall coatings",
          "Facade mortars and protection",
          "Tiling systems and external wall insulation",
        ],
      },
    ],
  },
];

export const TECHS_DATA: TechItem[] = [
  {
    n: "Bituminous and liquid-applied membranes",
    d: "Waterproofing that has to survive burial, ponding and movement for the design life of the structure. Selection turns on whether the deck is trafficked, whether the membrane is bonded or loose-laid, and how much detailing sits around penetrations.",
    s: [
      ["Service temperature", "−20 to +90 °C"],
      ["Cure mechanism", "Heat fusion or moisture cure"],
      ["Substrate", "Concrete, screed, metal deck"],
      ["Application", "Torch, roller, spray"],
    ],
  },
  {
    n: "Polyurethane and silicone sealants",
    d: "Movement joints, glazing perimeters and sanitary junctions. The governing figure is movement accommodation factor, followed by whether the joint will be painted and whether it sees standing water.",
    s: [
      ["Service temperature", "−40 to +120 °C"],
      ["Cure mechanism", "Moisture cure"],
      ["Substrate", "Concrete, glass, aluminium, PVC"],
      ["Application", "Cartridge and sausage gun"],
    ],
  },
  {
    n: "Cyanoacrylate and anaerobic adhesives",
    d: "Fast fixture on close-fitting parts, and controlled locking on threaded assemblies. Gap fill and material pairing decide the grade far more than headline strength figures do.",
    s: [
      ["Service temperature", "−55 to +150 °C"],
      ["Cure mechanism", "Anaerobic or surface moisture"],
      ["Substrate", "Metals, elastomers, plastics"],
      ["Application", "Drop, bead, wicking"],
    ],
  },
  {
    n: "Hot melt and water-based adhesives",
    d: "Production bonding where the line speed sets the specification. Open time, set time and heat resistance are balanced against substrate porosity and the temperature the finished pack will see.",
    s: [
      ["Service temperature", "−10 to +80 °C"],
      ["Cure mechanism", "Cooling or water evaporation"],
      ["Substrate", "Board, paper, film, wood"],
      ["Application", "Slot, wheel, spray, roller"],
    ],
  },
];

export const APPS_DATA = [
  "Waterproofing",
  "Tiling",
  "Flooring",
  "Concrete repair",
  "Pipe joining",
  "Sealing and glazing",
  "Metal pretreatment",
  "Industrial assembly",
  "Fastening and tools",
];

export const CONDS_DATA = [
  "Submerged",
  "External exposed",
  "Internal wet",
  "High traffic",
  "High temperature",
  "Potable water contact",
  "Food contact",
];

export const SYSTEMS_DATA: Record<string, SystemRecommendation> = {
  Waterproofing: {
    std: "EN 13707 / EN 14891",
    steps: [
      ["Substrate repair", "Polybit structural repair mortar", "Henkel"],
      ["Primer", "Polybit bituminous primer", "Henkel"],
      ["Membrane", "Polybit torch-applied membrane", "Henkel"],
      ["Detailing", "Polybit sealing tape and PU sealant", "Henkel"],
      ["Protection", "Polybit protection board", "Henkel"],
    ],
  },
  Tiling: {
    std: "EN 12004 / EN 13888",
    steps: [
      ["Surface preparation", "Ceresit primer", "Henkel"],
      ["Levelling", "Ceresit levelling compound", "Henkel"],
      ["Adhesive", "Ceresit CM flexible adhesive", "Henkel"],
      ["Grout", "Ceresit CE epoxy grout", "Henkel"],
      ["Perimeter seal", "GE sanitary silicone", "GE Sealants"],
    ],
  },
  Flooring: {
    std: "EN 13813",
    steps: [
      ["Preparation", "Mechanical profiling and repair mortar", "Henkel"],
      ["Primer", "Polybit epoxy primer", "Henkel"],
      ["Body coat", "Polybit resin flooring system", "Henkel"],
      ["Topcoat", "Polybit epoxy or PU topcoat", "Henkel"],
      ["Joints", "Loctite PU joint sealant", "Henkel"],
    ],
  },
  "Concrete repair": {
    std: "EN 1504",
    steps: [
      ["Preparation", "Breakout and reinforcement cleaning", "Henkel"],
      ["Bond coat", "Polybit bonding primer", "Henkel"],
      ["Repair mortar", "Polybit structural repair mortar", "Henkel"],
      ["Protection", "Polybit protective coating", "Henkel"],
    ],
  },
  "Pipe joining": {
    std: "EN 14680 / ASTM D2564",
    steps: [
      ["Cleaning", "EZ-Weld cleaner", "Weld-On"],
      ["Priming", "EZ-Weld primer", "Weld-On"],
      ["Solvent cement", "Tangit or EZ-Weld cement", "Henkel / Weld-On"],
      ["Thread sealing", "Loctite thread sealant", "Henkel"],
    ],
  },
  "Sealing and glazing": {
    std: "EN 15651 / ISO 11600",
    steps: [
      ["Cleaning", "Surface cleaner and activator", "Würth"],
      ["Backer", "Closed cell backer rod", "Würth"],
      ["Sealant", "GE weather sealant", "GE Sealants"],
      ["Interior joints", "Polybit hybrid sealant", "Henkel"],
    ],
  },
  "Metal pretreatment": {
    std: "ISO 12944",
    steps: [
      ["Cleaning", "Bonderite alkaline cleaner", "Henkel"],
      ["Conversion", "Bonderite conversion coating", "Henkel"],
      ["Rinse and dry", "Bonderite process chemistry", "Henkel"],
      ["Bonding or coating", "Loctite structural adhesive", "Henkel"],
    ],
  },
  "Industrial assembly": {
    std: "ISO 10365",
    steps: [
      ["Surface preparation", "Bonderite cleaner", "Henkel"],
      ["Structural bond", "Loctite structural adhesive", "Henkel"],
      ["Threadlocking", "Loctite anaerobic threadlocker", "Henkel"],
      ["Line bonding", "Technomelt hot melt", "Henkel"],
    ],
  },
  "Fastening and tools": {
    std: "ETA assessed",
    steps: [
      ["Drilling and cleaning", "Würth tooling and blow-out pump", "Würth"],
      ["Chemical anchor", "Würth injection resin", "Würth"],
      ["Mechanical anchor", "Würth through-bolt", "Würth"],
      ["Protection", "Würth corrosion protection", "Würth"],
    ],
  },
};

export const COND_NOTES: Record<string, string> = {
  Submerged: "Specify the immersion-grade variant and extend the cure window before filling.",
  "External exposed": "Confirm UV stability and add the protective topcoat where the surface stays visible.",
  "Internal wet": "Use the flexible and sanitary grades throughout, with taped junctions at every change of plane.",
  "High traffic": "Step up to the heavy-duty topcoat and specify the wider movement joints.",
  "High temperature": "Check the upper service limit against the peak surface temperature, not the ambient.",
  "Potable water contact": "Only the approved variants may be used. Certificates must accompany the delivery.",
  "Food contact": "Select the food-contact compliant grades and confirm the hygiene classification with the operator.",
};

export const CERTS_OWN: CertificateItem[] = [
  {
    c: "ISO 9001:2015",
    n: "Quality management system",
    b: "Accredited certification body",
    s: "Sourcing, storage, distribution and technical support.",
    v: "2027",
  },
  {
    c: "ISO 45001:2018",
    n: "Occupational health and safety",
    b: "Accredited certification body",
    s: "Warehouse, logistics and site attendance activities.",
    v: "2027",
  },
  {
    c: "ISO 14001:2015",
    n: "Environmental management",
    b: "Accredited certification body",
    s: "Storage and handling of chemical products.",
    v: "2028",
  },
  {
    c: "TL-000000",
    n: "Trade licence",
    b: "Local authority",
    s: "Trading in construction chemicals and industrial adhesives.",
    v: "Annual",
  },
  {
    c: "AD-HENKEL",
    n: "Authorised distributor",
    b: "Henkel",
    s: "Polybit, Ceresit, Loctite, Technomelt, Aquence, Bonderite, Pattex, Tangit, Metylan.",
    v: "2027",
  },
  {
    c: "AD-WELDON",
    n: "Authorised distributor",
    b: "Weld-On",
    s: "EZ-Weld solvent cement range.",
    v: "2027",
  },
  {
    c: "AD-WURTH",
    n: "Authorised distributor",
    b: "Würth",
    s: "Fixings, tools, building chemicals and safety.",
    v: "2027",
  },
  {
    c: "AD-GE",
    n: "Authorised distributor",
    b: "GE Sealants",
    s: "Silicone and polyurethane sealant range.",
    v: "2027",
  },
];

export const CERTS_PRINCIPAL: CertificateItem[] = [
  {
    c: "CD-APPROVED",
    n: "Civil defence approval",
    b: "Civil defence authority",
    s: "Waterproofing and fire-rated sealant systems.",
    v: "Under renewal",
  },
  {
    c: "AGRÉMENT",
    n: "Agrément certificate",
    b: "Technical approvals body",
    s: "Liquid-applied and sheet membrane systems.",
    v: "2029",
  },
  {
    c: "EN 13707",
    n: "Sheet membrane performance",
    b: "Notified body",
    s: "Reinforced bitumen membranes for roof waterproofing.",
    v: "Ongoing",
  },
  {
    c: "EN 14891",
    n: "Liquid membrane performance",
    b: "Notified body",
    s: "Liquid-applied membranes under ceramic tiling.",
    v: "Ongoing",
  },
  {
    c: "POTABLE",
    n: "Potable water contact",
    b: "Water regulatory body",
    s: "Pipe cements and coatings in contact with drinking water.",
    v: "2028",
  },
  {
    c: "EN 13501-1",
    n: "Reaction to fire",
    b: "Notified body",
    s: "Classification of membranes and insulation build-ups.",
    v: "Ongoing",
  },
  {
    c: "LOW-VOC",
    n: "Low emission certification",
    b: "Indoor air quality scheme",
    s: "Adhesives, sealants and flooring for occupied interiors.",
    v: "2027",
  },
  {
    c: "FOOD-CONTACT",
    n: "Food contact compliance",
    b: "Regulatory framework",
    s: "Adhesives used in food packaging and processing areas.",
    v: "Ongoing",
  },
];

export const CLIENTELE_DATA = [
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

export const STRENGTHS_DATA = [
  {
    title: "An international legacy",
    description: "Decades of brand equity built across the Middle East and Europe, carried into every market we now serve.",
  },
  {
    title: "Range built for the extremes",
    description: "A catalogue deep enough to answer conditions ordinary systems were never built to survive.",
  },
  {
    title: "1,500+ customers, and rising",
    description: "A customer base that keeps compounding, the clearest proof a supply chain is holding.",
  },
  {
    title: "15 years of market intelligence",
    description: "Product knowledge that goes deeper than a data sheet, built one specification at a time.",
  },
  {
    title: "An integrity-led team",
    description: "People who treat every specification as their own, long after the delivery note is signed.",
  },
  {
    title: "Capability, proven on site",
    description: "Technical claims validated in person, through joint site visits with the principals whose names we carry.",
  },
  {
    title: "Class-A clientele",
    description: "Trusted by global MNCs and class-A developers who specify Catenate by name, not by default.",
  },
  {
    title: "Testing on every continent",
    description: "Performance validated in our own laboratories, wherever in the world the work is happening.",
  },
];

export const WHY_POINTS = [
  {
    num: 1,
    title: "Compatible by system, not by shelf",
    description: "Primer, membrane, screed and adhesive are selected as one chain so nothing fails at an interface.",
  },
  {
    num: 2,
    title: "Held stock across the full range",
    description: "Depth in the fast-moving lines and access to the specialist ones, released against programme.",
  },
  {
    num: 3,
    title: "Approvals carried, not claimed",
    description: "Every system supplied arrives with its certificates, test reports and data sheets in order.",
  },
  {
    num: 4,
    title: "On site before the first coat",
    description: "Substrate readings, mock-ups and applicator briefings ahead of application, not after a defect.",
  },
  {
    num: 5,
    title: "One accountable line",
    description: "A single point of responsibility across four principals and more than a dozen product families.",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    n: "Harbour terminal deck",
    s: "Marine and offshore",
    y: "Torch-applied membrane and protection build-up",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop",
  },
  {
    n: "Dairy processing hall",
    s: "Food and beverage",
    y: "Resin flooring with hygienic coving and sealants",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
  },
  {
    n: "Mixed-use podium",
    s: "Building and infrastructure",
    y: "Fully Bonded System across 42,000 m²",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    n: "District cooling network",
    s: "HVAC and plumbing",
    y: "Solvent cement jointing and thread sealing",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
  },
  {
    n: "Hospital theatre block",
    s: "Healthcare and life sciences",
    y: "Low-emission flooring and sealant package",
    img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
  },
  {
    n: "Galvanising line",
    s: "Metals and fabrication",
    y: "Bonderite pretreatment sequence",
    img: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
  },
];

export const TECHNICAL_SUPPORT_ITEMS = [
  {
    title: "Site inspection",
    description: "Substrate moisture, pull-off and surface profile readings taken before a system is confirmed.",
  },
  {
    title: "System specification",
    description: "Written build-ups with product references, consumption rates and sequence for the main contractor.",
  },
  {
    title: "Applicator training",
    description: "Hands-on sessions with the applying crew, run on the actual substrate where possible.",
  },
  {
    title: "Toolbox talks",
    description: "Short site briefings on mixing ratios, overcoat windows and safe handling before each phase.",
  },
];

export const ASSEMBLIES_DATA: AssemblyItem[] = [
  {
    id: "podium",
    name: "Podium deck",
    layers: [
      { n: "Paving or tile finish", p: "Ceresit CM tile adhesive and CE grout", h: 26, f: "bl-body" },
      { n: "Bedding screed", p: "Ceresit levelling screed", h: 22, f: "bl-hatch" },
      { n: "Protection and drainage board", p: "Polybit protection board", h: 16, f: "bl-body" },
      { n: "Waterproofing membrane", p: "Polybit torch-applied bituminous membrane", h: 20, f: "bl-solid" },
      { n: "Primer", p: "Polybit bituminous primer", h: 10, f: "bl-body" },
      { n: "Structural slab", p: "Substrate preparation and repair mortar", h: 44, f: "bl-hatch" },
    ],
  },
  {
    id: "wet",
    name: "Wet area",
    layers: [
      { n: "Tile finish", p: "Ceresit CM 17 flexible adhesive", h: 22, f: "bl-body" },
      { n: "Joint sealing", p: "Polybit hybrid sanitary sealant", h: 12, f: "bl-solid" },
      { n: "Liquid membrane", p: "Polybit liquid-applied waterproofing", h: 18, f: "bl-solid" },
      { n: "Reinforcing tape at junctions", p: "Polybit sealing tape", h: 10, f: "bl-body" },
      { n: "Primer", p: "Ceresit water-based primer", h: 10, f: "bl-body" },
      { n: "Screed substrate", p: "Ceresit levelling compound", h: 38, f: "bl-hatch" },
    ],
  },
  {
    id: "basement",
    name: "Basement tanking",
    layers: [
      { n: "Protection screed", p: "Ceresit protective screed", h: 24, f: "bl-hatch" },
      { n: "Drainage layer", p: "Polybit drainage sheet", h: 16, f: "bl-body" },
      { n: "Sheet membrane, second ply", p: "Polybit sheet membrane", h: 16, f: "bl-solid" },
      { n: "Sheet membrane, first ply", p: "Polybit sheet membrane", h: 16, f: "bl-solid" },
      { n: "Primer", p: "Polybit bituminous primer", h: 10, f: "bl-body" },
      { n: "Blinding and repair", p: "Polybit structural repair mortar", h: 42, f: "bl-hatch" },
    ],
  },
  {
    id: "floor",
    name: "Industrial floor",
    layers: [
      { n: "Resin topcoat", p: "Polybit epoxy floor topcoat", h: 14, f: "bl-solid" },
      { n: "Broadcast aggregate body", p: "Polybit resin flooring system", h: 22, f: "bl-body" },
      { n: "Resin primer", p: "Polybit epoxy primer", h: 10, f: "bl-body" },
      { n: "Levelling and repair", p: "Ceresit levelling compound", h: 24, f: "bl-hatch" },
      { n: "Movement joint sealing", p: "Loctite PU joint sealant", h: 12, f: "bl-solid" },
      { n: "Concrete slab", p: "Surface preparation and profiling", h: 46, f: "bl-hatch" },
    ],
  },
];
