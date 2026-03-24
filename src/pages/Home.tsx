import { CalendarDays, Images, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealSection } from "../components/RevealSection";
import { useSiteContent } from "../context/SiteContentContext";
import imgAcademy from "../images/Haleakala+3-1920w.png";
import imgGallery1 from "../images/gallery 1.png";
import imgGallery2 from "../images/gallery 2.png";
import imgPromotion from "../images/With-Luis-Heredia-promoted-1111-644167b0-1920w.png";

export function Home() {
  const { heroLead, siteName, tagline } = useSiteContent();
  return (
    <>
      <div className="home-hero">
        <div className="home-hero__visual" aria-hidden>
          <img
            className="home-hero__photo"
            src={imgAcademy}
            alt=""
            decoding="async"
            fetchpriority="high"
          />
          <div className="home-hero__tatami" />
          <div className="home-hero__scrim" />
        </div>
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">{siteName}</p>
          <h1 className="home-hero__title">{tagline}</h1>
          <p className="home-hero__lead">{heroLead}</p>
          <div className="home-hero__actions">
            <Link className="btn btn--primary" to="/schedule">
              <CalendarDays className="btn__icon" aria-hidden strokeWidth={1.75} />
              Class schedule
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              <MapPin className="btn__icon" aria-hidden strokeWidth={1.75} />
              Visit & contact
            </Link>
          </div>
        </div>
      </div>

      <RevealSection className="page-block home-gallery-teaser">
        <div className="home-gallery-teaser__header">
          <div>
            <h2 className="home-gallery-teaser__heading">From the Mats</h2>
            <p className="home-gallery-teaser__sub">
              Technique, patience, and respect for the craft — Gi or No-Gi, kids or adults.
            </p>
          </div>
          <Link className="home-gallery-teaser__all" to="/gallery">
            <Images aria-hidden strokeWidth={1.75} />
            See all photos
          </Link>
        </div>
        <div className="home-gallery-teaser__grid home-gallery-teaser__grid--three">
          <figure className="home-gallery-teaser__item">
            <div className="home-gallery-teaser__frame">
              <img
                src={imgPromotion}
                alt="Promotion ceremony on the academy mats"
                loading="lazy"
                decoding="async"
                className="home-gallery-teaser__img home-gallery-teaser__img--top"
              />
            </div>
          </figure>
          <figure className="home-gallery-teaser__item">
            <div className="home-gallery-teaser__frame">
              <img
                src={imgGallery1}
                alt="Academy training session"
                loading="lazy"
                decoding="async"
                className="home-gallery-teaser__img"
              />
            </div>
          </figure>
          <figure className="home-gallery-teaser__item">
            <div className="home-gallery-teaser__frame">
              <img
                src={imgGallery2}
                alt="Academy training session"
                loading="lazy"
                decoding="async"
                className="home-gallery-teaser__img home-gallery-teaser__img--bottom"
              />
            </div>
          </figure>
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
      </RevealSection>
    </>
  );
}
