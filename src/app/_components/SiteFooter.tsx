export function SiteFooter() {
  return (
    <footer className="bg-dark text-dark-subtle text-center px-5 py-8">
      <span className="font-display text-base text-dark-text/65 block mb-3">
        Rebecca Silverman, LCSW
      </span>
      <div className="flex justify-center gap-6 mb-4">
        <a
          href="mailto:Nycreflect@gmail.com"
          className="text-dark-subtle text-[0.72rem] tracking-wider uppercase no-underline hover:text-dark-text/70 transition-colors"
        >
          Email
        </a>
        <a
          href="tel:6462856294"
          className="text-dark-subtle text-[0.72rem] tracking-wider uppercase no-underline hover:text-dark-text/70 transition-colors"
        >
          646-285-6294
        </a>
        <a
          href="https://www.psychologytoday.com/us/therapists/rebecca-silverman-new-york-ny/783976"
          target="_blank"
          rel="noopener noreferrer"
          className="text-dark-subtle text-[0.72rem] tracking-wider uppercase no-underline hover:text-dark-text/70 transition-colors"
        >
          Psych Today
        </a>
      </div>
      <small className="text-[0.65rem]">
        © 2026 Rebecca Silverman, LCSW · New York, NY ·
        This website does not constitute medical advice. If you are in crisis,
        call 988 or go to your nearest emergency room.
      </small>
    </footer>
  );
}
