"use client";

import { useActionState, useState, type FormEvent } from "react";
import { sendContactMessage, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const INTEREST_OPTIONS = [
  "Individual therapy",
  "Couples therapy",
  "Parent coaching",
  "Adolescent / teen therapy",
  "Not sure yet",
];

/* Validation rules (mirrored on the server in actions.ts — client is UX,
   server is the real gate):
   - name, interest, and message are required
   - at least one contact method is required, and anything typed into the
     email or phone field must itself be valid ("valid phone OR valid email")
   These regexes are intentionally lenient: the email check mirrors the
   server's, and the phone check just requires a plausible digit count so we
   don't reject valid international or formatted numbers. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  contact?: string;
  interest?: string;
  message?: string;
};

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  const name = ((data.get("name") as string | null) ?? "").trim();
  const email = ((data.get("email") as string | null) ?? "").trim();
  const phone = ((data.get("phone") as string | null) ?? "").trim();
  const interest = ((data.get("interest") as string | null) ?? "").trim();
  const message = ((data.get("message") as string | null) ?? "").trim();

  if (!name) errors.name = "Please add your name.";
  if (!interest) errors.interest = "Please choose what you're looking for.";
  if (!message) errors.message = "Please add a short message.";

  // Anything typed into a contact field has to be valid...
  if (email && !isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (phone && !isValidPhone(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  // ...and at least one valid contact method is required.
  const hasValidEmail = !!email && isValidEmail(email);
  const hasValidPhone = !!phone && isValidPhone(phone);
  if (!hasValidEmail && !hasValidPhone && !errors.email && !errors.phone) {
    errors.contact = "Add your email or phone so I can reach you.";
  }

  return errors;
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const [errors, setErrors] = useState<FieldErrors>({});

  if (state.status === "success") {
    return (
      <div className="bg-cream-light border border-sand rounded p-8 md:p-10 text-center">
        <p className="text-[0.68rem] tracking-[0.18em] uppercase text-sage mb-3">
          Thank you
        </p>
        <h2 className="font-display text-[1.6rem] md:text-[2rem] font-light text-text-primary leading-tight mb-4">
          Your message is on its way.
        </h2>
        <p className="text-[0.92rem] leading-relaxed text-text-body max-w-md mx-auto">
          I&rsquo;ll be in touch within a few business days. If you need to
          reach me sooner, feel free to email{" "}
          <a
            href="mailto:Nycreflect@gmail.com"
            className="text-sage underline underline-offset-2"
          >
            Nycreflect@gmail.com
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  /* Runs before React 19 dispatches the server action. If the input is
     invalid we preventDefault() so the action never fires, and surface the
     field-level errors instead. */
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const found = validate(new FormData(e.currentTarget));
    if (Object.keys(found).length > 0) {
      e.preventDefault();
      setErrors(found);
    } else {
      setErrors({});
    }
  }

  /* Clear a field's error as soon as the visitor starts correcting it.
     Editing either contact field also clears the shared "need one" error. */
  function clearError(field: keyof FieldErrors) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      if (field === "email" || field === "phone") delete next.contact;
      return next;
    });
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — hidden from real users, bots fill it and get silently
          dropped on the server. */}
      <input
        type="text"
        name="website"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      <Field id="name" label="Your name" required error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          onChange={() => clearError("name")}
          className={inputClass}
        />
      </Field>

      <Field id="email" label="Email address" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          onChange={() => clearError("email")}
          className={inputClass}
        />
      </Field>

      <Field id="phone" label="Phone" error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          onChange={() => clearError("phone")}
          className={inputClass}
        />
        <p
          className={
            errors.contact
              ? "text-[0.78rem] text-red-700"
              : "text-[0.72rem] text-tan"
          }
          role={errors.contact ? "alert" : undefined}
        >
          {errors.contact ??
            "Add your email or phone (at least one) so I can reach you."}
        </p>
      </Field>

      <Field
        id="interest"
        label="What are you looking for?"
        required
        error={errors.interest}
      >
        <select
          id="interest"
          name="interest"
          defaultValue=""
          aria-invalid={!!errors.interest}
          aria-describedby={errors.interest ? "interest-error" : undefined}
          onChange={() => clearError("interest")}
          className={`${inputClass} appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%236B7D5E' stroke-width='1.5' stroke-linecap='round'/></svg>\")",
          }}
        >
          <option value="">Select one</option>
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="What&rsquo;s going on?" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={() => clearError("message")}
          placeholder="A few sentences about what brings you here, what you&rsquo;re hoping to work on, or any questions you have."
          className={`${inputClass} resize-y leading-relaxed placeholder:text-tan/70`}
        />
      </Field>

      {state.status === "error" && (
        <p className="text-[0.82rem] text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-sage text-cream-light px-8 py-4 font-body text-[0.78rem] tracking-wider uppercase no-underline rounded-sm hover:opacity-90 transition-opacity disabled:opacity-60 self-start"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>

      <p className="text-[0.72rem] text-tan leading-relaxed">
        Your message goes directly to Becca. Please don&rsquo;t include
        sensitive clinical or identifying details in this initial note. If you
        are in crisis, call 988 or go to your nearest emergency room.
      </p>
    </form>
  );
}

const inputClass =
  "w-full bg-cream-light border border-sand rounded px-4 py-3 text-[0.92rem] text-text-primary font-body placeholder:text-tan focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-[0.72rem] tracking-wider uppercase text-tan"
      >
        {label}
        {required && <span className="text-sage ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[0.78rem] text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
