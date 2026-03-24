import { Activity, Baby, HeartHandshake, Shield } from "lucide-react";
import { RevealSection } from "../components/RevealSection";
import { useSiteContent } from "../context/SiteContentContext";

const offerItems = [
  { text: "Brazilian Jiu-Jitsu instruction", icon: HeartHandshake },
  { text: "Self-defense training", icon: Shield },
  { text: "Youth development programs", icon: Baby },
  { text: "Fitness-based martial arts classes", icon: Activity },
] as const;

export function About() {
  const { aboutParagraphs, siteName } = useSiteContent();
  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header__title-row">
          <HeartHandshake className="page-header__icon" aria-hidden strokeWidth={1.5} />
          <h1 className="page-header__title">About {siteName}</h1>
        </div>
        <p className="page-header__deck">
          Community, authentic BJJ, and room to grow — at your pace.
        </p>
      </header>

      {aboutParagraphs.map((text, i) => (
        <RevealSection key={i} className="page-block">
          <p className="page-prose">{text}</p>
        </RevealSection>
      ))}

      <RevealSection className="page-block page-block--tight">
        <h2 className="page-heading">What we offer</h2>
        <ul className="about-list">
          {offerItems.map(({ text, icon: Icon }) => (
            <li key={text}>
              <Icon className="about-list__icon" aria-hidden strokeWidth={1.75} />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </RevealSection>
    </div>
  );
}
