import request from "supertest";
import { describe, it, expect, jest } from "@jest/globals";
import app from "../../src/app.js";
import { createUser, getAuthHeader } from "../../__mocks__/factories/user.factory.js";

describe("api/users", () => {
  it("should return user by id", async () => {
    const user = await createUser();
    const token = getAuthHeader(user)
    // console.log({ token });
    const res = await request(app).get(`/api/users/${user.id}`).set('Authorization', token);
    // console.log({ res });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(user.id);
  });

  it("should return 401 if invalid id", async () => {
    const res = await request(app).get("/api/users/invalid-id");

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBeDefined();
  });
});
