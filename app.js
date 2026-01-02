"use strict";

const path = require("node:path");
const AutoLoad = require("@fastify/autoload");
const cors = require("@fastify/cors");

// Pass --options via CLI arguments in command to enable these options.
const options = {};
const whitelist = ["localhost", "vercel.app", "vercel.com"];
module.exports = async function (fastify, opts) {
  // Place here your custom code!

  //CORS
  await fastify.register(cors, {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);

      let hostname;
      try {
        hostname = new URL(origin).hostname;
      } catch {
        cb(new Error("Invalid origin"), false);
        return;
      }

      if (whitelist.includes(hostname)) {
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed"), false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Accept",
      "Content-Type",
      "Authorization",
    ],
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};

module.exports.options = options;
