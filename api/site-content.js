import { getSanityReadClient, sendJson } from "./_sanity.js";

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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const client = getSanityReadClient();
    const doc = await client.fetch(SITE_SETTINGS_QUERY);
    return sendJson(res, 200, doc);
  } catch (error) {
    console.error("site-content error", error);
    return sendJson(res, 500, { error: "Failed to load site content" });
  }
}
