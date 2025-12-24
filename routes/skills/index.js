"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async (req, res) => {
    const data = { status: "you've hit the skills route in the root!" };
    console.log("Sending response:", JSON.stringify(data));
    res.header("Content-Type", "application/json");
    res.send(data);
  });
};
