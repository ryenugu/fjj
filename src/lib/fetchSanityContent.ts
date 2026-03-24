import { getSanityClient } from "./sanityClient";

const GALLERY_ITEMS_QUERY = `*[_type == "galleryItem"] | order(order asc, _createdAt asc) {
  _id,
  title,
  caption,
  image
}`;

export interface GalleryItemRow {
  _id: string;
  title: string | null;
  caption: string | null;
  image: unknown;
}

export async function fetchGalleryItems(): Promise<GalleryItemRow[]> {
  // In dev, the /api serverless functions aren't running — call Sanity directly.
  if (import.meta.env.DEV) {
    return getSanityClient().fetch<GalleryItemRow[]>(GALLERY_ITEMS_QUERY);
  }
  const res = await fetch("/api/gallery-items");
  if (!res.ok) return [];
  return (await res.json()) as GalleryItemRow[];
}
