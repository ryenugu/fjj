import { sendJson } from "./_sanity.js";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function normalizeString(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const accessKey =
    process.env.WEB3FORM_API_KEY ||
    process.env.VITE_WEB3FORM_API_KEY ||
    process.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return sendJson(res, 500, { error: "Missing contact form configuration" });
  }

  const name = normalizeString(req.body?.name, 120);
  const email = normalizeString(req.body?.email, 254);
  const phone = normalizeString(req.body?.phone, 40);
  const message = normalizeString(req.body?.message, 2000);
  const siteName = normalizeString(req.body?.siteName, 120) || "Website";

  if (!name || !email || !message) {
    return sendJson(res, 400, { error: "Name, email, and message are required" });
  }

  try {
    const upstream = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Website message — ${siteName}`,
        name,
        email,
        message: [phone ? `Phone: ${phone}` : null, "", message]
          .filter((line) => line !== null)
          .join("\n"),
      }),
    });
    const data = await upstream.json();
    if (!upstream.ok || !data?.success) {
      return sendJson(res, 502, { error: "Upstream form provider rejected the message" });
    }
    return sendJson(res, 200, { success: true });
  } catch (error) {
    console.error("contact error", error);
    return sendJson(res, 500, { error: "Failed to send message" });
  }
}
