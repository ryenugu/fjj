import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnnouncementBanner } from "../components/AnnouncementBanner";
import { useSiteContent } from "../context/SiteContentContext";
import logoSrc from "../images/logo.png";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

export function RootLayout() {
  const { siteName, announcement } = useSiteContent();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="shell">
      <div className="grain" aria-hidden />

      {announcement?.enabled && announcement.text && (
        <AnnouncementBanner text={announcement.text} />
      )}

      <header className="site-header">
        <Link className="site-header__brand" to="/">
          <img
            className="site-header__logo"
            src={logoSrc}
            alt={siteName}
          />
          <span className="site-header__name">{siteName}</span>
        </Link>
        <SiteNav />
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}
