/** Fallback copy when Sanity is unset or unavailable. Keep in sync with `siteSettings` in the Studio schema. */

export type SessionKind = "kids" | "adults";

export interface ClassSession {
  kind: SessionKind;
  label: string;
  time: string;
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
  tagline: "Join the Flo Roll Jiu-Jitsu family",
  heroLead:
    "A community-driven academy offering Brazilian Jiu-Jitsu, self-defense, youth development, and fitness-based martial arts — for all ages and skill levels.",
  aboutParagraphs: [
    "We are passionate about Brazilian Jiu-Jitsu and committed to a welcoming environment for everyone who steps on the mats. Authentic technique, personal growth on and off the mats, and a steady focus on discipline and support define how we train.",
    "Students learn at their own pace. Whether you are new to grappling or building on years of experience, the journey stays challenging, supportive, and rewarding.",
  ],
  classTypes: {
    gi: {
      label: "Gi",
      description:
        "Traditional kimono training — grips, control, and technique with the gi.",
      days: "Mondays & Wednesdays",
    },
    noGi: {
      label: "No-Gi",
      description:
        "Grappling without the gi — speed, wrestling ties, and fluid transitions.",
      days: "Tuesdays & Thursdays",
    },
  },
  scheduleSessions: [
    { kind: "kids", label: "Kids", time: "4:45 pm – 5:45 pm" },
    { kind: "adults", label: "Adults", time: "6:00 pm – 7:00 pm" },
  ],
  businessHours: [
    { days: "Monday – Thursday", hours: "4:30 pm – 7:30 pm" },
    { days: "Friday – Sunday", hours: "Closed" },
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
