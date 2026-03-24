import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { InstagramIcon } from "../components/icons/InstagramIcon";
import { useSiteContent } from "../context/SiteContentContext";

export function SiteFooter() {
  const { businessHours, contact, siteName } = useSiteContent();
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__block">
          <Link className="site-footer__title site-footer__title-link" to="/">
            {siteName}
          </Link>
          <p className="site-footer__muted">
            <span className="site-footer__link-row">
              <MapPin className="site-footer__link-icon" aria-hidden strokeWidth={1.75} />
              <a
                className="site-footer__link"
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                North Ridgeville, Ohio
              </a>
            </span>
          </p>
        </div>
        <div className="site-footer__block">
          <p className="site-footer__label">Hours</p>
          <ul className="site-footer__hours">
            {businessHours.map((row) => (
              <li key={row.days}>
                <span className="site-footer__days">{row.days}</span>
                <span className="site-footer__time">{row.hours}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__block">
          <p className="site-footer__label">Contact</p>
          <p className="site-footer__link-row">
            <Phone className="site-footer__link-icon" aria-hidden strokeWidth={1.75} />
            <a className="site-footer__link" href={`tel:${contact.phoneTel}`}>
              {contact.phoneDisplay}
            </a>
          </p>
          <p className="site-footer__link-row">
            <Mail className="site-footer__link-icon" aria-hidden strokeWidth={1.75} />
            <a className="site-footer__link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
          <p className="site-footer__link-row">
            <Globe className="site-footer__link-icon" aria-hidden strokeWidth={1.75} />
            <a
              className="site-footer__link"
              href={contact.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              florolljiu-jitsu.com
            </a>
          </p>
          <p className="site-footer__link-row">
            <InstagramIcon className="site-footer__link-icon" aria-hidden strokeWidth={1.75} />
            <a
              className="site-footer__link"
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
          <p className="site-footer__muted">
            <Link className="site-footer__inline-link" to="/contact">
              Address & map
            </Link>
          </p>
        </div>
      </div>
      <p className="site-footer__base">© {new Date().getFullYear()} {siteName}</p>
    </footer>
  );
}
