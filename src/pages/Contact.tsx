import { ArrowUpRight, Clock, Globe, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { ContactForm } from "../components/ContactForm";
import { InstagramIcon } from "../components/icons/InstagramIcon";
import { RevealSection } from "../components/RevealSection";
import { useSiteContent } from "../context/SiteContentContext";

function websiteHostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./i, "");
  } catch {
    return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
  }
}

function instagramHandleLabel(url: string): string {
  try {
    const seg = new URL(url).pathname.replace(/^\//, "").split("/")[0];
    return seg ? `@${seg}` : "Instagram";
  } catch {
    return "Instagram";
  }
}

export function Contact() {
  const { contact, businessHours } = useSiteContent();
  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header__title-row">
          <Mail className="page-header__icon" aria-hidden strokeWidth={1.5} />
          <h1 className="page-header__title">Contact</h1>
        </div>
        <p className="page-header__deck">
          Drop in and see for yourself — or reach out and we'll answer every question.
        </p>
      </header>

      <RevealSection className="page-block">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card__label-row">
              <Phone className="contact-card__label-icon" aria-hidden strokeWidth={1.75} />
              <h2 className="contact-card__label">Phone</h2>
            </div>
            <a className="contact-card__value" href={`tel:${contact.phoneTel}`}>
              {contact.phoneDisplay}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card__label-row">
              <Globe className="contact-card__label-icon" aria-hidden strokeWidth={1.75} />
              <h2 className="contact-card__label">Website</h2>
            </div>
            <a
              className="contact-card__value"
              href={contact.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {websiteHostLabel(contact.websiteUrl)}
            </a>
          </div>

          <div className="contact-card">
            <div className="contact-card__label-row">
              <Clock className="contact-card__label-icon" aria-hidden strokeWidth={1.75} />
              <h2 className="contact-card__label">Hours</h2>
            </div>
            <ul className="contact-hours-list">
              {businessHours.map((row) => (
                <li key={row.days} className="contact-hours-list__item">
                  <span className="contact-hours-list__days">{row.days}</span>
                  <span className="contact-hours-list__time">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-card contact-card--connect">
            <div className="contact-card__label-row">
              <Share2 className="contact-card__label-icon" aria-hidden strokeWidth={1.75} />
              <h2 className="contact-card__label">Connect</h2>
            </div>
            <div className="contact-icon-links">
              <a
                className="contact-icon-link"
                href={`mailto:${contact.email}`}
                aria-label={`Email ${contact.email}`}
              >
                <Mail className="contact-icon-link__glyph" aria-hidden strokeWidth={1.75} />
              </a>
              <a
                className="contact-icon-link"
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${instagramHandleLabel(contact.instagramUrl)}`}
              >
                <InstagramIcon className="contact-icon-link__glyph" aria-hidden strokeWidth={1.75} />
              </a>
            </div>
          </div>

          <div className="contact-card contact-card--wide">
            <div className="contact-card__label-row">
              <MapPin className="contact-card__label-icon" aria-hidden strokeWidth={1.75} />
              <h2 className="contact-card__label">Address &amp; Map</h2>
            </div>
            <div className="contact-location-body">
              <address className="contact-address">
                {contact.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>
              <a
                className="contact-maps-link"
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
                <ArrowUpRight className="contact-maps-link__icon" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="page-block">
        <ContactForm />
      </RevealSection>
    </div>
  );
}
