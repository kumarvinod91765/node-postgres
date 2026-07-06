const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../src/app");
const prisma = require("../../src/config/prisma");

describe("Auth & Authorization Integration Tests", () => {
  let adminToken;

  // Set up fresh test data before running tests
  beforeAll(async () => {
    // Clean up test users if they exist
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ["admin-test-xyz@test.com", "user-test-xyz@test.com"],
        },
      },
    });

    const hashedPassword = await bcrypt.hash("password123", 10);

    // Create a mock Admin user
    await prisma.user.create({
      data: {
        name: "Test Admin",
        email: "admin-test-xyz@test.com",
        password: hashedPassword,
        role: "Admin",
        status: true,
      },
    });

    // Create a mock User role user
    await prisma.user.create({
      data: {
        name: "Test User",
        email: "user-test-xyz@test.com",
        password: hashedPassword,
        role: "User",
        status: true,
      },
    });
  });

  afterAll(async () => {
    // Clean up test data and disconnect
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ["admin-test-xyz@test.com", "user-test-xyz@test.com"],
        },
      },
    });
    await prisma.$disconnect();
  });

  describe("POST /api/auth/login", () => {
    it("should successfully log in with correct admin credentials and return token", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "admin-test-xyz@test.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("token");
      adminToken = res.body.data.token; // Save token for protected routes
    });

    it("should fail to log in with incorrect password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "admin-test-xyz@test.com",
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
    });

    it("should fail to log in if the user does not have the Admin role", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "user-test-xyz@test.com",
        password: "password123",
      });

      expect(res.statusCode).not.toBe(200);
    });
  });

  describe("Protected Routes Protection", () => {
    it("should deny access to GET /api/users if token is missing", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(401);
      expect(res.body.msg).toBe("No auth token provided");
    });

    it("should deny access to GET /api/users if token is invalid", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", "Bearer invalidtoken");
      expect(res.statusCode).toBe(401);
      expect(res.body.msg).toBe("Invalid or expired auth token");
    });

    it("should allow access to GET /api/users with a valid admin token", async () => {
      const res = await request(app)
        .get("/api/users")
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.statusCode).toBe(200);
    });
  });
});
