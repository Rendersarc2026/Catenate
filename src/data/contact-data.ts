export interface ContactBranch {
  id: string;
  city: string;
  name: string;
  tag: string;
  address: string[];
  phone: string;
  whatsapp: string;
  email: string;
  hours: string;
  map: string;
}

export interface ContactLocation {
  id: string;
  country: string;
  label: string;
  region: string;
  branches: ContactBranch[];
}

export const CONTACT_LOCATIONS: ContactLocation[] = [
  {
    id: "oman",
    country: "Oman",
    label: "Oman",
    region: "Middle East",
    branches: [
      {
        id: "muscat",
        city: "Muscat",
        name: "Catenate — Muscat",
        tag: "Head office & central warehouse",
        address: [
          "Gulf Modern Projects & Supplies Co. LLC",
          "106, 1st Floor, Muscat Residence Building",
          "Al Seeb Street",
          "PO Box 378, PC 124",
          "Muscat, Oman",
        ],
        phone: "+968 9133 8027",
        whatsapp: "+968 9133 8027",
        email: "shinusam@gmpsco.com",
        hours: "Sun – Thu · 8:00 – 18:00",
        map: "Muscat Residence Building, Al Seeb Street, Muscat, Oman",
      },
    ],
  },
  {
    id: "uae",
    country: "United Arab Emirates",
    label: "UAE – Dubai",
    region: "Middle East",
    branches: [
      {
        id: "dubai-1",
        city: "Dubai",
        name: "Catenate — Dubai",
        tag: "Branch & technical centre",
        address: [
          "Gulf Supplies & Trading Co LLC",
          "Office No. 613 & 614, Arenco Building No. 04",
          "Dubai Investment Park 1",
          "Dubai, United Arab Emirates",
        ],
        phone: "+971 56 993 6370",
        whatsapp: "+971 56 993 6370",
        email: "prasanth@gmpsco.com",
        hours: "Mon – Sat · 8:00 – 18:00",
        map: "Arenco Building, Dubai Investment Park 1, Dubai",
      },
      {
        id: "dubai-2",
        city: "Dubai",
        name: "Catenate — Jebel Ali",
        tag: "Stock & dispatch",
        address: [
          "Unit 00, Jebel Ali Free Zone",
          "Dubai, United Arab Emirates",
        ],
        phone: "+971 4 000 0000",
        whatsapp: "+971 50 000 0000",
        email: "dubai@catenate.com",
        hours: "Mon – Sat · 7:30 – 17:30",
        map: "Jebel Ali Free Zone, Dubai",
      },
    ],
  },
  {
    id: "qatar",
    country: "Qatar",
    label: "Qatar",
    region: "Middle East",
    branches: [
      {
        id: "doha",
        city: "Doha",
        name: "Catenate — Doha",
        tag: "Regional branch",
        address: [
          "Gulf Supplies & Trading Co LLC",
          "c/o Al Talib Qatar Shipping Co. WLL",
          "Building No. 17, Door 10, Gate 1 or 2",
          "GWC Bu Sulba, Birkat Al Awamer",
          "Wukair, Doha, Qatar",
        ],
        phone: "+971 56 993 6370",
        whatsapp: "+971 56 993 6370",
        email: "prasanth@gmpsco.com",
        hours: "Sun – Thu · 7:00 – 11:30 & 13:30 – 16:00",
        map: "GWC Bu Sulba, Birkat Al Awamer, Doha, Qatar",
      },
    ],
  },
  {
    id: "uk",
    country: "United Kingdom",
    label: "United Kingdom",
    region: "Europe",
    branches: [
      {
        id: "uk",
        city: "London",
        name: "Catenate — United Kingdom",
        tag: "European hub",
        address: ["Unit 00, Business Park", "London, United Kingdom"],
        phone: "+44 20 0000 0000",
        whatsapp: "+44 7000 000000",
        email: "uk@catenate.com",
        hours: "Mon – Fri · 9:00 – 17:30",
        map: "London, United Kingdom",
      },
    ],
  },
];

export const CONTACT_SERVICES = [
  "Local stock",
  "On-site technical support",
  "Principal brands stocked",
] as const;

export const formatTel = (n: string) => "tel:" + n.replace(/[^\d+]/g, "");
export const formatWhatsApp = (n: string) => "https://wa.me/" + n.replace(/\D/g, "");
export const formatDirections = (q: string) =>
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
export const formatMapEmbed = (q: string) =>
  "https://maps.google.com/maps?q=" + encodeURIComponent(q) + "&z=13&output=embed";
