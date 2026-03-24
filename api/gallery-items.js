import { getSanityReadClient, sendJson } from "./_sanity.js";

const GALLERY_ITEMS_QUERY = `*[_type == "galleryItem"] | order(order asc, _createdAt asc) {
  _id,
  title,
  caption,
  image
}`;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  try {
    const client = getSanityReadClient();
    const items = await client.fetch(GALLERY_ITEMS_QUERY);
    return sendJson(res, 200, items);
  } catch (error) {
    console.error("gallery-items error", error);
    return sendJson(res, 500, { error: "Failed to load gallery items" });
  }
}
