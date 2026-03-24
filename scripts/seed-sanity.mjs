/**
 * Seeds a sample Gallery document into Sanity (production dataset).
 * Requires SANITY_API_WRITE_TOKEN (or write-capable VITE_SANITY_API_KEY) in .env.local.
 * Run: npm run seed:sanity
 */
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const projectId = process.env.VITE_SANITY_PROJECT_ID?.trim() || "9guj7jch";
const dataset = process.env.VITE_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN?.trim() ||
  process.env.VITE_SANITY_API_KEY?.trim();

if (!token) {
  console.error(
    "Set SANITY_API_WRITE_TOKEN (Editor) or a write-capable VITE_SANITY_API_KEY in .env.local — see .env.example."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-12-01",
  token,
  useCdn: false,
});

async function uploadImage(relativePath, filename) {
  const abs = path.join(root, relativePath);
  const buffer = fs.readFileSync(abs);
  return client.assets.upload("image", buffer, { filename });
}

const GALLERY_ID = "galleryItem-seed-promotion";

async function main() {
  console.log(`Seeding gallery in ${projectId} / ${dataset} …`);

  let assetId;
  const existingGallery = await client.getDocument(GALLERY_ID);
  if (existingGallery?.image?.asset?._ref) {
    assetId = existingGallery.image.asset._ref;
    console.log("Reusing existing image asset from gallery seed document.");
  } else {
    const asset = await uploadImage(
      "src/images/With-Luis-Heredia-promoted-1111-644167b0-1920w.png",
      "flo-roll-promotion.png"
    );
    assetId = asset._id;
    console.log("Uploaded image asset.");
  }

  const imageField = {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt: "Promotion ceremony on the academy mats",
  };

  await client.createOrReplace({
    _id: GALLERY_ID,
    _type: "galleryItem",
    title: "Promotion ceremony",
    caption:
      "On the mats — rank, community, and the long arc of the journey.",
    order: 0,
    image: imageField,
  });
  console.log("Gallery: upserted", GALLERY_ID);

  console.log("Done. Open /gallery on the site (refresh if needed).");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
