import type { MetadataRoute } from "next";
import { SITE_URL } from "./_lib/site";

/*
 * ROBOTS
 *
 * Everything deployed is public marketing copy and should be indexed, so
 * this is a permissive allow plus a sitemap pointer — the practical reason
 * to have the file at all is so crawlers can find the sitemap without
 * relying on Search Console submission.
 *
 * AI CRAWLERS ARE NAMED EXPLICITLY even though `User-agent: *` already
 * permits them. The wildcard covers them legally, but several of these
 * crawlers are run conservatively and some publishers block them by
 * default, so an explicit Allow is an unambiguous opt-in rather than an
 * inference from a wildcard. For a practice whose clients increasingly
 * start with "find me a therapist in Chelsea" typed into an assistant,
 * being citable in those answers matters as much as ranking in Google:
 *   - GPTBot        — OpenAI, training and retrieval
 *   - OAI-SearchBot — OpenAI, ChatGPT Search results
 *   - ClaudeBot     — Anthropic
 *   - PerplexityBot — Perplexity
 *
 * There are no Disallow lines for pages that no longer exist: robots.txt
 * is world-readable, so a Disallow line is an advertisement, not a
 * protection.
 */

const AI_CRAWLERS = ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot"];

export default function robots(): MetadataRoute.Robots {
  // Preview builds (NEXT_PUBLIC_PREVIEW_LABEL is set only by the GitHub
  // Actions preview job) are served from public *.vercel.app addresses such
  // as nycreflect-preview.vercel.app, and Vercel doesn't mark those
  // noindex. Keep crawlers off them so a draft never shows up in search.
  if (process.env.NEXT_PUBLIC_PREVIEW_LABEL) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
