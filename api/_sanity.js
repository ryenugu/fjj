import { createClient } from "@sanity/client";

function required(name, value) {
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export function getSanityReadClient() {
  const projectId = required(
    "SANITY_PROJECT_ID or VITE_SANITY_PROJECT_ID",
    process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID
  );
  const dataset =
    process.env.SANITY_DATASET ||
    process.env.VITE_SANITY_DATASET ||
    "production";
  const token =
    process.env.SANITY_READ_TOKEN ||
    process.env.VITE_SANITY_READ_TOKEN ||
    process.env.VITE_SANITY_API_KEY;

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: "2024-12-01",
    useCdn: !token,
  });
}

export function sendJson(res, statusCode, body) {
  res.status(statusCode).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(body));
}
