"use strict";

const fastifyCors = require("@fastify/cors");

module.exports = async function (fastify, opts) {
  fastify.register(fastifyCors, {
    origin: "http://localhost:3000",
  });
};
