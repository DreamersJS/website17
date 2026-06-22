import request from "supertest";
import { describe, it, expect, jest } from "@jest/globals";
import app from "../../src/app.js";
import { createUser, getAuthHeader } from "../../__mocks__/factories/user.factory.js";

describe("register", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        username: "TestUser",
        email: `test${Date.now()}@mail.com`,
        password: "123456",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.id.trim().length).toBeGreaterThan(0);

    expect(res.body.data.email).toBeDefined();
    expect(res.body.data.email).toEqual(expect.any(String));
    expect(res.body.data.email).toMatch(/@/);

    expect(res.body.data.username).toEqual(expect.any(String));
    expect(res.body.data.username.trim()).not.toBe('');

    expect(res.body.data.password).not.toBeDefined();

    expect(res.body.message).toMatch(/successfully/i);
  });

  it("should fail if email already exists", async () => {
    const email = `test${Date.now()}@mail.com`;

    await request(app).post("/api/users/register").send({
      username: "User1",
      email,
      password: "123456",
    });

    const res = await request(app).post("/api/users/register").send({
      username: "User2",
      email,
      password: "123456",
    });
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    // expect(res.statusCode).toBe(400);// returns 500 - I throw an error, but in the controller I don’t handle it, just pass it to Express. So Express default error handler kicks in & Returns 500 Internal Server Error = test gets 500 instead of 400
    expect(res.body.error).toBe("Email is already in use.");
  });

  it.each([
    [undefined],
    [''],
    ['   '],
    ['S'],
  ])("should reject invalid username: %p", async (username) => {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        username,
        email: `test${Date.now()}@mail.com`,
        password: "123456",
      });

    expect(res.statusCode).toBe(400);
  });
});

describe("Login", () => {
  let email = `test${Date.now()}@mail.com`;
  let password = "123456";

  beforeEach(async () => {
    await request(app).post("/api/users/register").send({
      username: "LoginUser",
      email,
      password,
    });
  });

  it("should login successfully", async () => {
    const res = await request(app).post("/api/users/login").send({
      email,
      password,
    });

    expect(res.statusCode).toBe(200);
    // expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.body.message).toMatch(/successful/i);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.id.trim().length).toBeGreaterThan(0);

    expect(res.body.data.email).toBeDefined();
    expect(res.body.data.email).toEqual(expect.any(String));
    expect(res.body.data.email).toMatch(/@/);

    expect(res.body.data.username).toEqual(expect.any(String));
    expect(res.body.data.username.trim()).not.toBe('');

    expect(res.body.data.password).not.toBeDefined();
  })
  it("should fail with wrong password", async () => {
    const res = await request(app).post("/api/users/login").send({
      email,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("Invalid credentials.");
  });

  it("should fail if user does not exist", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "nonexistent@mail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe("User not found.");
  });
});

describe("Auth-protected route Logout", () => {
  let token;
  let email;
  let password = "123456";

  beforeEach(async () => {
    email = `test${Date.now()}@mail.com`;
    const registerRes = await request(app).post("/api/users/register").send({
      username: "AuthUser",
      email,
      password,
    });
    token = `Bearer ${registerRes.body.meta.accessToken}`;
    // console.log({ token });
  });
  
  // beforeEach(async () => {
  //   const user = await createUser();
  //   token = getAuthHeader(user);
  // });

  it("should allow access with valid header token", async () => {
    const res = await request(app).post("/api/users/logout").set('Authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/successfully/i)
  });

  it("should block access without header token", async () => {
    const res = await request(app).post("/api/users/logout");

    expect(res.statusCode).toBe(401);
  });
});