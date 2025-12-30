"use strict";
const { pool } = require("../../database/db.js");

module.exports = async function (fastify, opts) {
  fastify.get("/", async (request, reply) => {
    try {
      const { rows } = await pool.query(`
      SELECT *
      FROM public.skills
      ORDER BY category, experience_lv DESC
    `);
      return { skills: rows };
    } catch (err) {
      console.error(err);
      reply.status(500).send({ error: "Failed to fetch skills" });
    }
  });
};
