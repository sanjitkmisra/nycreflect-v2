import { pageMetadata } from "../_lib/site";
import {
  LandingShell,
  LandingHero,
  Section,
  BulletList,
  FAQ,
  LandingCTA,
  RelatedLinks,
} from "../_components/LandingPage";

export const metadata = pageMetadata({
  path: "/ocd-therapist-nyc",
  title: "OCD Therapist NYC | Rebecca Silverman, LCSW",
  description:
    "OCD therapy in NYC. Intrusive thoughts, compulsions, harm OCD, relationship OCD, scrupulosity. CBT and exposure-based work. Columbia-trained.",
});

export default function OCDPage() {
  return (
    <LandingShell>
      <LandingHero
        eyebrow="OCD Therapy · NYC"
        h1={
          <>
            OCD doesn’t always look like{" "}
            <em className="italic text-sage">washing your hands</em>.
          </>
        }
        intro={
          <>
            <p>
              It often looks like reviewing a conversation a hundred times to
              make sure you didn’t say something wrong. Or needing to
              know, right now, whether you really love your partner. Or
              rituals around safety, contamination, harm, or how you actually
              feel.
            </p>
            <p>
              The thoughts are intrusive. The compulsions feel necessary. Most
              of the time you know they’re not rational and you still
              can’t stop.
            </p>
          </>
        }
      />

      <Section title="What OCD often actually looks like">
        <BulletList
          items={[
            "Intrusive thoughts that feel completely against who you are",
            "Relentless doubt: do I really love my partner, did I do something wrong",
            "Fears around harm, contamination, or safety",
            "Needing things to feel even, right, or complete",
            "Checking and reassurance-seeking that never quite settles it",
          ]}
        />
        <p>
          If you’ve felt like you can’t tell whether what
          you’re experiencing is anxiety or OCD, that’s a good
          thing to bring to a consult. They overlap and they’re treated
          differently.
        </p>
      </Section>

      <Section title="How OCD treatment works">
        <p>
          OCD has one of the most effective evidence-based treatments in the
          field: a structured approach that combines cognitive-behavioral work
          with exposure and response prevention. The goal isn’t to make
          the intrusive thoughts go away (they don’t, fully, for anyone).
          The goal is to change your relationship to them so they stop
          running your life.
        </p>
        <p>
          In session, I’ll share what I’m noticing about the OCD
          pattern, ask questions about the rituals, and gently push you toward
          the exposures when you’re ready. The work is structured and
          somewhat predictable. You’ll always know what we’re
          working on and why, and nothing happens that you haven’t
          agreed to. Most clients start to feel real change in the first 8 to
          12 weeks.
        </p>
      </Section>

      <Section title="My background">
        <p>
          I’m a former clinical instructor at Columbia University’s
          Department of Psychiatry, with a decade of clinical work that
          includes treating OCD across the full range: high-functioning adults,
          teens with intrusive thoughts, and complex presentations with
          comorbid anxiety, depression, or trauma. OCD treatment is some of
          the most rewarding work I do, because the gains tend to be clear
          and durable.
        </p>
      </Section>

      <FAQ
        items={[
          {
            q: "What if I’m not sure it’s OCD?",
            a: (
              <p>
                That’s common. A consult call is a good place to talk
                through what’s happening and figure out whether
                OCD-specific treatment makes sense.
              </p>
            ),
          },
          {
            q: "Is this ERP?",
            a: (
              <p>
                Exposure and response prevention is part of OCD treatment, yes.
                We build it gradually, you’ll always know what
                we’re working on and why, and nothing happens that you
                haven’t agreed to.
              </p>
            ),
          },
          {
            q: "Do you work with kids and teens with OCD?",
            a: (
              <p>
                Yes. A lot of my OCD experience comes from my work at Columbia
                / NYP with younger clients.
              </p>
            ),
          },
          {
            q: "How long does it take?",
            a: (
              <p>
                Most clients start to feel real change in 8 to 12 weeks. Full
                treatment is usually 4 to 9 months, sometimes longer for more
                complex cases.
              </p>
            ),
          },
        ]}
      />

      <LandingCTA
        heading={
          <>
            If OCD has been running things,{" "}
            <em className="italic text-sage">let’s start changing that</em>.
          </>
        }
        body="Send a few sentences about what you've been experiencing. I'll be in touch within a few business days."
      />

      <RelatedLinks here="/ocd-therapist-nyc" />
    </LandingShell>
  );
}
