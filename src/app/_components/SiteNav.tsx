import Link from "next/link";

type NavMode = "home" | "subpage";

const NAV_SECTIONS = [
  { href: "/#about", label: "About" },
  { href: "/#specialties", label: "Specialties" },
  { href: "/#approach", label: "Approach" },
  { href: "/#details", label: "Details" },
];

/**
 * Shared nav used by every page. `mode` only changes the anchor targets:
 * on the homepage the section links can use bare hashes (#about); on
 * subpages they need full paths (/#about) so the click navigates home
 * and then scrolls. Defaulting to "subpage" is the safer behavior.
 */
export function SiteNav({ mode = "subpage" }: { mode?: NavMode } = {}) {
  const sections = NAV_SECTIONS.map((s) => ({
    ...s,
    href: mode === "home" ? s.href.replace("/", "") : s.href,
  }));

  return (
    <nav
      className="fixed top-0 w-full z-50 px-5 py-4 flex justify-between items-center border-b border-black/[0.04]"
      style={{
        background: "rgba(250,247,242,0.95)",
        backdropFilter: "blur(12px)",
      }}
      aria-label="Main navigation"
    >
      <Link
        href="/"
        className="font-display text-lg text-warm-brown no-underline"
      >
        Rebecca Silverman, LCSW
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {sections.map((s) => (
          <a
            key={s.href}
            href={s.href}
            className="text-xs tracking-widest uppercase text-text-muted hover:text-sage transition-colors no-underline"
          >
            {s.label}
          </a>
        ))}
        <Link
          href="/contact"
          className="bg-sage text-cream-light px-5 py-2.5 text-[0.72rem] tracking-wider uppercase no-underline font-body font-normal rounded-sm hover:opacity-90 transition-opacity"
        >
          Contact
        </Link>
      </div>

      <Link
        href="/contact"
        className="md:hidden bg-sage text-cream-light px-4 py-2 text-[0.72rem] tracking-wider uppercase no-underline font-body font-normal rounded-sm"
      >
        Contact
      </Link>
    </nav>
  );
}
