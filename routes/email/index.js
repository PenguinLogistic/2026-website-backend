"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async (req, res) => {
    const data = { status: "you've hit the email route!" };
    console.log("Sending response:", JSON.stringify(data));
    res.header("Content-Type", "application/json");
    res.send(data);
  });
};
