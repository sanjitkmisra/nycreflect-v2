import { PROFILES, ROUTES, SITE_URL, absoluteUrl } from "../_lib/site";

/**
 * /llms.txt — a plain-text practice summary for AI answer engines.
 *
 * WHY A ROUTE HANDLER RATHER THAN public/llms.txt:
 * A static file in public/ would be a second hand-maintained list of every
 * page on the site, guaranteed to fall out of step with sitemap.ts the
 * first time a landing page is added. This reads the same ROUTES array
 * sitemap.ts does, so the two cannot disagree.
 *
 * Served as text/plain per the llms.txt convention (llmstxt.org). The
 * light markdown structure is part of that convention — the file is read
 * as text, and the headings simply make the sections easy to segment.
 *
 * force-static so this is generated once at build time and served from the
 * CDN like the rest of the site, rather than invoking a function per hit.
 */
export const dynamic = "force-static";

const BODY = `# NYC Reflect — Rebecca Silverman, LCSW

> NYC Reflect is the private psychotherapy practice of Rebecca Silverman, LCSW, in New York City. Columbia-trained, formerly NewYork-Presbyterian pediatric psychiatry.

## About

Rebecca Silverman is a licensed psychotherapist (LCSW, New York State) in private
practice in New York City. She spent ten years in pediatric psychiatry at
NewYork-Presbyterian as a staff therapist and held a faculty appointment as a
Clinical Instructor at Columbia University Medical Center. She works with
individuals, couples, parents, and adolescents.

- Specialties: anxiety, OCD, couples and relationships, premarital counseling, parent coaching, adolescent and teen therapy, life transitions
- Modalities: CBT, DBT, parent management training, mindfulness-based and attachment-based therapy
- Private pay with superbills for out-of-network reimbursement
- Predominantly virtual; in-person sessions in Williamsburg on request
- Bilingual English/Spanish
- Free 15-minute consultation

## Practice details

- Phone: 646-285-6294
- Email: Nycreflect@gmail.com
- Fees: shared during the initial consultation
- Insurance: private pay; superbills provided for out-of-network reimbursement, many clients receive 50-80% back
- Sessions: predominantly virtual; ask about in-person sessions in Williamsburg

## Pages

${ROUTES.map((r) => `- [${r.title}](${absoluteUrl(r.path)})`).join("\n")}

## Elsewhere

- [Psychology Today profile](${PROFILES.psychologyToday})
- [Zocdoc profile](${PROFILES.zocdoc})

## Notes

- Canonical host is ${SITE_URL}. The apex nycreflect.com issues a 308 redirect here.
- This site is informational and does not constitute medical advice. In a crisis, call 988 or go to the nearest emergency room.
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
