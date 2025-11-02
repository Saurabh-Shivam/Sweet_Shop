const request = require("supertest");
const app = require("../src/server");
const User = require("../src/models/User");
const Sweet = require("../src/models/Sweet");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

describe("Sweets Endpoints", () => {
  let authToken;
  let adminToken;
  let regularUser;

  beforeAll(async () => {
    const mongoUri =
      process.env.MONGODB_TEST_URI ||
      "mongodb://localhost:27017/sweet-shop-test";
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Sweet.deleteMany({});

    // Create regular user
    regularUser = await User.create({
      username: "regularuser",
      email: "regular@example.com",
      password: "password123",
      role: "user",
    });

    // Create admin user
    const adminUser = await User.create({
      username: "adminuser",
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });

    authToken = jwt.sign(
      { id: regularUser._id },
      process.env.JWT_SECRET || "test-secret"
    );
    adminToken = jwt.sign(
      { id: adminUser._id },
      process.env.JWT_SECRET || "test-secret"
    );
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Sweet.deleteMany({});
  });

  describe("POST /api/sweets", () => {
    it("should create a new sweet successfully", async () => {
      const response = await request(app)
        .post("/api/sweets")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Chocolate Bar",
          category: "chocolate",
          price: 10.5,
          quantity: 100,
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("name", "Chocolate Bar");
      expect(response.body.data).toHaveProperty("category", "chocolate");
      expect(response.body.data).toHaveProperty("price", 10.5);
      expect(response.body.data).toHaveProperty("quantity", 100);
    });

    it("should not create sweet without authentication", async () => {
      const response = await request(app).post("/api/sweets").send({
        name: "Chocolate Bar",
        category: "chocolate",
        price: 10.5,
        quantity: 100,
      });

      expect(response.status).toBe(401);
    });

    it("should not create sweet with invalid category", async () => {
      const response = await request(app)
        .post("/api/sweets")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Chocolate Bar",
          category: "invalid-category",
          price: 10.5,
          quantity: 100,
        });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/sweets", () => {
    it("should get all sweets successfully", async () => {
      await Sweet.create([
        { name: "Sweet 1", category: "chocolate", price: 10, quantity: 50 },
        { name: "Sweet 2", category: "candy", price: 5, quantity: 100 },
      ]);

      const response = await request(app)
        .get("/api/sweets")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data.length).toBe(2);
    });

    it("should not get sweets without authentication", async () => {
      const response = await request(app).get("/api/sweets");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/sweets/search", () => {
    beforeEach(async () => {
      await Sweet.create([
        {
          name: "Chocolate Bar",
          category: "chocolate",
          price: 10,
          quantity: 50,
        },
        { name: "Candy Cane", category: "candy", price: 5, quantity: 100 },
        {
          name: "Chocolate Cake",
          category: "dessert",
          price: 25,
          quantity: 20,
        },
      ]);
    });

    it("should search sweets by name", async () => {
      const response = await request(app)
        .get("/api/sweets/search?name=Chocolate")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
    });

    it("should search sweets by category", async () => {
      const response = await request(app)
        .get("/api/sweets/search?category=chocolate")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.count).toBe(1);
    });

    it("should search sweets by price range", async () => {
      const response = await request(app)
        .get("/api/sweets/search?minPrice=0&maxPrice=10")
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.count).toBe(2);
    });
  });

  describe("PUT /api/sweets/:id", () => {
    it("should update a sweet successfully", async () => {
      const sweet = await Sweet.create({
        name: "Original Sweet",
        category: "chocolate",
        price: 10,
        quantity: 50,
      });

      const response = await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          name: "Updated Sweet",
          price: 15,
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("name", "Updated Sweet");
      expect(response.body.data).toHaveProperty("price", 15);
    });

    it("should not update non-existent sweet", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .put(`/api/sweets/${fakeId}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ name: "Updated" });

      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /api/sweets/:id", () => {
    it("should delete a sweet as admin", async () => {
      const sweet = await Sweet.create({
        name: "Sweet to Delete",
        category: "chocolate",
        price: 10,
        quantity: 50,
      });

      const response = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      const deletedSweet = await Sweet.findById(sweet._id);
      expect(deletedSweet).toBeNull();
    });

    it("should not delete a sweet as regular user", async () => {
      const sweet = await Sweet.create({
        name: "Sweet to Delete",
        category: "chocolate",
        price: 10,
        quantity: 50,
      });

      const response = await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe("POST /api/sweets/:id/purchase", () => {
    it("should purchase a sweet successfully", async () => {
      const sweet = await Sweet.create({
        name: "Chocolate Bar",
        category: "chocolate",
        price: 10,
        quantity: 100,
      });

      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ quantity: 5 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("quantity", 95);
    });

    it("should not purchase more than available", async () => {
      const sweet = await Sweet.create({
        name: "Chocolate Bar",
        category: "chocolate",
        price: 10,
        quantity: 10,
      });

      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ quantity: 20 });

      expect(response.status).toBe(400);
      expect(response.body.message).toContain("Insufficient stock");
    });
  });

  describe("POST /api/sweets/:id/restock", () => {
    it("should restock a sweet as admin", async () => {
      const sweet = await Sweet.create({
        name: "Chocolate Bar",
        category: "chocolate",
        price: 10,
        quantity: 50,
      });

      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ quantity: 100 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("quantity", 150);
    });

    it("should not restock as regular user", async () => {
      const sweet = await Sweet.create({
        name: "Chocolate Bar",
        category: "chocolate",
        price: 10,
        quantity: 50,
      });

      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ quantity: 100 });

      expect(response.status).toBe(403);
    });
  });
});
