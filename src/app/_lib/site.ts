import type { Metadata } from "next";

/**
 * SITE-WIDE SEO CONSTANTS AND PER-PAGE METADATA BUILDER
 *
 * Single source of truth for anything that has to agree across pages:
 * the canonical host, the social card, and the external profile URLs.
 *
 * WHY THIS FILE EXISTS — the canonical bug it prevents:
 * Previously `alternates.canonical` was declared once in layout.tsx as the
 * bare apex "https://nycreflect.com". Because Next.js metadata inherits
 * down the tree, EVERY page inherited that same value, so all eight pages
 * told Google "the homepage is my canonical URL" — i.e. every specialty
 * landing page declared itself a duplicate of the homepage. That is the
 * single most damaging thing a page can say about itself: the six landing
 * pages are the entire organic strategy, and they were all volunteering to
 * be dropped from the index in favour of `/`.
 *
 * The fix is that a canonical must be SELF-REFERENCING — each page names
 * its own URL — so canonicals are never declared in layout.tsx. Every page
 * calls pageMetadata() with its own path instead.
 */

/**
 * HOST: www, not apex. The apex issues a real 308 to www (verified against
 * production), so the apex never serves a 200. Canonical, og:url, sitemap
 * and llms.txt must all name the final destination — a canonical pointing
 * at a redirect makes Google resolve a hop before it can index the page,
 * and mixing hosts across those files splits ranking signals between two
 * URLs that are really one page.
 */
export const SITE_URL = "https://www.nycreflect.com";

export const SITE_NAME = "Rebecca Silverman, LCSW";

/**
 * External profiles. These are the same URLs the footer and homepage link
 * to — kept here so the JSON-LD `sameAs` and the visible links cannot
 * drift apart. `sameAs` is how Google reconciles this site with the
 * Psychology Today and Zocdoc listings as one real-world entity rather
 * than three unrelated pages about someone with the same name.
 */
export const PROFILES = {
  psychologyToday:
    "https://www.psychologytoday.com/us/therapists/rebecca-silverman-new-york-ny/783976",
  zocdoc: "https://www.zocdoc.com/professional/rebecca-silverman-lcsw-305331",
} as const;

/**
 * Social card. twitter:card was already declared as summary_large_image
 * but no image was ever set, so every shared link rendered a blank card.
 * Absolute URL is required — relative paths are not resolved by most
 * scrapers (LinkedIn and iMessage in particular).
 */
export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "Rebecca Silverman, LCSW — psychotherapy for individuals and couples in New York City",
} as const;

/**
 * Every indexable route, in sitemap order. sitemap.ts and llms.txt/route.ts
 * both read this, so adding a page updates both automatically.
 * `path: ""` is the homepage.
 */
export const ROUTES = [
  { path: "", title: "Home", priority: 1 },
  { path: "/anxiety-therapist-nyc", title: "Anxiety therapy in NYC", priority: 0.8 },
  { path: "/couples-therapy-nyc", title: "Couples therapy in NYC", priority: 0.8 },
  { path: "/ocd-therapist-nyc", title: "OCD therapy in NYC", priority: 0.8 },
  { path: "/parent-coaching-nyc", title: "Parent coaching in NYC", priority: 0.8 },
  {
    path: "/premarital-counseling-nyc",
    title: "Premarital counseling in NYC",
    priority: 0.8,
  },
  { path: "/teen-therapy-nyc", title: "Teen and adolescent therapy in NYC", priority: 0.8 },
  { path: "/contact", title: "Contact", priority: 0.5 },
] as const;

/** Absolute URL for a route path. "" and "/" both mean the homepage. */
export function absoluteUrl(path: string): string {
  return path === "" || path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Builds a page's complete metadata with a self-referencing canonical and
 * a matching og:url.
 *
 * NOTE ON NEXT.JS MERGE SEMANTICS: metadata fields are merged shallowly —
 * a page that declares `openGraph` REPLACES the parent's `openGraph`
 * object wholesale rather than merging into it. So this helper always
 * returns a complete openGraph/twitter block; relying on layout.tsx to
 * supply the image while a page supplies the url would silently drop the
 * image on that page.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}
