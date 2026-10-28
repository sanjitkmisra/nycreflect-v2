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
  path: "/teen-therapy-nyc",
  title: "Teen Therapy NYC | Rebecca Silverman, LCSW",
  description:
    "Therapy for teens and young adults in NYC. Anxiety, OCD, perfectionism, school stress, social and family conflict. Columbia-trained, 10+ years at NYP.",
});

export default function TeenTherapyPage() {
  return (
    <LandingShell>
      <LandingHero
        eyebrow="Teen & Adolescent Therapy · NYC"
        h1={
          <>
            Most teens don’t show up{" "}
            <em className="italic text-sage">wanting therapy</em>.
          </>
        }
        intro={
          <>
            <p>
              They show up because a parent thinks they need it, because
              something happened at school, because they’re anxious,
              because they can’t sleep, because they’re not
              themselves. Sometimes they’re skeptical. That’s a
              fine place to start.
            </p>
          </>
        }
      />

      <Section title="What I work on with teens and young adults">
        <p>
          Most of my teen clients aren’t in crisis. They’re
          navigating something real: an anxiety that’s gotten louder, a
          perfectionism that’s stopped feeling worth it, a friendship
          that fell apart, a school dynamic that isn’t working. Some are
          dealing with OCD, panic, depression, or social anxiety. Many are
          smart, self-aware kids who’d rather be doing anything else
          than sitting in a therapy office talking about feelings. That’s
          also a fine starting point.
        </p>
        <BulletList
          items={[
            "Anxiety, panic, and the pressure of NYC school environments",
            "Perfectionism that’s stopped feeling worth it",
            "Emotions and reactions that feel out of their control",
            "Friendships, social life, and the parent-teen relationship",
            "Big transitions: college, gap years, who they’re becoming",
          ]}
        />
      </Section>

      <Section title="How I work with teens">
        <p>
          My approach is direct, warm, and not particularly precious. Teens
          can tell when they’re being talked down to or worked on. I’m
          interested in their actual lives, not a sanitized version. We’ll
          figure out together what they want to work on.
        </p>
        <p>
          In session, I’ll share what I’m noticing, ask questions
          they may not have been asked, and gently challenge them when
          something is worth pushing on. Parents stay in the loop on the
          structure of the work but not on what your kid says in session.
          That’s a clinical standard, and it’s also what makes
          the work possible.
        </p>
      </Section>

      <Section title="My background">
        <p>
          I’m a former clinical instructor at Columbia University’s
          Department of Psychiatry. I spent a decade in Child and Adolescent
          Behavioral Health at NewYork-Presbyterian / Columbia, working with
          teens across diagnoses and including some of the most complex
          presentations. I’m formally trained in CBT, DBT,
          exposure-based approaches, and family-based interventions.
        </p>
      </Section>

      <Section title="A note for parents">
        <p>
          You don’t have to wait until something is really wrong. A lot
          of the most effective teen work happens earlier, before patterns
          get entrenched. If you’re unsure whether your kid would
          benefit, that’s a good question to start with on the consult.
        </p>
        <p>
          Your teen has to want to come, at least a little. If they
          don’t, we can talk about how to have that conversation, or
          whether{" "}
          <a
            href="/parent-coaching-nyc"
            className="text-sage underline underline-offset-2"
          >
            parent coaching
          </a>{" "}
          is a better starting place for now.
        </p>
      </Section>

      <FAQ
        items={[
          {
            q: "How do I know if my kid needs therapy?",
            a: (
              <p>
                A good question for the consult. Some signs: sleep is off,
                school is off, they’ve pulled away from friends or you,
                they’re more irritable than usual, or you just have a
                gut sense something is off. Trust the gut sense.
              </p>
            ),
          },
          {
            q: "Do you tell parents what we talk about?",
            a: (
              <p>
                No, not the content. I’ll keep parents informed about
                the structure of the work, any safety concerns, and the broad
                themes if relevant. But what your kid says stays between us.
                That’s what makes the work possible.
              </p>
            ),
          },
          {
            q: "Can we do virtual sessions?",
            a: (
              <p>
                Yes. Many teens prefer it. Some prefer in-person. We can do
                either or a mix.
              </p>
            ),
          },
          {
            q: "What ages do you work with?",
            a: (
              <p>
                Mostly 13 to 25. For younger kids, I usually recommend{" "}
                <a
                  href="/parent-coaching-nyc"
                  className="text-sage underline underline-offset-2"
                >
                  parent coaching
                </a>{" "}
                as the more effective starting place.
              </p>
            ),
          },
        ]}
      />

      <LandingCTA
        heading={
          <>
            If something feels{" "}
            <em className="italic text-sage">off with your teen</em>, let’s
            talk.
          </>
        }
        body="Send a few sentences about what's going on. I'll be in touch within a few business days."
      />

      <RelatedLinks here="/teen-therapy-nyc" />
    </LandingShell>
  );
}
