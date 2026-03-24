import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fallbackSiteContent, type SiteContent } from "../data/siteContent";
import { fetchSiteContentFromSanity } from "../lib/fetchSiteContent";

const SiteContentContext = createContext<SiteContent>(fallbackSiteContent);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(fallbackSiteContent);

  useEffect(() => {
    let cancelled = false;
    fetchSiteContentFromSanity()
      .then((data) => {
        if (!cancelled && data) setContent(data);
      })
      .catch(() => {
        /* keep fallbackSiteContent on network / CORS errors */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext);
}
