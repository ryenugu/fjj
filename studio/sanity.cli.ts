import { defineCliConfig } from "sanity/cli";

/** Same project as `sanity.config.ts` — 9guj7jch / odouhRmKi org. */
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "9guj7jch",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
});
