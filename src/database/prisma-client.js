const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient({
  log: ["error",
    //"info", "query", "warn"
  ],
});

module.exports = client;