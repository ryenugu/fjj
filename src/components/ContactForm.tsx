import { Mail, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSiteContent } from "../context/SiteContentContext";

export function ContactForm() {
  const { contact, siteName } = useSiteContent();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [mailtoTried, setMailtoTried] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    setStatus("sending");
    setMailtoTried(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ siteName, name, email, phone, message }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (res.ok && data.success) {
        setStatus("sent");
        form.reset();
        return;
      }
    } catch {
      // Fall through to mailto on local dev or temporary API issues.
    }

    const subject = encodeURIComponent(`Message from ${siteName} website`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : "Phone: (not provided)",
        "",
        "Message:",
        message,
      ].join("\n")
    );

    setStatus("error");
    setMailtoTried(true);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="contact-form-wrap">
      <div className="contact-form__heading-row">
        <Mail className="contact-form__heading-icon" aria-hidden strokeWidth={1.5} />
        <h2 className="contact-form__heading">Send a message</h2>
      </div>
      <p className="contact-form__hint">
        Send a message and we’ll get it by email. If submission fails, your email app
        will open with the message filled in.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form__row">
          <label className="contact-form__label" htmlFor="contact-name">
            Name <span className="contact-form__req">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            className="contact-form__input"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
          />
        </div>

        <div className="contact-form__row contact-form__row--half">
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="contact-email">
              Email <span className="contact-form__req">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              className="contact-form__input"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={254}
            />
          </div>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="contact-phone">
              Phone
            </label>
            <input
              id="contact-phone"
              name="phone"
              className="contact-form__input"
              type="tel"
              autoComplete="tel"
              maxLength={40}
            />
          </div>
        </div>

        <div className="contact-form__row">
          <label className="contact-form__label" htmlFor="contact-message">
            Message <span className="contact-form__req">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            className="contact-form__textarea"
            rows={6}
            required
            maxLength={2000}
            placeholder="How can we help?"
          />
        </div>

        <div className="contact-form__actions">
          <button
            type="submit"
            className="btn btn--primary"
            disabled={status === "sending" || status === "sent"}
          >
            <Send className="btn__icon" aria-hidden strokeWidth={1.75} />
            {status === "sending"
              ? "Sending…"
              : status === "sent"
                ? "Sent"
                : "Send message"}
          </button>
        </div>

        {status === "sent" && (
          <p className="contact-form__status contact-form__status--ok" role="status">
            Thanks — your message was sent.
          </p>
        )}

        {status === "error" && (
          <p className="contact-form__status contact-form__status--err" role="alert">
            Couldn’t send just now. Try again, or email{" "}
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </p>
        )}

        {mailtoTried && (
          <p className="contact-form__status" role="status">
            If your email app didn’t open, reach us at{" "}
            <a className="text-link" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            .
          </p>
        )}
      </form>
    </div>
  );
}
