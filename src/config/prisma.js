const { PrismaClient } = require("@prisma/client");

// Singleton pattern to prevent multiple instances
let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["error"],
  });
} else {
  // Reuse connection in development
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["error"],
    });
  }
  prisma = global.prisma;
}

module.exports = prisma;
