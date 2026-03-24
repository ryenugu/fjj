import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

/** Project 9guj7jch (org odouhRmKi), dataset production. Override via `studio/.env`. */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "9guj7jch";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "yesthetics",
  title: "Flo Roll site content",

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
