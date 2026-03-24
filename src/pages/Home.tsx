import { CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealSection } from "../components/RevealSection";
import { useSiteContent } from "../context/SiteContentContext";
import imgAcademy from "../images/Haleakala+3-1920w.png";
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

      <RevealSection className="page-block home-story">
        <div className="home-story__grid home-story__grid--split">
          <figure className="home-story__figure">
            <div className="home-story__frame">
              <img
                src={imgPromotion}
                alt="Promotion ceremony on the academy mats"
                loading="lazy"
                decoding="async"
                className="home-story__img"
              />
            </div>
            <figcaption className="home-story__caption">
              On the mats — rank, community, and the long arc of the journey.
            </figcaption>
          </figure>
          <div className="home-story__content">
            <h2 className="page-heading">Where training gets real</h2>
            <p className="page-prose">
              Technique, patience, and respect for the craft — on the mats and in how we treat each other.
              Structure stays clear and the room stays welcoming so new students and longtime grapplers can
              grow together.
            </p>
            <p className="page-prose">
              Gi or No-Gi, kids or adults: find your pace, then step on the mats when you are ready.
            </p>
            <div className="home-story__explore">
              <p className="home-story__explore-label">Next steps</p>
              <nav className="home-story__nav" aria-label="Explore the site">
                <div className="home-story__nav-row">
                  <Link className="home-story__nav-link" to="/about">
                    About the academy
                  </Link>
                </div>
                <div className="home-story__nav-row home-story__nav-row--inline">
                  <Link className="home-story__nav-link" to="/schedule">
                    Weekly schedule
                  </Link>
                  <span className="home-story__nav-sep" aria-hidden>
                    ·
                  </span>
                  <Link className="home-story__nav-link" to="/gallery">
                    Gallery
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
