import { CalendarDays, Home, Images, Mail, Menu, Users, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function useMediaMax719() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 719px)").matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 719px)");
    const fn = () => setNarrow(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return narrow;
}

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: Users },
  { to: "/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/gallery", label: "Gallery", icon: Images },
  { to: "/contact", label: "Contact", icon: Mail },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const narrow = useMediaMax719();
  const { pathname } = useLocation();
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav className={`site-nav${open ? " site-nav--open" : ""}`} aria-label="Primary">
      <button
        type="button"
        className="site-nav__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="site-nav__toggle-label">{open ? "Close menu" : "Open menu"}</span>
        <span className="site-nav__toggle-icons" aria-hidden="true">
          <Menu className="site-nav__toggle-icon site-nav__toggle-icon--menu" strokeWidth={2} />
          <X className="site-nav__toggle-icon site-nav__toggle-icon--close" strokeWidth={2} />
        </span>
      </button>

      <button
        type="button"
        className="site-nav__backdrop"
        aria-label="Close menu"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />

      <ul
        id={panelId}
        className="site-nav__list"
        aria-hidden={narrow ? !open : undefined}
      >
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `site-nav__link${isActive ? " site-nav__link--active" : ""}`
              }
            >
              <Icon className="site-nav__link-icon" aria-hidden strokeWidth={1.75} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
