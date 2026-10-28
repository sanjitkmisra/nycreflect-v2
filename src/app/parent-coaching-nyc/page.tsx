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
  path: "/parent-coaching-nyc",
  title: "Parent Coaching NYC | Rebecca Silverman, LCSW",
  description:
    "Parent coaching in NYC for parents of kids with anxiety, ADHD, behavioral challenges, or school refusal. Columbia-trained, 10+ years at NYP / Columbia.",
});

export default function ParentCoachingPage() {
  return (
    <LandingShell>
      <LandingHero
        eyebrow="Parent Coaching · NYC"
        h1={
          <>
            Parenting a kid who’s struggling isn’t a{" "}
            <em className="italic text-sage">parenting failure</em>.
          </>
        }
        intro={
          <>
            <p>
              You might be reading every book, listening to the podcasts,
              trying every strategy the school sends home, and still feeling
              like you’re losing the same fight every night.
            </p>
            <p>
              You don’t need a diagnosis or a serious enough problem to
              come in. You just need somewhere to think with someone who’s
              done this work for a long time.
            </p>
          </>
        }
      />

      <Section title="What brings parents in">
        <p>
          Most parents reach out when something at home has stopped working.
          The meltdowns that used to pass don’t. Homework takes two hours
          and ends in tears, sometimes yours. Your kid is talking to you in
          ways you didn’t think were possible at this age, or has stopped
          talking to you altogether.
        </p>
        <p>
          Some parents come in because of a specific diagnosis (an ADHD
          evaluation, anxiety that’s gotten louder, OCD they’re
          trying to understand). Plenty come in without one. Something is off
          and you want help thinking it through.
        </p>
      </Section>

      <Section title="Common things I work on with parents">
        <BulletList
          items={[
            "Big emotions and meltdowns that don't pass the way they used to",
            "ADHD: behavior, homework, school, friendships, transitions",
            "Anxiety in kids and teens, including school refusal",
            "Oppositional behavior, defiance, lying, sibling conflict",
            "A teen who used to talk to you and doesn't anymore",
            "Co-parents who don't agree on how to handle things",
            "Social difficulties, friendship loss, exclusion",
            "The general sense that something is off, before you can name it",
          ]}
        />
      </Section>

      <Section title="What parent coaching actually looks like">
        <p>
          Parent coaching is different from family therapy and different from
          your kid having their own therapist. The work happens with you. We
          meet weekly to start, usually 45 minutes, and we get specific. What
          happened this week. What you tried. What you’d want to do
          differently.
        </p>
        <p>
          In sessions, I’ll share what I’m noticing about
          what’s driving the behavior, ask questions you may not have
          asked yourself, and gently challenge you when I see something useful.
          We’ll build practical strategies you can try that night. Most
          parents notice a shift in the first month, because you’re
          responding differently and the patterns at home start to move.
        </p>
      </Section>

      <Section title="Why I do this work">
        <p>
          I spent a decade in Child and Adolescent Behavioral Health at
          NewYork-Presbyterian / Columbia University Medical Center, working
          with kids and families across diagnoses, ages, and acuity.
          I’m formally trained in Parent Management Training, the
          evidence-based protocol most academic children’s hospitals
          use. Most of what I bring to parent coaching comes from that
          training plus a lot of time watching what actually works in real
          families with real schedules.
        </p>
        <p>
          I’m a former clinical instructor at Columbia University’s
          Department of Psychiatry. I take a collaborative approach: you’ll
          know what we’re doing and why, and we’ll adjust if
          something isn’t working.
        </p>
      </Section>

      <FAQ
        items={[
          {
            q: "Do you need to meet my child?",
            a: (
              <p>
                Usually no. The work is with you. Sometimes a one-time meeting
                with your child can help, but the change happens through what
                you do at home, not through me building a relationship with them.
              </p>
            ),
          },
          {
            q: "What if my child already has a therapist?",
            a: (
              <p>
                That’s great. Parent coaching works well alongside your
                child’s existing therapy. We can coordinate if you want.
              </p>
            ),
          },
          {
            q: "Is this for emergencies or for ongoing support?",
            a: (
              <p>
                Both. Some parents come in during a crisis. Others come in when
                things are mostly fine and they want to be more intentional.
                Both work.
              </p>
            ),
          },
          {
            q: "We’re both parents. Can we both come?",
            a: (
              <p>
                Yes. A lot of the most effective parent coaching happens with
                both parents in the room. We can also start with one of you if
                that’s easier to coordinate.
              </p>
            ),
          },
        ]}
      />

      <LandingCTA
        heading={
          <>
            Let’s talk about what’s{" "}
            <em className="italic text-sage">going on at home</em>.
          </>
        }
        body="Send a few sentences about your kid and what you're noticing. I'll be in touch within a few business days."
      />

      <RelatedLinks here="/parent-coaching-nyc" />
    </LandingShell>
  );
}
