/**
 * PREVIEW BANNER
 *
 * Only on preview deploys. The GitHub Actions preview job sets
 * NEXT_PUBLIC_PREVIEW_LABEL to the pull request's title at build time, and
 * every preview is also published at one fixed address
 * (nycreflect-preview.vercel.app). The bar tells Becca which change she is
 * looking at there, and that it isn't live yet. Production builds never set
 * the variable, so nothing renders on www.nycreflect.com.
 *
 * Sage rather than dark so it can't be mistaken for the (dark) footer; the
 * spacer keeps the fixed bar from covering the footer's last line.
 */
export function PreviewBanner() {
  const label = process.env.NEXT_PUBLIC_PREVIEW_LABEL;
  if (!label) return null;

  return (
    <>
      <div aria-hidden className="h-10" />
      <div
        role="status"
        className="fixed bottom-0 inset-x-0 z-[60] bg-sage text-cream-light text-center text-[0.8rem] leading-snug px-4 py-2.5"
      >
        <strong className="font-medium">Preview, not live yet</strong> · {label}
      </div>
    </>
  );
}
