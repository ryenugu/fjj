import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID?.trim() || "9guj7jch";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource | null | undefined): string | null {
  if (!source) return null;
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return null;
  }
}

export function urlForImageWidth(
  source: SanityImageSource | null | undefined,
  width: number
): string | null {
  if (!source) return null;
  try {
    return builder.image(source).width(width).auto("format").fit("max").url();
  } catch {
    return null;
  }
}
