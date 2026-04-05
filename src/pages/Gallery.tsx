import { useCallback, useMemo, useState, useEffect } from "react";
import { ZoomIn } from "lucide-react";
import { GalleryLightbox, type GallerySlide } from "../components/GalleryLightbox";
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

/** Seeded promotion doc — same image as home teaser; needs focal crop for faces */
const GALLERY_PROMOTION_IDS = new Set(["galleryItem-seed-promotion"]);

type PreparedEntry = {
  id: string;
  thumb: string;
  slide: GallerySlide;
};

function thumbImageClass(entry: PreparedEntry): string {
  const alt = entry.slide.alt.toLowerCase();
  const focal =
    GALLERY_PROMOTION_IDS.has(entry.id) ||
    alt.includes("promotion") ||
    alt.includes("promoted");
  return focal ? "gallery-grid__img gallery-grid__img--focal" : "gallery-grid__img";
}

function prepareEntries(items: GalleryItemRow[]): PreparedEntry[] {
  const out: PreparedEntry[] = [];
  for (const item of items) {
    const thumb = urlForImageWidth(item.image, 900);
    if (!thumb) continue;
    const fullSrc = urlForImageWidth(item.image, 1920) ?? thumb;
    const alt = altForItem(item);
    const caption = item.caption?.trim() || item.title?.trim() || null;
    out.push({
      id: item._id,
      thumb,
      slide: { fullSrc, alt, caption },
    });
  }
  return out;
}

export function Gallery() {
  const [items, setItems] = useState<GalleryItemRow[] | null>(null);
  const [error, setError] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const entries = useMemo(
    () => (items ? prepareEntries(items) : []),
    [items]
  );

  const slides = useMemo(
    () => entries.map((e) => e.slide),
    [entries]
  );

  const onCloseLightbox = useCallback(() => setLightboxIndex(null), []);

  const onPrevLightbox = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || slides.length === 0) return null;
      return (i - 1 + slides.length) % slides.length;
    });
  }, [slides.length]);

  const onNextLightbox = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null || slides.length === 0) return null;
      return (i + 1) % slides.length;
    });
  }, [slides.length]);

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-header__title">Gallery</h1>
        <p className="page-header__deck">Moments from training and the community.</p>
      </header>

      {items === null && <p className="page-prose page-prose--muted">Loading gallery…</p>}

      {error && (
        <p className="page-prose page-prose--muted">
          Couldn't load the gallery. Check your connection or Sanity settings.
        </p>
      )}

      {items && items.length === 0 && !error && (
        <RevealSection className="page-block">
          <p className="page-prose">No images yet — check back soon.</p>
        </RevealSection>
      )}

      {entries.length > 0 && (
        <div className="gallery-grid">
          {entries.map((entry, index) => (
            <figure key={entry.id} className="gallery-grid__item">
              <button
                type="button"
                className="gallery-grid__trigger"
                onClick={() => setLightboxIndex(index)}
                aria-haspopup="dialog"
                aria-label={`Open image ${index + 1} of ${entries.length}: ${entry.slide.alt}`}
              >
                <span className="gallery-grid__frame">
                  <img
                    className={thumbImageClass(entry)}
                    src={entry.thumb}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-grid__shine" aria-hidden />
                  <span className="gallery-grid__zoom" aria-hidden>
                    <ZoomIn size={22} strokeWidth={2} />
                  </span>
                </span>
              </button>
              {entry.slide.caption && (
                <figcaption className="gallery-grid__caption">{entry.slide.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <GalleryLightbox
        openIndex={lightboxIndex}
        slides={slides}
        onClose={onCloseLightbox}
        onPrev={onPrevLightbox}
        onNext={onNextLightbox}
      />
    </div>
  );
}
