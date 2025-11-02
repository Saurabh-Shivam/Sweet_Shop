const request = require("supertest");
const app = require("../src/server");
const User = require("../src/models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    const mongoUri =
      process.env.MONGODB_TEST_URI ||
      "mongodb://localhost:27017/sweet-shop-test";
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toHaveProperty("username", "testuser");
      expect(response.body.data.user).toHaveProperty(
        "email",
        "test@example.com"
      );
      expect(response.body.data).toHaveProperty("token");
    });

    it("should not register a user with invalid email", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "invalid-email",
        password: "password123",
      });

      expect(response.status).toBe(400);
    });

    it("should not register a user with password less than 6 characters", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "12345",
      });

      expect(response.status).toBe(400);
    });

    it("should not register a duplicate user", async () => {
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      const response = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("already exists");
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should login a user successfully", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toHaveProperty("username", "testuser");
      expect(response.body.data).toHaveProperty("token");
    });

    it("should not login with wrong password", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toContain("Invalid credentials");
    });

    it("should not login with non-existent email", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      });

      expect(response.status).toBe(401);
      expect(response.body.message).toContain("Invalid credentials");
    });
  });

  describe("GET /api/auth/me", () => {
    it("should get current user with valid token", async () => {
      const user = await User.create({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "test-secret"
      );

      const response = await request(app)
        .get("/api/auth/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user).toHaveProperty("username", "testuser");
    });

    it("should not get user without token", async () => {
      const response = await request(app).get("/api/auth/me");

      expect(response.status).toBe(401);
    });
  });
});
