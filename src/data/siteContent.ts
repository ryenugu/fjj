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
    "Flo Roll Jiu-Jitsu is a community-driven academy rooted in authentic Brazilian Jiu-Jitsu. We are committed to a welcoming environment for everyone who steps on the mats — where technique, personal growth, and mutual respect define how we train.",
    "Our classes develop practical self-defense skills, build genuine confidence, and foster character in men, women, and youth of all levels. Whether you are a complete beginner or an experienced grappler, you will find your place here.",
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
        "Juan is an outstanding Jiu-Jitsu instructor with a wealth of experience, and I highly recommend him",
      name: "Rosy Corral",
      role: "Google review",
    },
    {
      quote:
        "Awesome new place to train! Juan Corral is legit, he received his black belt from Luis Heredia (a legendary Rickson Gracie black belt). I've known and trained with Juan for 5 years from Chagrin Valley jujitsu where he trained and taught. He's a talented teacher for beginners and advanced students of all ages. Highly recommend!",
      name: "Anthony Marra",
      role: "Google review",
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
    websiteUrl: "https://www.florolljj.com/",
    instagramUrl: "https://www.instagram.com/florolljj/",
  },
};
