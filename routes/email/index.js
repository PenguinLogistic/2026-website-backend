"use strict";

const { Resend } = require("resend");

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not set");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function (fastify, opts) {
  fastify.post("/", async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !isValidEmail(email) || !subject || !message) {
      return res.status(400).send({ error: "Missing or invalid fields" });
    }

    if (subject.length > 200 || message.length > 2000) {
      return res.status(400).send({ error: "Input too long" });
    }

    try {
      const resend = getResend();
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["ryan.shiuhong.fung@gmail.com"],
        replyTo: email,
        subject: escapeHtml(subject),
        html: `
          <p><strong>From:</strong> ${escapeHtml(email)}</p>
          <p>${escapeHtml(message)}</p>
        `,
      });

      return { success: true };
    } catch (error) {
      req.log.error(error);
      return res.status(500).send({ error: "Failed to send email" });
    }
  });
};
