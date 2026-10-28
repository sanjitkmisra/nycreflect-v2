/**
 * NYC REFLECT V2 — SINGLE-PAGE THERAPY PRACTICE SITE
 *
 * Architecture: Single-page with anchor navigation.
 * Rationale: Therapy seekers are in research mode — they want to scroll
 * through everything on one visit, not click through multiple pages.
 * Single-page also means one Lighthouse audit, one load, one conversion path.
 *
 * Section order follows the AIDA framework:
 * 1. Hero → Attention (5-second hook)
 * 2. Credibility Bar → Interest (why she's worth choosing)
 * 3. About → Interest (human connection)
 * 4. Specialties → Desire (they see themselves)
 * 5. Approach → Desire (they understand how therapy works)
 * 6. Logistics → Decision (rates, format, superbills remove objections)
 * 7. Testimonial → Decision (social proof at decision point)
 * 8. Booking CTA → Action (convert)
 */

import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "./_components/SiteNav";
import { SiteFooter } from "./_components/SiteFooter";
import { HOME_FAQ, faqPageJsonLd } from "./_lib/faq";
import { pageMetadata } from "./_lib/site";

/* Self-referencing canonical + og:url for the homepage. Every page declares
   its own; see _lib/site.ts for why this is never set in layout.tsx. */
export const metadata = pageMetadata({
  path: "",
  title:
    "Rebecca Silverman, LCSW | NYC Therapist for Professionals, Couples, Parents & Adolescents",
  description:
    "Columbia-trained psychotherapist in NYC for high-achieving professionals, couples, parents, and adolescents. Anxiety, perfectionism, burnout, relationship challenges, parent coaching, ADHD, OCD, and family dynamics. Private pay with superbills. Book a free 15-minute consultation.",
});

/* Nav and footer are shared across all pages via SiteNav / SiteFooter
   (see _components/). They were inlined here originally; extracted once
   the landing pages started reusing them. */

/* ==========================================================================
   HERO
   Two-column on desktop (text left, photo right), stacked on mobile.

   The headline "Therapy that creates real change — not endless processing"
   is the single most important copy on the site:
   - "creates real change" — promises an outcome, not a venting space
   - "not endless processing" — answers the high-achiever's #1 objection
     to therapy (that it's open-ended and never resolves)
   This leads with confidence and result. The recognition/qualification
   work — naming the external-success-but-internal-flatness gap — is handled
   by the intro line directly below, so the headline can stay punchy.
   ========================================================================== */
function Hero() {
  return (
    <section className="px-5 pt-28 pb-14 flex flex-col md:px-12 lg:px-20 md:pt-32 md:pb-20 md:flex-row md:items-start md:gap-12 lg:gap-16">
      <div className="flex-1 max-w-2xl">
        {/* Eyebrow positions the niche immediately — "Individuals & Couples"
            signals she's not a generalist. "NYC" is a local SEO signal. */}
        <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-5">
          Psychotherapy for Individuals &amp; Couples · New York City
        </p>

        <h1 className="font-display text-[2.4rem] md:text-[3.4rem] font-light leading-[1.18] text-text-primary mb-5">
          Therapy that creates{" "}
          <em className="italic text-sage">real change</em>, not endless
          processing.
        </h1>

        {/* Mobile hero photo — shown between headline and body text on mobile.
            Uses a soft 4:5 portrait aspect ratio to show face + shoulders
            without aggressive cropping. Centered with max-width to keep it
            elegant, not edge-to-edge. Hidden on desktop where the side
            photo takes over. */}
        <div className="md:hidden mb-6 flex justify-center">
          <Image
            src="/rebecca-hero-2.jpeg"
            alt="Rebecca Silverman, LCSW, psychotherapist in New York City"
            width={1103}
            height={1379}
            className="w-full max-w-xs aspect-[4/5] object-cover object-top rounded"
            sizes="80vw"
            priority
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          {/* Primary CTA: "Free" reduces friction. "15-Min" sets expectation.
              "Consult" is warmer than "consultation" (less formal). */}
          <a
            href="/contact"
            className="inline-block bg-sage text-cream-light px-8 py-4 font-body text-[0.78rem] tracking-wider uppercase no-underline rounded-sm hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </a>

          {/* Secondary link for people not ready to book — anchors to details
              so they can learn more before committing. */}
          <a
            href="#details"
            className="text-text-muted text-sm underline underline-offset-4 decoration-sand hover:text-sage transition-colors"
          >
            Learn more first
          </a>
        </div>

        {/* Compact trust line — occupies the space the removed intro left
            behind and puts real patient social proof above the fold. Links to
            the Zocdoc source. Rating is her live 4.9 average across 18
            reviews. */}
        <a
          href="https://www.zocdoc.com/professional/rebecca-silverman-lcsw-305331"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2.5 text-[0.82rem] text-text-muted no-underline"
        >
          <span
            className="text-sage text-[0.9rem] tracking-[0.15em]"
            aria-hidden="true"
          >
            ★★★★★
          </span>
          <span>
            <strong className="text-text-primary font-medium">4.9</strong> from
            18 verified reviews on{" "}
            <span className="underline underline-offset-2 decoration-sand group-hover:text-sage transition-colors">
              Zocdoc
            </span>
          </span>
        </a>
      </div>

      {/* Desktop hero portrait — hidden on mobile (mobile gets its own
          photo placement above). 3:4 portrait ratio works well at this
          size. `priority` for above-the-fold LCP optimization. */}
      <div className="hidden md:block flex-1 max-w-md mt-8 md:mt-0">
        <Image
          src="/rebecca-hero-2.jpeg"
          alt="Rebecca Silverman, LCSW, psychotherapist in New York City"
          width={1103}
          height={1379}
          className="w-full aspect-[3/4] object-cover object-top rounded"
          sizes="(max-width: 767px) 1px, 33vw"
          priority
        />
      </div>
    </section>
  );
}

/* ==========================================================================
   WHY CLIENTS WORK WITH ME
   Replaces the older 4-stat bar with a richer credibility block placed
   directly under the hero. The bar said "Columbia, 10+ years, 4.87★, CBT"
   without context; this section turns each stat into a complete reason
   someone should feel safe choosing her. Same proof points, but framed
   as benefits to the client rather than badges on the therapist.

   The Zocdoc rating stays as a closing social-proof line — third-party
   validation tied to a recognizable consumer brand carries more weight
   than a generic "Client Rating" stat.
   ========================================================================== */
function WhyClientsWorkWithMe() {
  const reasons = [
    "A decade of work with individuals with anxiety, OCD, relationships, and life transitions",
    "Warm but direct. You leave with insight and tools, not just talk",
  ];

  return (
    <section
      aria-label="Why clients work with me"
      className="bg-cream-light border-y border-sand px-5 py-12 md:px-12 lg:px-20 md:py-14"
    >
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-5 text-center">
        Why Clients Work With Me
      </p>
      <ul className="max-w-3xl mx-auto flex flex-col gap-3 md:gap-4">
        {reasons.map((r) => (
          <li
            key={r}
            className="flex items-start gap-3 text-[0.92rem] leading-relaxed text-text-body"
          >
            <span
              className="font-display text-sage text-lg leading-none mt-0.5 shrink-0"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ==========================================================================
   ABOUT SECTION
   Two-column: photo left, text right. The photo humanizes; the text
   builds trust through specificity.

   Copy strategy (this copy is Becca's own words — treat edits here as
   requiring her sign-off, not a copywriting judgment call):
   - Para 1: Credential woven into narrative rather than listed — the NYP
     staff-therapist decade and the Columbia faculty appointment are both
     stated in past tense (she left the Clinical Instructor role in August
     2026). Closes on "without reducing someone to a diagnosis," which is
     the differentiator against the clinical/impersonal alternative.
   - Para 2: Therapy style preview (warm + direct + grounded — reassures
     high-achievers who fear "just talking about feelings")
   - Credentials list: scannable proof points for the researcher persona
   ========================================================================== */
function About() {
  return (
    <section id="about" className="bg-cream-light px-5 py-14 md:px-12 lg:px-20 md:py-20">
      <div className="md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] md:gap-12 lg:gap-16 md:items-start">
        {/* Desktop only — constrained width so it doesn't dominate the section.
            max-h caps the height so it stays proportional to the text beside it. */}
        <div className="hidden md:block">
          <Image
            src="/rebecca-about.jpeg"
            alt="Rebecca Silverman, therapist, in her practice"
            width={533}
            height={800}
            className="w-full max-h-[420px] object-cover object-top rounded"
            sizes="(max-width: 767px) 1px, 320px"
            loading="lazy"
          />
        </div>

        <div>
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-3">
            About
          </p>
          <h2 className="font-display text-[2rem] md:text-[2.5rem] font-light text-text-primary leading-tight mb-5">
            Hi, I&rsquo;m <em className="italic text-sage">Becca</em>.
          </h2>

          {/* First name ("Becca") is intentional — creates immediate warmth
              and breaks the clinical distance. She can always introduce
              herself formally in sessions. */}
          <p className="text-[0.92rem] leading-relaxed mb-4">
            I&rsquo;m a licensed psychotherapist. I spent ten years in
            pediatric psychiatry at NewYork-Presbyterian as a staff therapist
            and held a faculty appointment as a Clinical Instructor at
            Columbia University Medical Center. This experience shaped how I
            understand and treat emotional and behavioral challenges across
            the lifespan. I&rsquo;ve learned to make sense of complex clinical
            concerns without reducing someone to a diagnosis or a set of
            symptoms. Today, I bring that foundation into my work in a way
            that is practical, thoughtful, and tailored to each person,
            couple, and family I see.
          </p>
          <p className="text-[0.92rem] leading-relaxed mb-4">
            My therapy style is warm, direct, and grounded. I&rsquo;ll meet
            you with empathy while gently challenging you to build insight,
            develop practical tools, and create meaningful, lasting change.
          </p>

          {/* Credentials as structured list — scannable for the researcher
              persona who checks everything. Dot markers in sage for
              visual consistency with the brand. */}
          <div className="mt-6 pt-6 border-t border-sand flex flex-col gap-2">
            {[
              "Licensed Clinical Social Worker (LCSW), New York State",
              "Former Clinical Instructor in Pediatric Psychiatry, Columbia University Medical Center",
              "MSW, Silberman School of Social Work, Hunter College",
              "Trained in CBT, DBT, parent management training & family-based interventions",
              "Additional training in mindfulness-based and attachment-based therapies",
              "Bilingual: English & Spanish",
            ].map((cred) => (
              <div key={cred} className="text-[0.78rem] text-tan flex items-center gap-2.5">
                <span className="w-[5px] h-[5px] bg-sage-light rounded-full shrink-0" />
                {cred}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SPECIALTIES GRID
   6 cards, 3×2 on desktop, stacked on mobile.

   Each specialty is written from the CLIENT's perspective, not the
   therapist's. Instead of "I treat anxiety," it's "the chronic stress
   of performing at a high level while feeling like you're barely
   holding it together." This is the key copy shift from the current site.

   The icons use simple Unicode geometric shapes — they add visual
   rhythm without introducing stock imagery or illustration dependencies.
   ========================================================================== */
function Specialties() {
  /* Card copy is written to mirror how clients actually search.
     Phrases like "high-functioning anxiety," "premarital counseling,"
     "imposter syndrome," "ADHD parenting," and "OCD" are the literal
     queries NYC private-pay clients type into Google — weaving them
     into the descriptions doubles as SEO without reading as a keyword
     stuffing list. */
  const specialties = [
    {
      icon: "◐",
      title: "Couples & Relationships",
      desc: "The same argument on repeat. Months of feeling more like roommates than partners. Trust that needs rebuilding. We'll find the pattern underneath the conflict and help you actually hear each other again.",
      href: "/couples-therapy-nyc",
    },
    {
      icon: "◉",
      title: "Anxiety & Overwhelm",
      desc: "You look calm on the outside while you're overthinking, second-guessing yourself, and quietly bracing to keep it all from slipping. We'll work on what's driving it, not just how to breathe through it.",
      href: "/anxiety-therapist-nyc",
    },
    {
      icon: "◇",
      title: "Parenting & Family Dynamics",
      desc: "A child with big feelings, anxiety, or behavior that wears you down can leave even capable parents depleted. I help you build a calmer home, fewer power struggles, and a steadier connection with your kid.",
      href: "/parent-coaching-nyc",
    },
    {
      icon: "◆",
      title: "Adolescents & Young Adults",
      desc: "Teens and young adults navigating anxiety, school pressure, big emotions, and shifting family relationships. Real, direct work that meets them where they actually are.",
      href: "/teen-therapy-nyc",
    },
    {
      icon: "◎",
      title: "OCD & Intrusive Thoughts",
      desc: "Intrusive thoughts you'd never act on. Relentless doubt. Rituals and reassurance-seeking that quiet it for a moment, then start again. Structured, proven treatment to loosen its grip.",
      href: "/ocd-therapist-nyc",
    },
    {
      icon: "◈",
      title: "Life Transitions & Low Mood",
      desc: "A career pivot, new parenthood, a loss, a question of who you are now. Or a flatness where nothing's technically wrong and nothing quite feels right. We'll help you find your footing again.",
    },
  ];

  return (
    <section id="specialties" className="px-5 py-14 md:px-12 lg:px-20 md:py-20">
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-3">
        Specialties
      </p>
      <h2 className="font-display text-[2rem] md:text-[2.5rem] font-light text-text-primary leading-tight mb-6">
        What I help <em className="italic text-sage">people with</em>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {specialties.map((s) => {
          const card = (
            <>
              <h3 className="font-display text-xl font-normal text-text-primary mb-2">
                <span className="mr-2">{s.icon}</span>
                {s.title}
              </h3>
              <p className="text-[0.85rem] text-text-body leading-relaxed">
                {s.desc}
              </p>
              {s.href && (
                <p className="mt-4 text-[0.72rem] tracking-wider uppercase text-sage">
                  Learn more →
                </p>
              )}
            </>
          );

          /* Cards that have a dedicated landing page link to it. The plain
             cards stay rendered as divs so the grid keeps its rhythm even
             when not every card has a destination. */
          return s.href ? (
            <Link
              key={s.title}
              href={s.href}
              className="bg-cream-light p-7 rounded border border-sand hover:border-sage transition-colors no-underline block"
            >
              {card}
            </Link>
          ) : (
            <div
              key={s.title}
              className="bg-cream-light p-7 rounded border border-sand"
            >
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ==========================================================================
   APPROACH SECTION
   Dark background creates a visual "pause" — breaking the warm cream
   pattern forces re-engagement. This is a conversion psychology technique:
   contrast draws the eye and resets attention.

   The modality pills serve dual purpose:
   1. SEO — each modality is a searchable term
   2. Credibility — clinicians and informed clients recognize these
   ========================================================================== */
function Approach() {
  const modalities = [
    "CBT",
    "Mindfulness-Based",
    "Relational",
    "Psychodynamic",
    "Attachment-Based",
  ];

  return (
    <section id="approach" className="bg-dark text-dark-text px-5 py-14 md:px-12 lg:px-20 md:py-20">
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage-light mb-3">
        My Approach
      </p>
      <h2 className="font-display text-[2rem] md:text-[2.5rem] font-light leading-tight mb-5">
        How I <em className="italic text-sage-light">actually</em> work
      </h2>

      {/* Copy addresses the high-achiever's skepticism about therapy:
          "I don't believe in therapy that stays in the therapy room"
          signals this is practical, results-oriented work — not
          open-ended navel-gazing. Critical for converting the finance/
          law/tech persona who values ROI on everything. */}
      <p className="text-[0.95rem] leading-relaxed text-dark-muted mb-5 max-w-2xl">
        I believe therapy should create change beyond the therapy room.
        Together, we&rsquo;ll build insight, strengthen practical skills, and
        help you show up differently in your relationships, work, and everyday
        life.
      </p>
      <p className="text-[0.95rem] leading-relaxed text-dark-muted mb-5 max-w-2xl">
        My approach is warm, collaborative, and tailored to you, combining
        evidence-based strategies with deeper relational work so therapy feels
        both supportive and effective.
      </p>

      <div className="flex flex-wrap gap-2.5 mt-6">
        {modalities.map((m) => (
          <span
            key={m}
            className="px-4 py-2 border border-sage-muted rounded-sm text-[0.7rem] tracking-wider uppercase text-sage-light"
          >
            {m}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ==========================================================================
   LOGISTICS / FEES
   Practical details a visitor wants before reaching out: how sessions
   work and how payment works. Fees themselves are shared during the
   initial consultation (see the note inside the section).

   The superbill explainer card addresses the most common objection to
   private pay, "I have insurance", by explaining out-of-network
   reimbursement.
   ========================================================================== */
function Logistics() {
  return (
    <section id="details" className="bg-cream-light px-5 py-14 md:px-12 lg:px-20 md:py-20">
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-3">
        The Details
      </p>
      <h2 className="font-display text-[2rem] md:text-[2.5rem] font-light text-text-primary leading-tight mb-6">
        What to <em className="italic text-sage">expect</em>
      </h2>

      {/* Rates hidden by design. After surveying NYC private-pay practices in
          Becca's tier, the cleanest move is to share fees during the consult
          rather than display them up front. The Sessions card still answers
          the practical questions visitors actually want; the Fees card keeps
          Becca's superbill explainer verbatim (minus the em dash). */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        <div className="bg-cream border border-sand rounded p-6 md:p-7">
          <h3 className="font-display text-xl text-text-primary mb-3">
            Sessions
          </h3>
          <p className="text-[0.88rem] text-text-body leading-relaxed">
            My practice is predominantly virtual. Inquire about in-person
            sessions in Williamsburg.
          </p>
        </div>
        <div className="bg-cream border border-sand rounded p-6 md:p-7">
          <h3 className="font-display text-xl text-text-primary mb-3">
            Fees &amp; Insurance
          </h3>
          <p className="text-[0.88rem] text-text-body leading-relaxed">
            Fees are shared during the initial consultation. I am a{" "}
            <strong className="text-sage font-medium">private-pay practice</strong>{" "}
            and do not accept insurance directly. I provide superbills
            (itemized receipts) you can submit for out-of-network
            reimbursement, and many clients receive 50 to 80% back. Happy to
            help you check your benefits before we start.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   REVIEWS
   Real patient reviews pulled verbatim from Rebecca's Zocdoc profile
   (4.9 average across 18 reviews). Longer reviews are trimmed with an
   ellipsis but never reworded; attribution matches how Zocdoc displays each
   reviewer (first name + last initial, or initials). The section links back
   to the source so anyone can verify. The peer-clinician endorsement closes
   it out as a distinct, professional voice — different proof, kept separate
   from the patient quotes.
   ========================================================================== */
const ZOCDOC_URL =
  "https://www.zocdoc.com/professional/rebecca-silverman-lcsw-305331";

function Stars() {
  return (
    <span
      className="text-sage text-[0.85rem] tracking-[0.15em]"
      aria-label="5 out of 5 stars"
    >
      ★★★★★
    </span>
  );
}

function Reviews() {
  const reviews = [
    {
      quote:
        "Rebecca Silverman is amazing. She is incredibly insightful, compassionate, professional, very calm and understanding. I never felt judged or pressured to talk … like I have a very intelligent friend.",
      name: "JB",
      verified: false,
    },
    {
      quote:
        "She was really able to help me hone in on how to clearly communicate my message. Rebecca listens, provides good perspectives, and is thoughtful.",
      name: "Gerald A.",
      verified: true,
    },
    {
      quote:
        "Excellent experience. Rebecca is warm, professional. She made me feel comfortable right away. She listened carefully, was very understanding, and took the time to address my concerns without making me feel rushed. I highly recommend her to anyone looking for a compassionate therapist.",
      name: "AF",
      verified: true,
    },
    {
      quote:
        "Rebecca is great, thoughtful, has good intuition about when to push and when to listen. As a result of couples therapy I've been recommending it to all of my friends, but I find myself actually just recommending her more than couples therapy itself. 11/10.",
      name: "JB",
      verified: true,
    },
  ];

  return (
    <section
      aria-label="Patient reviews"
      className="bg-cream-light border-y border-sand px-5 py-14 md:px-12 lg:px-20 md:py-20"
    >
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-3 text-center">
        What Clients Say
      </p>
      <h2 className="font-display text-[2rem] md:text-[2.5rem] font-light text-text-primary leading-tight mb-4 text-center">
        In their <em className="italic text-sage">own words</em>
      </h2>
      {/* Links to Zocdoc rather than standing as bare text. The rating used
          to also be emitted as aggregateRating JSON-LD, which was removed:
          Google discards review markup a business publishes about itself and
          treats it as a manual-action risk. Pointing the visible figure at
          the third party that actually holds the reviews is the legitimate
          version of the same signal — a reader can verify it, and Zocdoc is
          declared in the MedicalBusiness `sameAs` so the association is
          still machine-readable. */}
      <p className="flex flex-wrap items-center justify-center gap-2.5 text-[0.85rem] text-text-muted mb-10">
        <Stars />
        <a
          href={ZOCDOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group no-underline text-text-muted"
        >
          <strong className="text-text-primary font-medium">4.9</strong> average
          across{" "}
          <span className="underline underline-offset-2 decoration-sand group-hover:text-sage transition-colors">
            18 verified reviews on Zocdoc
          </span>
        </a>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {reviews.map((r, i) => (
          <figure
            key={i}
            className="bg-cream border border-sand rounded p-7 flex flex-col"
          >
            <Stars />
            <blockquote className="text-[0.9rem] leading-relaxed text-text-body mt-3 mb-5 flex-1">
              {r.quote}
            </blockquote>
            <figcaption className="text-[0.72rem] tracking-wider uppercase text-tan">
              {r.name}
              {r.verified ? " · Verified patient" : ""} · Zocdoc
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="text-center mt-8">
        <a
          href={ZOCDOC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.82rem] text-sage underline underline-offset-4 decoration-sand hover:decoration-sage transition-colors"
        >
          Read all 18 reviews on Zocdoc →
        </a>
      </div>

      {/* Peer-clinician endorsement — a different, professional kind of proof,
          kept visually distinct from the patient voices above. */}
      <div className="max-w-xl mx-auto text-center mt-14 pt-10 border-t border-sand">
        <p className="font-display text-lg md:text-xl font-light italic leading-snug text-text-primary mb-3">
          Rebecca is a smart, thoughtful, caring, and warm therapist who
          practices authentically while maintaining a deeply safe and nurturing
          environment. She is committed to her craft. I highly recommend.
        </p>
        <p className="text-[0.72rem] tracking-wider uppercase text-tan">
          Peer Clinician Endorsement
        </p>
      </div>
    </section>
  );
}

/* ==========================================================================
   BOOKING CTA
   Warm gradient background creates a "destination" feel — the page
   has been building to this moment.

   "Let's see if we're a good fit" frames the consult as mutual
   evaluation, not a sales pitch — reduces pressure and increases
   conversion for high-autonomy professionals.

   "No pressure, no commitment" explicitly handles the commitment
   objection. "15 minutes" sets a time boundary that busy professionals
   appreciate.
   ========================================================================== */
function BookingCTA() {
  return (
    <section
      id="booking"
      className="text-center px-5 py-16 md:py-24"
      style={{
        background:
          "linear-gradient(160deg, #E8D5C8 0%, #E8E0D4 40%, rgba(168,181,160,0.2) 100%)",
      }}
    >
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-3">
        Get Started
      </p>
      <h2 className="font-display text-[2rem] md:text-[2.5rem] font-light text-text-primary leading-tight mb-4">
        Let&rsquo;s see if we&rsquo;re a <em className="italic text-sage">good fit</em>
      </h2>
      <p className="text-[0.95rem] text-text-body max-w-md mx-auto mb-8 leading-relaxed">
        Send a message and I&rsquo;ll be in touch within a few business days.
        No pressure, no commitment, just a chance to ask questions and see if
        working together feels right.
      </p>
      <a
        href="/contact"
        className="inline-block bg-sage text-cream-light px-10 py-4 font-body text-[0.78rem] tracking-wider uppercase no-underline rounded-sm hover:opacity-90 transition-opacity"
      >
        Send a Message
      </a>
      <p className="mt-5 text-[0.72rem] text-tan">
        Currently accepting new clients · Weekday &amp; weekend availability
      </p>
    </section>
  );
}

/* ==========================================================================
   FAQ
   Placed immediately before the booking CTA: these are the last practical
   objections between reading and reaching out (cost, insurance, location,
   what actually happens first), so they belong at the decision point
   rather than buried mid-page.

   Both this section and the FAQPage JSON-LD below render from the same
   HOME_FAQ array in _lib/faq.ts. Google requires FAQ markup to reproduce
   content that is actually visible on the page, and the usual way sites
   violate that is drift — someone edits the copy months later and forgets
   the separate hand-written JSON-LD. Sharing one array makes that
   impossible rather than merely unlikely.

   <dl> rather than <div>s: a question/answer list is the semantic case
   description lists exist for, and it gives screen readers the pairing.
   ========================================================================== */
function Faq() {
  return (
    <section
      id="faq"
      className="px-5 py-14 md:px-12 lg:px-20 md:py-20"
      aria-labelledby="faq-heading"
    >
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-3">
        Questions
      </p>
      <h2
        id="faq-heading"
        className="font-display text-[2rem] md:text-[2.5rem] font-light text-text-primary leading-tight mb-8"
      >
        Before you <em className="italic text-sage">reach out</em>
      </h2>

      <dl className="max-w-4xl grid gap-7 md:grid-cols-2 md:gap-x-12 md:gap-y-9">
        {HOME_FAQ.map(({ q, a }) => (
          <div key={q}>
            <dt className="font-display text-[1.15rem] italic text-text-primary mb-2">
              {q}
            </dt>
            <dd className="text-[0.92rem] leading-relaxed text-text-body">
              {a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ==========================================================================
   PAGE COMPONENT — assembles all sections in conversion-optimized order
   ========================================================================== */
export default function Home() {
  return (
    <>
      {/* FAQPage structured data, serialized from the same HOME_FAQ array
          the <Faq /> section renders — the markup cannot describe an answer
          a visitor can't see.

          Passed as a script CHILD rather than via a raw-HTML prop. React
          does not HTML-escape script children (so the JSON survives intact)
          and it independently escapes any literal "</script>" sequence,
          which is the one real injection vector for a JSON-LD block. That
          makes this both safer and simpler than setting inner HTML. */}
      <script type="application/ld+json">
        {JSON.stringify(faqPageJsonLd())}
      </script>
      <SiteNav mode="home" />
      <main>
        <Hero />
        <WhyClientsWorkWithMe />
        <About />
        <Specialties />
        <Approach />
        <Logistics />
        <Reviews />
        <Faq />
        <BookingCTA />
      </main>
      <SiteFooter />
    </>
  );
}
