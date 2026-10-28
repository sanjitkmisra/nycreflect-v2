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
  path: "/premarital-counseling-nyc",
  title: "Premarital Counseling NYC | Rebecca Silverman, LCSW",
  description:
    "Premarital counseling in New York for engaged couples and partners building toward marriage. Columbia-trained, evidence-based, secular.",
});

export default function PremaritalPage() {
  return (
    <LandingShell>
      <LandingHero
        eyebrow="Premarital Counseling · NYC"
        h1={
          <>
            Premarital work isn’t a sign something’s wrong. It’s
            a sign you’re{" "}
            <em className="italic text-sage">taking this seriously</em>.
          </>
        }
        intro={
          <>
            <p>
              You’re not waiting until you’re stuck. You’re
              using the time when things are still good to learn how to handle
              the hard parts before they show up.
            </p>
          </>
        }
      />

      <Section title="Who comes for premarital work">
        <p>
          Most premarital couples I see are doing well and want to do better.
          You’re planning a wedding, you’ve been together a few
          years, and you’ve started noticing things you wish you handled
          differently. Maybe one of you shuts down during conflict. Maybe you
          have very different families of origin. Maybe you’ve been
          together long enough to know the patterns you’re worried about
          repeating.
        </p>
        <p>
          Some couples come in around specific topics: kids, money, in-laws,
          careers, where to live. Others come in less for a specific issue and
          more to build a shared language for how you’ll handle whatever
          comes up.
        </p>
      </Section>

      <Section title="What we’ll cover">
        <BulletList
          items={[
            "Conflict styles and how to repair after a fight that went sideways",
            "Communication patterns under stress",
            "Expectations around money, time, work, sex, kids, family",
            "Family-of-origin dynamics and how they show up in your relationship",
            "The hard topics you’ve been avoiding",
            "What each of you needs in order to feel close",
          ]}
        />
        <p>
          It’s not therapy in the traditional sense. It’s more like
          building a toolkit together, with someone who can name the patterns
          you can’t yet see.
        </p>
      </Section>

      <Section title="Why this works">
        <p>
          Most relationship problems aren’t unique. Couples therapists
          see the same patterns over and over: pursue and withdraw, criticism
          and defensiveness, the imbalance of emotional labor, the parents you
          didn’t realize were in the room with you. Naming these
          patterns before you’re stuck in them gives you a real
          advantage.
        </p>
        <p>
          My role here is to share what I’m noticing about the dynamic
          between you, ask questions you may not have asked each other, and
          gently push you when I see something worth pushing on. I’m a
          former clinical instructor at Columbia and I’ve spent over a decade
          with couples across the full range. Premarital is some of the most
          rewarding work I do because the foundation we build sticks.
        </p>
      </Section>

      <FAQ
        items={[
          {
            q: "Do you have to be religious or affiliated?",
            a: (
              <p>
                No. This is secular premarital work. Some couples are doing
                this in addition to religious counseling required by their
                tradition. Others are just doing this.
              </p>
            ),
          },
          {
            q: "How long?",
            a: (
              <p>
                Most couples do 6 to 12 sessions, weekly. Some do more if
                there’s a specific issue they want to work on.
              </p>
            ),
          },
          {
            q: "Can we start before we’re engaged?",
            a: (
              <p>
                Yes. A lot of couples come in while they’re seriously
                considering it. It’s also a good time to think about
                whether this is right.
              </p>
            ),
          },
        ]}
      />

      <LandingCTA
        heading={
          <>
            Build the toolkit{" "}
            <em className="italic text-sage">before you need it</em>.
          </>
        }
        body="Send a few sentences about where you are and what you'd want to get out of this. I'll be in touch within a few business days."
      />

      <RelatedLinks here="/premarital-counseling-nyc" />
    </LandingShell>
  );
}
