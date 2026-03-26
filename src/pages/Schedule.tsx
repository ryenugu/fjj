import { CalendarDays, Clock, Gift, Shirt, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealSection } from "../components/RevealSection";
import { RevealStagger } from "../components/RevealStagger";
import { useSiteContent } from "../context/SiteContentContext";

export function Schedule() {
  const { businessHours, classTypes, scheduleSessions, siteName } = useSiteContent();

  const giSessions = scheduleSessions;
  const noGiSessions = scheduleSessions.filter((s) => s.kind === "adults");

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header__title-row">
          <CalendarDays className="page-header__icon" aria-hidden strokeWidth={1.5} />
          <h1 className="page-header__title">Schedule</h1>
        </div>
        <p className="page-header__deck">Weekly classes at {siteName}</p>
      </header>

      <RevealSection className="page-block">
        <div className="schedule-cards">
          <article className="schedule-card">
            <div className="schedule-card__title-row">
              <Shirt className="schedule-card__title-icon" aria-hidden strokeWidth={1.75} />
              <h2 className="schedule-card__title">{classTypes.gi.label}</h2>
            </div>
            <p className="schedule-card__days">{classTypes.gi.days}</p>
            <p className="schedule-card__desc">{classTypes.gi.description}</p>
            <ul className="schedule-card__times">
              {giSessions.map((s) => (
                <li key={`gi-${s.label}`}>
                  <span className="schedule-card__kind">{s.label}</span>
                  <span className="schedule-card__time">{s.time}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="schedule-card">
            <div className="schedule-card__title-row">
              <Zap className="schedule-card__title-icon" aria-hidden strokeWidth={1.75} />
              <h2 className="schedule-card__title">{classTypes.noGi.label}</h2>
            </div>
            <p className="schedule-card__days">{classTypes.noGi.days}</p>
            <p className="schedule-card__desc">{classTypes.noGi.description}</p>
            <ul className="schedule-card__times">
              {noGiSessions.map((s) => (
                <li key={`nogi-${s.label}`}>
                  <span className="schedule-card__kind">{s.label}</span>
                  <span className="schedule-card__time">{s.time}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </RevealSection>

      <RevealSection className="page-block">
        <div className="stack-heading">
          <Clock className="page-header__icon" aria-hidden strokeWidth={1.5} />
          <h2 className="page-heading">Business hours</h2>
        </div>
        <RevealStagger as="ul" className="hours-list">
          {businessHours.map((row) => (
            <li key={row.days} className="hours-list__item">
              <span className="hours-list__days">{row.days}</span>
              <span className="hours-list__hours">{row.hours}</span>
            </li>
          ))}
        </RevealStagger>
      </RevealSection>

      {/* ── First visit callout ── */}
      <RevealSection className="page-block">
        <div className="schedule-first-visit">
          <Gift className="schedule-first-visit__icon" aria-hidden strokeWidth={1.5} />
          <div>
            <h2 className="schedule-first-visit__title">
              Your first two weeks are free
            </h2>
            <p className="schedule-first-visit__desc">
              You don&apos;t need experience. You don&apos;t need to be young, fit, or in shape.
            </p>
            <p className="schedule-first-visit__desc">
              Jiu-jitsu isn&apos;t for the perfect—it&apos;s for the ones willing to start.
            </p>
            <Link className="btn btn--primary" to="/contact">
              Contact us to plan your first visit
            </Link>
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
