import type { MetadataRoute } from "next";
import { ROUTES, absoluteUrl } from "./_lib/site";

/*
 * SITEMAP
 *
 * The six specialty landing pages are the entire organic-search strategy —
 * each one targets a distinct high-intent query ("anxiety therapist nyc",
 * "couples therapy nyc", etc). Without a sitemap they were discoverable
 * only by crawling the homepage's specialty grid, which leaves discovery
 * dependent on how deeply the homepage gets crawled.
 *
 * HOST: www, not apex. nycreflect.com issues a 308 to www.nycreflect.com,
 * so the apex host never serves a 200. Sitemap URLs must be the final
 * destination, otherwise every entry resolves through a redirect.
 *
 * The URL list comes from ROUTES in _lib/site.ts, which is also what
 * llms.txt reads and what pageMetadata() builds canonicals from — so the
 * sitemap, the AI-facing page list, and each page's self-referencing
 * canonical are all derived from one array and cannot disagree about
 * either the host or the set of pages.
 *
 * (Historical note: this file used to carry a warning that layout.tsx
 * declared the apex as canonical while the sitemap used www. That is
 * resolved — canonicals are now per-page and www throughout.)
 *
 * lastModified is a pinned constant rather than `new Date()` so it reflects
 * actual content changes instead of incrementing on every deploy — a
 * timestamp that moves when nothing changed trains crawlers to ignore it.
 */

/* Date of the last substantive content change (FAQ section added). */
const LAST_CONTENT_UPDATE = new Date("2026-09-12");

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: route.path === "/contact" ? "yearly" : "monthly",
    priority: route.priority,
  }));
}
