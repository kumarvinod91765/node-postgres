const request = require("supertest");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("API Health & Routing Checks", () => {
  // Disconnect from database after tests complete
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /", () => {
    it("should return 200 Welcome message", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Welcome to the API");
    });
  });
});
