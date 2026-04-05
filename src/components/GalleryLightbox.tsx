import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GallerySlide {
  fullSrc: string;
  alt: string;
  caption: string | null;
}

type Props = {
  openIndex: number | null;
  slides: GallerySlide[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function GalleryLightbox({
  openIndex,
  slides,
  onClose,
  onPrev,
  onNext,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = openIndex !== null && slides.length > 0;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (slides.length < 2) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, slides.length, onClose, onPrev, onNext]);

  if (!open || openIndex === null) return null;

  const slide = slides[openIndex];
  if (!slide) return null;

  const multi = slides.length > 1;

  return createPortal(
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={slide.alt}
    >
      <button
        type="button"
        className="gallery-lightbox__backdrop"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div className="gallery-lightbox__chrome">
        <button
          ref={closeRef}
          type="button"
          className="gallery-lightbox__close"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={22} strokeWidth={2} aria-hidden />
        </button>
        {multi && (
          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft size={28} strokeWidth={2} aria-hidden />
          </button>
        )}
        <div className="gallery-lightbox__stage">
          <div key={openIndex} className="gallery-lightbox__img-wrap">
            <img
              className="gallery-lightbox__img"
              src={slide.fullSrc}
              alt={slide.alt}
              decoding="async"
            />
          </div>
          {slide.caption && (
            <p className="gallery-lightbox__caption">{slide.caption}</p>
          )}
          {multi && (
            <p className="gallery-lightbox__counter" aria-live="polite">
              {openIndex + 1} / {slides.length}
            </p>
          )}
        </div>
        {multi && (
          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight size={28} strokeWidth={2} aria-hidden />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
}
