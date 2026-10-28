import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { PROFILES, SITE_NAME, SITE_URL, SOCIAL_IMAGE } from "./_lib/site";
import { PreviewBanner } from "./_components/PreviewBanner";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-X4HY8LPJVQ";

/**
 * FONT CHOICES:
 *
 * Cormorant Garamond (display): Elegant serif with editorial presence.
 * Chosen over Playfair Display (too heavy) and Fraunces (too playful).
 * The light weight (300) + italic creates warmth without formality.
 * Signals sophistication to an audience that encounters this aesthetic
 * in premium publications and brands.
 *
 * Jost (body): Geometric sans-serif with warmth. Avoids Inter (overused
 * in tech, reads as "startup") and DM Sans (too rounded). Jost's
 * slight geometric quality reads as modern and intentional while
 * its lighter weights maintain the editorial warmth the brief demands.
 *
 * Both are self-hosted from src/app/_fonts (the Latin variable-font files
 * Google Fonts serves; SIL Open Font License) through next/font/local, which
 * keeps the same preloading and swap behaviour as next/font/google. Bundling
 * them means building the site never needs the internet, so an AI assistant
 * working in an offline sandbox (Codex cloud blocks internet by default) can
 * run `npm run check` without any extra setup.
 */
const cormorant = localFont({
  src: [
    { path: "./_fonts/cormorant-garamond.woff2", weight: "300 700", style: "normal" },
    { path: "./_fonts/cormorant-garamond-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = localFont({
  src: [{ path: "./_fonts/jost.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-jost",
  display: "swap",
});

/**
 * SEO METADATA:
 *
 * Title uses her name + LCSW (what people search when referred by name)
 * plus "NYC Therapist" (what people search when looking for a therapist).
 *
 * Description hits the key conversion phrases: couples, high-achieving
 * professionals, Columbia, private pay — these are the exact terms
 * the Google Ads and organic strategy targets.
 *
 * OpenGraph image dimensions optimized for LinkedIn/Facebook sharing,
 * which is how professional referrals often share therapist links.
 */
/**
 * These are DEFAULTS ONLY. Two fields are deliberately absent here and are
 * set per-page instead, via pageMetadata() in _lib/site.ts:
 *
 *   - alternates.canonical
 *   - openGraph.url
 *
 * Both must be self-referencing. Declaring either one in the root layout
 * makes every page in the tree inherit the same value, which is exactly
 * the bug this replaces: the apex URL "https://nycreflect.com" was set
 * here, so all eight pages emitted a canonical pointing at the homepage
 * and each specialty page declared itself a duplicate of `/`.
 *
 * The `keywords` meta tag was also removed. Google has ignored it since
 * 2009 and Bing treats stuffing it as a negative signal; it only ever
 * published the target keyword list to competitors.
 */
export const metadata: Metadata = {
  /* metadataBase resolves any relative metadata URL (and is what Next uses
     to build absolute og:image URLs). Pinned to www — the apex 308s here. */
  metadataBase: new URL(SITE_URL),
  title:
    "Rebecca Silverman, LCSW | NYC Therapist for Professionals, Couples, Parents & Adolescents",
  description:
    "Columbia-trained psychotherapist in NYC for high-achieving professionals, couples, parents, and adolescents. Anxiety, perfectionism, burnout, relationship challenges, parent coaching, ADHD, OCD, and family dynamics. Private pay with superbills. Book a free 15-minute consultation.",
  authors: [{ name: "Rebecca Silverman, LCSW" }],
  openGraph: {
    title:
      "Rebecca Silverman, LCSW | NYC Therapist for Professionals, Couples, Parents & Adolescents",
    description:
      "Columbia-trained psychotherapist in NYC for high-achieving professionals, couples, parents, and adolescents. Anxiety, relationship challenges, parent coaching, and family dynamics. Book a free 15-minute consultation.",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebecca Silverman, LCSW | NYC Therapist",
    description:
      "Columbia-trained psychotherapist for professionals, couples, parents & adolescents in NYC.",
    images: [SOCIAL_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full`}
    >
      <head>
        {/**
         * JSON-LD STRUCTURED DATA:
         *
         * Uses MedicalBusiness (most specific applicable type) with
         * Person for the practitioner. This helps Google display
         * relevant results for NYC therapy searches.
         *
         * The priceRange and areaServed fields help with local SEO
         * ranking signals. hasCredential surfaces the license in
         * Knowledge Panel when available.
         */}
        {/* Passed as a script CHILD rather than via a raw-HTML prop. React
            does not HTML-escape script children (so the JSON survives
            intact) and independently escapes any literal "</script>"
            sequence — the one real injection vector for a JSON-LD block.
            Safer and simpler than setting inner HTML. */}
        <script type="application/ld+json">
          {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Rebecca Silverman, LCSW",
              description:
                "Psychotherapy for high-achieving professionals, couples, parents, and adolescents in NYC. Columbia-trained, evidence-based approach including CBT, DBT, and Parent Management Training.",
              url: SITE_URL,
              /* sameAs reconciles this site with her third-party listings
                 so Google treats them as one entity rather than three
                 unrelated pages about someone with the same name. These are
                 the same URLs the footer and homepage link to — they come
                 from _lib/site.ts so the markup and the visible links
                 cannot drift apart. */
              sameAs: [PROFILES.psychologyToday, PROFILES.zocdoc],
              telephone: "+1-646-285-6294",
              email: "Nycreflect@gmail.com",
              priceRange: "$$$",
              areaServed: {
                "@type": "City",
                name: "New York",
              },
              /* NO aggregateRating HERE — deliberately.
                 Google ignores review markup a business publishes about
                 itself ("self-serving reviews") and flags it as a manual
                 action risk, so the block bought nothing and carried real
                 downside. The 4.9/18 figure is still shown to humans on the
                 homepage, where it now links to the Zocdoc profile — the
                 third party that actually holds the reviews. Zocdoc is also
                 listed in sameAs above, which is the legitimate way to
                 associate this practice with its ratings. */
              employee: {
                "@type": "Person",
                name: "Rebecca Silverman",
                /* jobTitle is the reader-facing descriptor and is kept in
                   sync with the site copy ("psychotherapist", not "clinical
                   social worker"). The LCSW licensure is not lost by this —
                   it is declared on its own below via hasCredential. */
                jobTitle: "Psychotherapist",
                hasCredential: {
                  "@type": "EducationalOccupationalCredential",
                  credentialCategory: "LCSW",
                  recognizedBy: {
                    "@type": "Organization",
                    name: "New York State Education Department",
                  },
                },
                /* Columbia moved from `affiliation` (implies current role)
                   to `alumniOf` (former member) when Becca left her Clinical
                   Instructor position in August 2026 to go full-time private
                   practice. */
                alumniOf: [
                  {
                    "@type": "CollegeOrUniversity",
                    name: "Hunter College, CUNY — Silberman School of Social Work",
                  },
                  {
                    "@type": "CollegeOrUniversity",
                    name: "Skidmore College",
                  },
                  {
                    "@type": "Organization",
                    name: "Columbia University Irving Medical Center / NewYork-Presbyterian Hospital",
                  },
                ],
                knowsLanguage: ["English", "Spanish"],
              },
            })}
        </script>

      </head>
      <body className="min-h-full flex flex-col">
        {/**
         * GOOGLE ANALYTICS (GA4):
         *
         * Loaded via next/script with strategy="afterInteractive" so the
         * gtag library is fetched after the page becomes interactive rather
         * than blocking first paint — keeps the Lighthouse performance score
         * high while still capturing pageviews from initial load onward.
         */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {children}
        <PreviewBanner />
      </body>
    </html>
  );
}
