"use strict";

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async function (fastify, opts) {
  fastify.post("/", async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).send({ error: "Missing fields" });
    }

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["ryan.shiuhong.fung@gmail.com"],
        replyTo: email,
        subject,
        html: `
          <p><strong>From:</strong> ${email}</p>
          <p>${message}</p>
        `,
      });

      return { success: true };
    } catch (error) {
      req.log.error(error);
      return res.status(500).send({ error: "Failed to send email" });
    }
  });
};
