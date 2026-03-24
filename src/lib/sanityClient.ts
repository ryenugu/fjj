import { createClient, type SanityClient } from "@sanity/client";

let client: SanityClient | null = null;

/**
 * Browser client for GROQ reads.
 * - **Public dataset:** no token, CDN (`useCdn: true`).
 * - **Private dataset:** set `VITE_SANITY_READ_TOKEN` (Viewer) and add this app’s origin
 *   under Sanity → Project → API → **CORS origins** (e.g. `http://localhost:5173`).
 *   Uses API hostname + `useCdn: false`. Prefer making the dataset public for a marketing site.
 *
 * A read token in the bundle is a tradeoff; for stricter setups use a server proxy instead.
 * @see https://www.sanity.io/help/js-client-browser-token
 */
export function getSanityClient(): SanityClient {
  const projectId =
    import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || "9guj7jch";
  if (!client) {
    const readToken =
      import.meta.env.VITE_SANITY_READ_TOKEN?.trim() ||
      import.meta.env.VITE_SANITY_API_KEY?.trim();
    client = createClient({
      projectId,
      dataset: import.meta.env.VITE_SANITY_DATASET || "production",
      apiVersion: "2024-12-01",
      useCdn: !readToken,
      ...(readToken
        ? {
            token: readToken,
            // Localhost-only console warning; safe to silence for a Viewer read token + CORS.
            ignoreBrowserTokenWarning: true,
          }
        : {}),
    });
  }
  return client;
}
