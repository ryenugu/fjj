const GALLERY_ITEMS = `*[_type == "galleryItem"] | order(order asc, _createdAt asc) {
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
  const res = await fetch("/api/gallery-items");
  if (!res.ok) return [];
  return (await res.json()) as GalleryItemRow[];
}
