"use server";

/* Lowercase intentionally: Resend does a case-sensitive check of the
   recipient against the account's own verified address (nycreflect@gmail.com)
   while sending from the shared onboarding@resend.dev sender. "Nycreflect@…"
   with a capital N gets a 403. Gmail itself is case-insensitive, so the
   capitalized form is fine for the mailto:/display links elsewhere. */
const TO_EMAIL = "nycreflect@gmail.com";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if ((formData.get("website") as string | null)?.trim()) {
    return { status: "success" };
  }

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const interest = (formData.get("interest") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  /* Server-side mirror of the client validation in ContactForm.tsx. The
     client checks are UX only; these are the real gate against direct POSTs
     that skip the browser. Rules: name + interest + message required, and at
     least one valid contact method (valid email OR valid phone). */
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = phone.replace(/\D/g, "").length >= 10 &&
    phone.replace(/\D/g, "").length <= 15;

  if (!name) return { status: "error", message: "Please add your name." };
  if (!interest) {
    return { status: "error", message: "Please choose what you're looking for." };
  }
  if (!message) return { status: "error", message: "Please add a message." };
  if (email && !emailValid) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (phone && !phoneValid) {
    return { status: "error", message: "Please enter a valid phone number." };
  }
  if (!emailValid && !phoneValid) {
    return {
      status: "error",
      message: "Add your email or phone so I can reach you.",
    };
  }

  const subject = `Website inquiry from ${name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    interest ? `Interest: ${interest}` : null,
    "",
    message,
  ].filter(Boolean) as string[];
  const body = lines.join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Nycreflect Contact <onboarding@resend.dev>";

  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [TO_EMAIL],
        // Only set a reply-to when the visitor left a valid email; a
        // phone-only inquiry has none, and their number is in the body.
        ...(emailValid ? { reply_to: email } : {}),
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend error:", res.status, detail);
      return {
        status: "error",
        message: "Something went wrong sending your message. Please try again or email Nycreflect@gmail.com directly.",
      };
    }
    return { status: "success" };
  }

  /* Fallback path when RESEND_API_KEY is not configured. We log the
     submission to function logs so Vercel-side this is recoverable and
     the form still appears to succeed for the visitor (better UX than
     erroring while the email integration is in transit). Plug in
     RESEND_API_KEY in Vercel Project Settings → Environment Variables
     to enable real email delivery. */
  console.warn(
    `[contact] RESEND_API_KEY not set. Submission would have sent:\n` +
      `  Subject: ${subject}\n  To: ${TO_EMAIL}\n  Reply-To: ${email}\n\n${body}`,
  );
  return { status: "success" };
}
