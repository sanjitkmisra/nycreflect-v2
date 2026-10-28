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
  path: "/anxiety-therapist-nyc",
  title: "Anxiety Therapist NYC | Rebecca Silverman, LCSW",
  description:
    "Therapy for anxiety in New York. High-functioning anxiety, perfectionism, burnout, overthinking, panic. Columbia-trained, evidence-based work (CBT and DBT).",
});

export default function AnxietyPage() {
  return (
    <LandingShell>
      <LandingHero
        eyebrow="Anxiety Therapy · NYC"
        h1={
          <>
            Most of my clients with anxiety look like{" "}
            <em className="italic text-sage">they’re doing great</em>.
          </>
        }
        intro={
          <>
            <p>
              You’re meeting the deadlines. You’re showing up to
              the dinners. You’re working out, eating well, journaling,
              probably meditating. And it’s still there: the tightness
              in your chest, the spiral at 2am, the feeling that you’re
              holding it all together with both hands.
            </p>
          </>
        }
      />

      <Section title="What anxiety often looks like for the people I work with">
        <p>
          Replaying conversations long after they’re over. Feeling behind
          even when you’re ahead. Exhausted but unable to slow down,
          successful but never quite trusting it, and then the sleep that goes
          sideways the second your head hits the pillow.
        </p>
        <p>
          For some it’s social anxiety, panic, or OCD. For others it’s
          a low-grade buzz that never fully switches off. Most have spent years
          managing it alone and want help that doesn’t just tell them to
          breathe.
        </p>
      </Section>

      <Section title="How I work with anxiety">
        <p>
          In sessions, I’ll share what I’m noticing, ask questions
          when something matters, and gently challenge you when it’s
          useful. We’ll work with the patterns and the practical tools
          at the same time, drawing on CBT and DBT but always tied back to
          what’s actually true for you.
        </p>
        <p>
          We’ll look at what’s driving the anxiety: the patterns
          from family, the relationships, the work life, the parts of you
          that learned anxiety was the way to stay safe. My goal is to help
          you use that awareness to shift things, so you can feel more
          grounded, more in control, and more like yourself again.
        </p>
        <p>
          Most clients start to feel different in the first month.
        </p>
      </Section>

      <Section title="My background">
        <p>
          I’m a licensed psychotherapist and a former clinical
          instructor at Columbia University’s Department of Psychiatry. I’ve
          worked with anxiety across the full range, from high-functioning
          professionals to severe and treatment-resistant presentations,
          including a decade in Child and Adolescent Behavioral Health at
          NewYork-Presbyterian / Columbia. I’m formally trained in CBT,
          DBT, exposure-based approaches, and mindfulness-based interventions.
        </p>
      </Section>

      <FAQ
        items={[
          {
            q: "Is this CBT?",
            a: (
              <p>
                CBT is part of what I do. Most anxiety work benefits from a
                deeper look at the patterns and history underneath the symptoms,
                so we draw on a few different frames depending on what fits.
              </p>
            ),
          },
          {
            q: "Do I need medication?",
            a: (
              <p>
                Maybe, maybe not. I’m not a prescriber, but I work
                alongside psychiatrists when medication is part of the picture.
                We can talk about whether to consider a consult.
              </p>
            ),
          },
          {
            q: "How long does this take?",
            a: (
              <p>
                Most people start feeling different in 4 to 8 weeks. Real,
                durable change is usually 6 months to a year. Some clients stay
                longer to work on deeper patterns; others wrap up sooner.
              </p>
            ),
          },
          {
            q: "What if I’ve already tried therapy?",
            a: (
              <p>
                A lot of my clients have. We can talk about what worked, what
                didn’t, and whether what I do is likely to be different
                enough to be worth your time.
              </p>
            ),
          },
        ]}
      />

      <LandingCTA
        heading={
          <>
            If you’re tired of trying to{" "}
            <em className="italic text-sage">manage it</em>, let’s talk.
          </>
        }
        body="Send a few sentences about what's going on. I'll be in touch within a few business days."
      />

      <RelatedLinks here="/anxiety-therapist-nyc" />
    </LandingShell>
  );
}
