import { fallbackSiteContent, type ClassSession, type SiteContent } from "../data/siteContent";
import { getSanityClient } from "./sanityClient";

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  tagline,
  heroLead,
  aboutParagraphs,
  classGi,
  classNoGi,
  scheduleSessions,
  businessHours,
  contact
}`;

type UnknownRecord = Record<string, unknown>;

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.length > 0;
}

function str(v: unknown, fallback: string): string {
  return isNonEmptyString(v) ? v : fallback;
}

function mergeContact(raw: unknown): SiteContent["contact"] {
  const fb = fallbackSiteContent.contact;
  if (!raw || typeof raw !== "object") return fb;
  const c = raw as UnknownRecord;
  const lines = c.addressLines;
  const addressLines =
    Array.isArray(lines) && lines.every((x) => typeof x === "string")
      ? (lines as string[])
      : fb.addressLines;
  return {
    phoneDisplay: str(c.phoneDisplay, fb.phoneDisplay),
    phoneTel: str(c.phoneTel, fb.phoneTel),
    email: str(c.email, fb.email),
    addressLines,
    mapsUrl: str(c.mapsUrl, fb.mapsUrl),
    websiteUrl: str(c.websiteUrl, fb.websiteUrl),
    instagramUrl: str(c.instagramUrl, fb.instagramUrl),
  };
}

function mergeClassBlock(
  raw: unknown,
  fallback: SiteContent["classTypes"]["gi"]
): SiteContent["classTypes"]["gi"] {
  if (!raw || typeof raw !== "object") return fallback;
  const o = raw as UnknownRecord;
  return {
    label: str(o.label, fallback.label),
    description: str(o.description, fallback.description),
    days: str(o.days, fallback.days),
  };
}

function mergeSessions(raw: unknown): ClassSession[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallbackSiteContent.scheduleSessions;
  const out: ClassSession[] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const o = row as UnknownRecord;
    const kind = o.kind === "kids" || o.kind === "adults" ? o.kind : null;
    if (!kind || !isNonEmptyString(o.label) || !isNonEmptyString(o.time)) continue;
    out.push({ kind, label: o.label, time: o.time });
  }
  return out.length ? out : fallbackSiteContent.scheduleSessions;
}

function mergeHours(raw: unknown): SiteContent["businessHours"] {
  if (!Array.isArray(raw) || raw.length === 0) return fallbackSiteContent.businessHours;
  const out: SiteContent["businessHours"] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const o = row as UnknownRecord;
    if (!isNonEmptyString(o.days) || !isNonEmptyString(o.hours)) continue;
    out.push({ days: o.days, hours: o.hours });
  }
  return out.length ? out : fallbackSiteContent.businessHours;
}

function mergeParagraphs(raw: unknown): string[] {
  if (!Array.isArray(raw) || raw.length === 0) return fallbackSiteContent.aboutParagraphs;
  const out = raw.filter((x): x is string => typeof x === "string" && x.length > 0);
  return out.length ? out : fallbackSiteContent.aboutParagraphs;
}

function mapSanityDoc(doc: UnknownRecord): SiteContent | null {
  if (!isNonEmptyString(doc.siteName)) return null;
  const fb = fallbackSiteContent;
  return {
    siteName: doc.siteName,
    tagline: str(doc.tagline, fb.tagline),
    heroLead: str(doc.heroLead, fb.heroLead),
    aboutParagraphs: mergeParagraphs(doc.aboutParagraphs),
    classTypes: {
      gi: mergeClassBlock(doc.classGi, fb.classTypes.gi),
      noGi: mergeClassBlock(doc.classNoGi, fb.classTypes.noGi),
    },
    scheduleSessions: mergeSessions(doc.scheduleSessions),
    businessHours: mergeHours(doc.businessHours),
    testimonials: fallbackSiteContent.testimonials,
    contact: mergeContact(doc.contact),
  };
}

export async function fetchSiteContentFromSanity(): Promise<SiteContent | null> {
  // In dev, the /api serverless functions aren't running — call Sanity directly.
  if (import.meta.env.DEV) {
    const doc = await getSanityClient().fetch<UnknownRecord | null>(SITE_SETTINGS_QUERY);
    if (!doc) return null;
    return mapSanityDoc(doc);
  }
  const res = await fetch("/api/site-content");
  if (!res.ok) return null;
  const doc = (await res.json()) as UnknownRecord | null;
  if (!doc) return null;
  return mapSanityDoc(doc);
}
