/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_PROJECT_ID?: string;
  readonly VITE_SANITY_DATASET?: string;
  /** Viewer token if the dataset is private; add app URL to Sanity API CORS origins. */
  readonly VITE_SANITY_READ_TOKEN?: string;
  /** @deprecated Use VITE_SANITY_READ_TOKEN; same behavior. */
  readonly VITE_SANITY_API_KEY?: string;
  /** Web3Forms key (set in vite.config from WEB3FORM_API_KEY or VITE_* aliases). */
  readonly VITE_WEB3FORM_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
