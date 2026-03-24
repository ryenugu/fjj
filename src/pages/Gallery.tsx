import { useEffect, useState } from "react";
import { RevealSection } from "../components/RevealSection";
import { fetchGalleryItems, type GalleryItemRow } from "../lib/fetchSanityContent";
import { urlForImageWidth } from "../lib/sanityImage";

function altForItem(item: GalleryItemRow): string {
  const img = item.image;
  if (img && typeof img === "object" && img !== null && "alt" in img) {
    const a = (img as { alt?: string }).alt;
    if (typeof a === "string" && a.trim()) return a;
  }
  if (item.title?.trim()) return item.title;
  if (item.caption?.trim()) return item.caption;
  return "Gallery image";
}

export function Gallery() {
  const [items, setItems] = useState<GalleryItemRow[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchGalleryItems()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) {
          setItems([]);
          setError(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">Gallery</h1>
        <p className="page-header__deck">Moments from training and the community.</p>
      </header>

      {items === null && <p className="page-prose page-prose--muted">Loading gallery…</p>}

      {items && items.length === 0 && !error && (
        <RevealSection className="page-block">
          <p className="page-prose">
            No images yet. Add “Gallery image” entries in Sanity Studio and publish.
          </p>
        </RevealSection>
      )}

      {error && items?.length === 0 && (
        <p className="page-prose page-prose--muted">
          Couldn’t load the gallery. Check your connection or Sanity settings.
        </p>
      )}

      {items && items.length > 0 && (
        <div className="gallery-grid">
          {items.map((item) => {
            const src = urlForImageWidth(item.image, 900);
            if (!src) return null;
            const alt = altForItem(item);
            return (
              <figure key={item._id} className="gallery-grid__item">
                <div className="gallery-grid__frame">
                  <img
                    className="gallery-grid__img"
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {(item.caption || item.title) && (
                  <figcaption className="gallery-grid__caption">
                    {item.caption || item.title}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}
