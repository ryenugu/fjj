import { useCallback, useState } from "react";
import { CalendarDays, Flame, Images, MapPin, Shield, Users, Zap, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import { GalleryLightbox, type GallerySlide } from "../components/GalleryLightbox";
import { RevealSection } from "../components/RevealSection";
import { useSiteContent } from "../context/SiteContentContext";
import imgAcademy from "../images/Haleakala+3-1920w.png";
import imgGallery1 from "../images/gallery 1.png";
import imgGallery2 from "../images/gallery 2.png";
import imgPromotion from "../images/With-Luis-Heredia-promoted-1111-644167b0-1920w.png";
import imgJuan from "../images/Juan.png";

const benefits = [
  {
    icon: Shield,
    title: "Self-Defense",
    desc: "Learn practical techniques tested against real resistance. BJJ is the most effective ground-based self-defense in the world.",
  },
  {
    icon: Flame,
    title: "Confidence",
    desc: "Build genuine confidence that carries into the classroom, the workplace, and every challenge life throws your way.",
  },
  {
    icon: Zap,
    title: "Discipline",
    desc: "Consistency, focus, and respect — the qualities developed on the mats that shape who you become off them.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "A team that pushes you, celebrates you, and never lets you quit. Training partners become lifelong friends.",
  },
] as const;

const HOME_GALLERY_SLIDES: GallerySlide[] = [
  {
    fullSrc: imgPromotion,
    alt: "Promotion ceremony on the academy mats",
    caption: null,
  },
  {
    fullSrc: imgGallery1,
    alt: "Students and instructors group photo at the academy",
    caption: null,
  },
  {
    fullSrc: imgGallery2,
    alt: "Open mat training at the academy",
    caption: null,
  },
];

export function Home() {
  const { heroLead, siteName, testimonials } = useSiteContent();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const onCloseLightbox = useCallback(() => setLightboxIndex(null), []);

  const onPrevLightbox = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i - 1 + HOME_GALLERY_SLIDES.length) % HOME_GALLERY_SLIDES.length;
    });
  }, []);

  const onNextLightbox = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return null;
      return (i + 1) % HOME_GALLERY_SLIDES.length;
    });
  }, []);
  return (
    <>
      {/* ── Hero ── */}
      <div className="home-hero">
        <div className="home-hero__visual" aria-hidden>
          <img
            className="home-hero__photo"
            src={imgAcademy}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
          <div className="home-hero__tatami" />
          <div className="home-hero__scrim" />
        </div>
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">{siteName}</p>
          <h1 className="home-hero__lead">{heroLead}</h1>
          <div className="home-hero__actions">
            <Link className="btn btn--primary" to="/schedule">
              <CalendarDays className="btn__icon" aria-hidden strokeWidth={1.75} />
              View schedule
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              <MapPin className="btn__icon" aria-hidden strokeWidth={1.75} />
              Visit &amp; contact
            </Link>
          </div>
        </div>
      </div>

      {/* ── Offer strip ── */}
      <div className="home-offer-strip">
        <div className="home-offer-strip__inner">
          <span className="home-offer-strip__badge">Now Open · North Ridgeville, OH</span>
          <h2 className="home-offer-strip__headline">
            Your first two weeks are <strong>FREE</strong>
          </h2>
          <p className="home-offer-strip__sub">
            10% off for veterans, first responders &amp; families
          </p>
          <Link className="btn btn--ghost" to="/schedule">
            <CalendarDays className="btn__icon" aria-hidden strokeWidth={1.75} />
            See class schedule
          </Link>
        </div>
      </div>

      {/* ── Instructor section ── */}
      <RevealSection className="home-professor">
        <div className="home-professor__inner">
          <div className="home-professor__content">
            <p className="home-hero__eyebrow">Your instructor</p>
            <h2 className="home-professor__name">Juan</h2>
            <p className="home-professor__credentials">
              1st-Degree BJJ Black Belt · 22 Years Experience · U.S. Marine Corps Veteran
            </p>
            <p className="home-professor__bio">
              Juan began his Jiu-Jitsu journey under Sergio Penha in Las Vegas, where he earned his
              blue belt. He later relocated to Maui, Hawaii, and continued his training under Luis
              Heredia, a black belt under Rickson Gracie.
            </p>
            <p className="home-professor__bio">
              A first-degree Brazilian Jiu-Jitsu black belt under Luis &ldquo;Lim&atilde;o&rdquo;
              Heredia &mdash; one of Rickson Gracie&rsquo;s first black belts &mdash; Juan brings 22
              years of experience on and off the mats.
            </p>
            <div className="home-professor__cta">
              <Link className="btn btn--primary" to="/about">
                <Users className="btn__icon" aria-hidden strokeWidth={1.75} />
                About the academy
              </Link>
            </div>
          </div>
          <div className="home-professor__photo-col">
            <div className="home-professor__frame">
              <img
                className="home-professor__img"
                src={imgJuan}
                alt="Juan"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ── Gallery → Explore → Testimonials (single vertical rhythm) ── */}
      <div className="home-mats-flow">
      <RevealSection className="page-block home-gallery-teaser">
        <div className="home-gallery-teaser__inner">
          <div className="home-gallery-teaser__header">
            <div>
              <h2 className="home-gallery-teaser__heading">From the Mats</h2>
              <p className="home-gallery-teaser__sub">
                Technique, patience, and respect for the craft &mdash; Gi or No-Gi, kids or adults.
              </p>
            </div>
            <Link className="home-gallery-teaser__all" to="/gallery">
              <Images aria-hidden strokeWidth={1.75} />
              See all photos
            </Link>
          </div>
          <div className="home-gallery-teaser__grid home-gallery-teaser__grid--three">
            {HOME_GALLERY_SLIDES.map((slide, index) => {
              const positionClass =
                index === 0
                  ? "gallery-grid__img--focal"
                  : index === 2
                    ? "home-gallery-teaser__img--bottom"
                    : "";
              return (
                <figure key={slide.fullSrc} className="home-gallery-teaser__item">
                  <button
                    type="button"
                    className="gallery-grid__trigger"
                    onClick={() => setLightboxIndex(index)}
                    aria-haspopup="dialog"
                    aria-label={`Open image ${index + 1} of ${HOME_GALLERY_SLIDES.length}: ${slide.alt}`}
                  >
                    <span className="gallery-grid__frame">
                      <img
                        src={slide.fullSrc}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={`gallery-grid__img ${positionClass}`.trim()}
                      />
                      <span className="gallery-grid__shine" aria-hidden />
                      <span className="gallery-grid__zoom" aria-hidden>
                        <ZoomIn size={22} strokeWidth={2} />
                      </span>
                    </span>
                  </button>
                </figure>
              );
            })}
          </div>
          <div className="home-gallery-teaser__footer">
            <p className="home-story__explore-label">Explore</p>
            <nav className="home-story__nav" aria-label="Explore the site">
              <div className="home-story__nav-row home-story__nav-row--inline">
                <Link className="home-story__nav-link" to="/about">
                  About the academy
                </Link>
                <span className="home-story__nav-sep" aria-hidden>·</span>
                <Link className="home-story__nav-link" to="/schedule">
                  Weekly schedule
                </Link>
                <span className="home-story__nav-sep" aria-hidden>·</span>
                <Link className="home-story__nav-link" to="/gallery">
                  Gallery
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </RevealSection>

      <GalleryLightbox
        openIndex={lightboxIndex}
        slides={HOME_GALLERY_SLIDES}
        onClose={onCloseLightbox}
        onPrev={onPrevLightbox}
        onNext={onNextLightbox}
      />

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <RevealSection className="home-testimonials">
          <div className="home-testimonials__inner">
            <div className="home-testimonials__header">
              <p className="home-testimonials__eyebrow">What students say</p>
              <h2 className="home-testimonials__heading">Hear it from the mats</h2>
            </div>
            <div className="home-testimonials__grid">
              {testimonials.map((t) => (
                <figure key={t.name} className="home-testimonials__card">
                  <blockquote className="home-testimonials__quote">{t.quote}</blockquote>
                  <figcaption className="home-testimonials__author">
                    <p className="home-testimonials__name">{t.name}</p>
                    <p className="home-testimonials__role">{t.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </RevealSection>
      )}
      </div>

      {/* ── Benefits grid ── */}
      <RevealSection className="home-benefits">
        <div className="home-benefits__inner">
          <div className="home-benefits__header">
            <p className="home-benefits__eyebrow">Why jiu-jitsu?</p>
            <h2 className="home-benefits__heading">
              The art that changes everything
            </h2>
          </div>
          <div className="home-benefits__grid">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="home-benefits__card">
                <Icon className="home-benefits__card-icon" aria-hidden strokeWidth={1.5} />
                <h3 className="home-benefits__card-title">{title}</h3>
                <p className="home-benefits__card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  );
}
