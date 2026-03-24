/** Fallback copy when Sanity is unset or unavailable. Keep in sync with `siteSettings` in the Studio schema. */

export type SessionKind = "kids" | "adults";

export interface ClassSession {
  kind: SessionKind;
  label: string;
  time: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface SiteContent {
  siteName: string;
  tagline: string;
  heroLead: string;
  aboutParagraphs: string[];
  classTypes: {
    gi: { label: string; description: string; days: string };
    noGi: { label: string; description: string; days: string };
  };
  scheduleSessions: ClassSession[];
  businessHours: { days: string; hours: string }[];
  testimonials: Testimonial[];
  contact: {
    phoneDisplay: string;
    phoneTel: string;
    email: string;
    addressLines: string[];
    mapsUrl: string;
    websiteUrl: string;
    instagramUrl: string;
  };
}

export const fallbackSiteContent: SiteContent = {
  siteName: "Flo Roll Jiu-Jitsu",
  tagline: "Brazilian Jiu-Jitsu for Every Body",
  heroLead:
    "Train under a 1st-degree black belt in Rickson Gracie's lineage. Gi and No-Gi classes for kids and adults — right here in North Ridgeville. Your first two weeks are free.",
  aboutParagraphs: [
    "Flo Roll Jiu-Jitsu is led by Professor Juan Corral, a first-degree Brazilian Jiu-Jitsu black belt under Luis \"Limão\" Heredia — one of Rickson Gracie's first black belts. With 22 years of experience on and off the mats and a background as a U.S. Marine Corps veteran, Professor Corral brings discipline, dedication, and heart to every class.",
    "Our classes teach practical self-defense, build genuine confidence, and foster character for men, women, and youth. Whether you are stepping onto the mat for the first time or looking to sharpen your skills, you are welcome here. Your first two weeks are free.",
  ],
  classTypes: {
    gi: {
      label: "Gi",
      description:
        "Traditional kimono training — grips, control, and technique with the gi.",
      days: "Mondays & Wednesdays (Kids + Adults) · Tuesdays & Thursdays (Kids 12–15)",
    },
    noGi: {
      label: "No-Gi",
      description:
        "Grappling without the gi — speed, wrestling ties, and fluid transitions.",
      days: "Tuesdays & Thursdays",
    },
  },
  scheduleSessions: [
    { kind: "kids", label: "Kids (Ages 6–11)", time: "4:45 pm – 5:45 pm" },
    { kind: "kids", label: "Kids (Ages 12–15)", time: "4:45 pm – 5:45 pm" },
    { kind: "adults", label: "Adults", time: "6:00 pm – 7:00 pm" },
  ],
  businessHours: [
    { days: "Monday – Thursday", hours: "4:30 pm – 7:30 pm" },
    { days: "Friday – Sunday", hours: "Closed" },
  ],
  testimonials: [
    {
      quote:
        "Professor Corral is the real deal. His passion for jiu-jitsu and for his students is evident from day one. My kids have gained confidence and discipline they carry into everything they do.",
      name: "Melissa R.",
      role: "Parent",
    },
    {
      quote:
        "I walked in nervous on my first class and left feeling welcomed. The instruction is technical, the vibe is zero ego. Best decision I made this year.",
      name: "Marcus T.",
      role: "Adult Student",
    },
    {
      quote:
        "My son is 8 and has completely transformed. He's more focused in school, more confident with other kids, and he actually asks to go to class.",
      name: "David K.",
      role: "Parent",
    },
  ],
  contact: {
    phoneDisplay: "(216) 290-9352",
    phoneTel: "+12162909352",
    email: "jncorral76@gmail.com",
    addressLines: [
      "32660 Center Ridge Road",
      "North Ridgeville, Ohio 44039",
      "United States",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=32660+Center+Ridge+Road%2C+North+Ridgeville%2C+OH+44039",
    websiteUrl: "https://www.florolljiu-jitsu.com/",
    instagramUrl: "https://www.instagram.com/florolljiu_jitsu/",
  },
};
