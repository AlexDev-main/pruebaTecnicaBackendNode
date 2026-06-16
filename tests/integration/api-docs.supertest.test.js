import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { app } from "./supertest-test-context.js";

describe("GET /api-docs.json", () => {
  it("responde 200 con una definicion OpenAPI valida", async () => {
    const response = await request(app).get("/api-docs.json");

    expect(response.status).toBe(200);
    expect(response.body.openapi).toBe("3.0.3");
    expect(response.body.paths).toHaveProperty("/auth/register");
    expect(response.body.paths).toHaveProperty("/auth/login");
    expect(response.body.paths).toHaveProperty("/products");
    expect(response.body.paths).toHaveProperty("/orders");
  });
});
