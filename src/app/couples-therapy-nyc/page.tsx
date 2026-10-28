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
  path: "/couples-therapy-nyc",
  title: "Couples Therapist NYC | Rebecca Silverman, LCSW",
  description:
    "Couples therapy in New York for communication, trust, emotional intimacy, conflict patterns, premarital, and after-kids. Columbia-trained, evidence-based.",
});

export default function CouplesPage() {
  return (
    <LandingShell>
      <LandingHero
        eyebrow="Couples Therapy · NYC"
        h1={
          <>
            Most couples don’t come in because something is wrong. They
            come in because something is{" "}
            <em className="italic text-sage">stuck</em>.
          </>
        }
        intro={
          <>
            <p>
              You’ve had the same fight for the third time this month.
              You’re roommates more than partners. You love each other,
              you just can’t seem to talk about the hard things without
              it going sideways.
            </p>
          </>
        }
      />

      <Section title="What I see in NYC couples">
        <p>
          Most of the couples I work with are doing fine on paper. Two careers,
          full lives, often kids. The issue usually isn’t that you
          don’t love each other. It’s that the way you communicate
          has stopped working, or that you’ve drifted out of the rhythm
          you had when you got together, or that something happened (a
          betrayal, a loss, a fertility journey, a job change, a parenting
          disagreement) that you haven’t been able to repair on your own.
        </p>
        <BulletList
          items={[
            "The same conflict on repeat, escalating or shutting down",
            "Emotional distance after kids, a move, or a career shift",
            "Rebuilding trust after a breach, large or small",
            "Patterns you can both see but can’t seem to change",
            "Premarital work: building the toolkit before you need it",
          ]}
        />
      </Section>

      <Section title="How couples work with me">
        <p>
          My approach is hands-on. We’ll spend the first session or two
          understanding the patterns you’re caught in, then we’ll
          start working on them. I’ll share what I’m noticing in
          real time, ask questions you may not have asked each other, and
          gently challenge each of you when I see something useful. My work is
          informed by attachment theory and emotionally focused (EFT)
          principles, paired with practical communication strategies.
        </p>
        <p>
          Most couples I see feel some movement in the first few sessions. You
          should be able to feel that something is shifting between you. If
          we’re not seeing change, I’ll say so and we’ll
          adjust.
        </p>
      </Section>

      <Section title="My background">
        <p>
          I’m a former clinical instructor at Columbia University’s
          Department of Psychiatry, with formal training in evidence-based
          approaches to couples and family work. I’ve spent over a decade
          working with relationships across the full range: long marriages,
          new partnerships, premarital couples, high-conflict situations, and
          couples who are doing fine and want to build something stronger.
        </p>
      </Section>

      <FAQ
        items={[
          {
            q: "Will we have to talk about our childhoods?",
            a: (
              <p>
                A little. Most patterns in couples come from somewhere, and a
                little context helps. The work is mostly about now, though.
              </p>
            ),
          },
          {
            q: "What if my partner doesn’t want to come?",
            a: (
              <p>
                That’s a common starting place. We can begin one-on-one
                and see if they’d be willing to join later. A lot of
                couples work actually starts with one person.
              </p>
            ),
          },
          {
            q: "Do you take sides?",
            a: (
              <p>
                No. I’ll be honest with both of you, and I’ll push
                back when one of you is missing something. But I’m not a
                referee.
              </p>
            ),
          },
          {
            q: "How long does couples therapy usually take?",
            a: (
              <p>
                Most couples do 12 to 20 sessions. Some wrap up sooner; some
                stay longer for deeper work. We’ll check in regularly
                about whether you’re getting what you came for.
              </p>
            ),
          },
        ]}
      />

      <LandingCTA
        heading={
          <>
            If something feels{" "}
            <em className="italic text-sage">stuck</em>, let’s talk about
            it.
          </>
        }
        body="Send a few sentences about what's going on between you. I'll be in touch within a few business days."
      />

      <RelatedLinks here="/couples-therapy-nyc" />
    </LandingShell>
  );
}
