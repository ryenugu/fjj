import { Activity, Baby, BookOpen, HeartHandshake, Shield, Star, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { RevealSection } from "../components/RevealSection";
import { useSiteContent } from "../context/SiteContentContext";

const values = [
  {
    icon: Shield,
    title: "Confidence",
    desc: "Build real confidence on and off the mats. You'll learn to trust yourself under pressure — and that changes everything.",
  },
  {
    icon: Zap,
    title: "Self-Defense",
    desc: "Practical techniques tested against real resistance. BJJ is the most proven ground-based self-defense system in the world.",
  },
  {
    icon: BookOpen,
    title: "Discipline",
    desc: "Structure, consistency, and respect — the qualities forged on the mats that shape who you become every day after.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "A training family that pushes you, celebrates you, and never lets you quit. Training partners become lifelong friends.",
  },
] as const;

const programs = [
  {
    icon: Baby,
    title: "Kids (Ages 6–11)",
    ages: "Ages 6 – 11 · Mon & Wed",
    desc: "Play-based BJJ that builds focus, coordination, and genuine confidence. Kids learn to move, think, and carry themselves with purpose.",
  },
  {
    icon: Star,
    title: "Teens (Ages 12–15)",
    ages: "Ages 12 – 15 · Tue & Thu",
    desc: "Real-world self-defense meets character development. Structured training helps teens build resilience and a strong sense of identity.",
  },
  {
    icon: Activity,
    title: "Adults",
    ages: "All Levels · Mon – Thu",
    desc: "Whether you've never trained or you've competed for years — our adult classes meet you exactly where you are right now.",
  },
] as const;

const offerItems = [
  { text: "Brazilian Jiu-Jitsu instruction", icon: HeartHandshake },
  { text: "Self-defense training for all ages", icon: Shield },
  { text: "Youth development programs (Ages 6–15)", icon: Baby },
  { text: "Fitness-based martial arts classes", icon: Activity },
] as const;

export function About() {
  const { aboutParagraphs, siteName } = useSiteContent();
  return (
    <>
      {/* ── Page header + about prose ── */}
      <div className="page">
        <header className="page-header">
          <div className="page-header__title-row">
            <HeartHandshake className="page-header__icon" aria-hidden strokeWidth={1.5} />
            <h1 className="page-header__title">About {siteName}</h1>
          </div>
          <p className="page-header__deck">
            Authentic BJJ instruction — for every age, every background.
          </p>
        </header>

        {aboutParagraphs.map((text, i) => (
          <RevealSection key={i} className="page-block">
            <p className="page-prose">{text}</p>
          </RevealSection>
        ))}
      </div>

      {/* ── Values — full-width tinted band ── */}
      <RevealSection className="about-values">
        <div className="about-values__inner">
          <div className="about-values__header">
            <p className="about-values__eyebrow">Our philosophy</p>
            <h2 className="about-values__heading">More than a sport. A way of life.</h2>
          </div>
          <div className="about-values__grid">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="about-values__card">
                <Icon className="about-values__card-icon" aria-hidden strokeWidth={1.5} />
                <h3 className="about-values__card-title">{title}</h3>
                <p className="about-values__card-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ── Programs by age + What we offer ── */}
      <div className="page">
        <RevealSection className="page-block">
          <h2 className="page-heading">Built for everyone</h2>
          <p className="page-prose">
            From your first class to your hundredth, we have a program for exactly where you are.
          </p>
          <div className="about-who__grid">
            {programs.map(({ icon: Icon, title, ages, desc }) => (
              <div key={title} className="about-who__card">
                <Icon className="about-who__icon" aria-hidden strokeWidth={1.5} />
                <div>
                  <p className="about-who__ages">{ages}</p>
                  <h3 className="about-who__title">{title}</h3>
                </div>
                <p className="about-who__desc">{desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>

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

        <RevealSection className="page-block">
          <div className="about-cta">
            <p className="about-cta__text">
              Ready to see what it's all about? Your first two weeks are free — no experience needed.
            </p>
            <div className="about-cta__actions">
              <Link className="btn btn--primary" to="/schedule">View schedule</Link>
              <Link className="btn btn--ghost" to="/contact">Contact us</Link>
            </div>
          </div>
        </RevealSection>
      </div>
    </>
  );
}
