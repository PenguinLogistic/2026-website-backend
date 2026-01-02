"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return { root: true };
  });

  fastify.get("/health", async (req, res) => {
    return { status: "ok" };
  });

  fastify.get("/test-env", async () => {
    return { DATABASE_URL: process.env.DATABASE_URL };
  });
};
