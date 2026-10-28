import { pageMetadata } from "../_lib/site";
import { SiteNav } from "../_components/SiteNav";
import { SiteFooter } from "../_components/SiteFooter";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | Rebecca Silverman, LCSW · NYC Therapist",
  description:
    "Get in touch with Rebecca Silverman, LCSW. A few sentences about what brings you here is enough to start. I'll be in touch within a few business days.",
});

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="px-5 pt-28 pb-16 md:px-12 lg:px-20 md:pt-32 md:pb-24">
        <div className="max-w-2xl mx-auto">
          <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-4 text-center">
            Get in Touch
          </p>
          <h1 className="font-display text-[2.4rem] md:text-[3rem] font-light leading-[1.18] text-text-primary mb-5 text-center">
            Let&rsquo;s see if we&rsquo;re a{" "}
            <em className="italic text-sage">good fit</em>.
          </h1>
          <p className="text-[0.95rem] leading-relaxed text-text-body text-center max-w-lg mx-auto mb-10">
            Starting therapy is a brave step, and reaching out is often the
            hardest part. A few sentences about what&rsquo;s going on is
            enough. I&rsquo;ll be in touch within a few business days to set
            up a brief phone call.
          </p>
          <ContactForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
