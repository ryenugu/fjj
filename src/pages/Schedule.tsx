import { CalendarDays, Clock, Shirt, Zap } from "lucide-react";
import { RevealSection } from "../components/RevealSection";
import { RevealStagger } from "../components/RevealStagger";
import { useSiteContent } from "../context/SiteContentContext";

export function Schedule() {
  const { businessHours, classTypes, scheduleSessions, siteName } = useSiteContent();
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
              {scheduleSessions.map((s) => (
                <li key={`gi-${s.kind}`}>
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
              {scheduleSessions.map((s) => (
                <li key={`nogi-${s.kind}`}>
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
    </div>
  );
}
