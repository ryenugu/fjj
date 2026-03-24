/**
 * Uploads gallery 1.png and gallery 2.png to Sanity as galleryItem documents.
 * Uses SANITY_API_WRITE_TOKEN, falling back to SANITY_READ_TOKEN.
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
  process.env.SANITY_READ_TOKEN?.trim();

if (!token) {
  console.error("No token found. Set SANITY_API_WRITE_TOKEN or SANITY_READ_TOKEN in .env.local.");
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

const items = [
  {
    id: "galleryItem-local-gallery1",
    file: "src/images/gallery 1.png",
    filename: "gallery-1.png",
    title: "Training session",
    caption: "",
    order: 10,
  },
  {
    id: "galleryItem-local-gallery2",
    file: "src/images/gallery 2.png",
    filename: "gallery-2.png",
    title: "Training session",
    caption: "",
    order: 11,
  },
];

async function main() {
  console.log(`Uploading gallery images to ${projectId} / ${dataset} …`);

  for (const item of items) {
    const existing = await client.getDocument(item.id);
    let assetId;

    if (existing?.image?.asset?._ref) {
      assetId = existing.image.asset._ref;
      console.log(`  Reusing existing asset for ${item.filename}`);
    } else {
      const asset = await uploadImage(item.file, item.filename);
      assetId = asset._id;
      console.log(`  Uploaded ${item.filename} → ${assetId}`);
    }

    await client.createOrReplace({
      _id: item.id,
      _type: "galleryItem",
      title: item.title,
      caption: item.caption,
      order: item.order,
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
        alt: item.title,
      },
    });
    console.log(`  Upserted document ${item.id}`);
  }

  console.log("\nDone. Refresh /gallery on the site.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
