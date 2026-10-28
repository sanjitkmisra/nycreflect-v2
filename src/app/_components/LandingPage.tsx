import Link from "next/link";
import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

/**
 * Layout primitives for the SEO landing pages (/parent-coaching-nyc,
 * /anxiety-therapist-nyc, etc). Each page composes these so the visual
 * rhythm stays identical across pages while the copy stays unique.
 */

export function LandingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="px-5 pt-28 pb-12 md:px-12 lg:px-20 md:pt-32 md:pb-16">
        <article className="max-w-3xl mx-auto">{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}

export function LandingHero({
  eyebrow,
  h1,
  intro,
}: {
  eyebrow: string;
  h1: ReactNode;
  intro: ReactNode;
}) {
  return (
    <header className="mb-12 md:mb-16">
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-4">
        {eyebrow}
      </p>
      <h1 className="font-display text-[2.4rem] md:text-[3.2rem] font-light leading-[1.15] text-text-primary mb-6">
        {h1}
      </h1>
      <div className="text-[0.98rem] md:text-[1.05rem] leading-relaxed text-text-body max-w-2xl flex flex-col gap-4">
        {intro}
      </div>
    </header>
  );
}

export function Section({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-10 md:mb-14">
      {title && (
        <h2 className="font-display text-[1.55rem] md:text-[1.9rem] font-light text-text-primary leading-tight mb-4">
          {title}
        </h2>
      )}
      <div className="text-[0.95rem] leading-relaxed text-text-body flex flex-col gap-4">
        {children}
      </div>
    </section>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 mt-1">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-text-body"
        >
          <span
            className="w-[5px] h-[5px] bg-sage rounded-full mt-2.5 shrink-0"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function FAQ({
  items,
}: {
  items: { q: string; a: ReactNode }[];
}) {
  return (
    <Section title="Common questions">
      <div className="flex flex-col gap-6 mt-2">
        {items.map(({ q, a }) => (
          <div key={q}>
            <p className="font-display text-[1.1rem] text-text-primary mb-2 italic">
              {q}
            </p>
            <div className="text-[0.95rem] leading-relaxed text-text-body">
              {a}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function LandingCTA({
  heading,
  body,
}: {
  heading: ReactNode;
  body: string;
}) {
  return (
    <section
      className="text-center px-6 py-12 md:py-16 rounded my-12"
      style={{
        background:
          "linear-gradient(160deg, #E8D5C8 0%, #E8E0D4 40%, rgba(168,181,160,0.2) 100%)",
      }}
    >
      <h2 className="font-display text-[1.8rem] md:text-[2.2rem] font-light text-text-primary leading-tight mb-4">
        {heading}
      </h2>
      <p className="text-[0.95rem] text-text-body max-w-md mx-auto mb-7 leading-relaxed">
        {body}
      </p>
      <Link
        href="/contact"
        className="inline-block bg-sage text-cream-light px-10 py-4 font-body text-[0.78rem] tracking-wider uppercase no-underline rounded-sm hover:opacity-90 transition-opacity"
      >
        Send a Message
      </Link>
    </section>
  );
}

export function RelatedLinks({
  here,
}: {
  here: string;
}) {
  const all = [
    { href: "/anxiety-therapist-nyc", label: "Anxiety therapy in NYC" },
    { href: "/couples-therapy-nyc", label: "Couples therapy in NYC" },
    { href: "/premarital-counseling-nyc", label: "Premarital counseling in NYC" },
    { href: "/parent-coaching-nyc", label: "Parent coaching in NYC" },
    { href: "/teen-therapy-nyc", label: "Teen therapy in NYC" },
    { href: "/ocd-therapist-nyc", label: "OCD therapy in NYC" },
  ];
  const others = all.filter((l) => l.href !== here);

  return (
    <section className="mb-10 md:mb-14 border-t border-sand pt-8">
      <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-4">
        Other areas I work in
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {others.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-[0.92rem] text-text-body underline underline-offset-4 decoration-sand hover:text-sage transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
