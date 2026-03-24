import { createClient, type SanityClient } from "@sanity/client";

let client: SanityClient | null = null;

/**
 * Browser client for public GROQ reads only.
 * Private dataset access should go through a server route so tokens never ship in the bundle.
 */
export function getSanityClient(): SanityClient {
  const projectId =
    import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || "9guj7jch";
  if (!client) {
    client = createClient({
      projectId,
      dataset: import.meta.env.VITE_SANITY_DATASET || "production",
      apiVersion: "2024-12-01",
      useCdn: true,
    });
  }
  return client;
}
