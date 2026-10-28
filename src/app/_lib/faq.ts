/**
 * HOMEPAGE FAQ — SINGLE SOURCE FOR VISIBLE COPY AND FAQPage JSON-LD
 *
 * Google requires that FAQPage markup reproduce content a human can
 * actually see on the page; markup describing answers that aren't rendered
 * is a structured-data violation, not a shortcut. The usual way sites end
 * up in violation is innocent — someone edits the visible copy months
 * later and forgets the hand-written JSON-LD blob, and the two silently
 * diverge.
 *
 * That failure is designed out here: answers are plain strings (not JSX),
 * the visible <FaqSection> and faqPageJsonLd() both map over this same
 * array, and there is no second copy of the text anywhere. Editing an
 * answer necessarily updates both.
 *
 * Keeping answers as strings is the constraint that makes this work — the
 * moment an answer needs a link or bold text it becomes JSX, stops being
 * serialisable into JSON-LD, and the drift risk comes back. If a future
 * answer needs rich text, add a separate optional `rich` field for display
 * and keep `a` as the plain-text version for the markup.
 */

export type FaqItem = {
  q: string;
  a: string;
};

export const HOME_FAQ: FaqItem[] = [
  {
    q: "Do you take insurance?",
    a: "I am a private-pay practice and do not accept insurance directly. I provide superbills — itemized receipts you can submit for out-of-network reimbursement — and many clients receive 50 to 80% back. I'm happy to help you check your benefits before we start.",
  },
  {
    q: "What are your fees?",
    a: "Fees are shared during the initial consultation, so we can talk about what you're looking for and whether working together makes sense before money comes up.",
  },
  {
    q: "Do you offer virtual sessions?",
    a: "My practice is predominantly virtual. Inquire about in-person sessions in Williamsburg.",
  },
  {
    q: "How do I get started?",
    a: "Start with a free 15-minute phone consultation. Send a message through the contact page with a few sentences about what's going on, and I'll be in touch within a few business days to set up the call.",
  },
  {
    q: "Do you work with teens and parents?",
    a: "Yes. Adolescent therapy and parent coaching are both core parts of my practice — I spent ten years in Child and Adolescent Behavioral Health at NewYork-Presbyterian, and I'm formally trained in Parent Management Training.",
  },
];

/**
 * Builds the FAQPage structured data from the same array the page renders.
 * Returned as a plain object so the caller can JSON.stringify it into a
 * ld+json script tag.
 */
export function faqPageJsonLd(items: FaqItem[] = HOME_FAQ) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
