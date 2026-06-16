import { describe, it, expect } from "@jest/globals";
import request from "supertest";
import { app } from "./supertest-test-context.js";

describe("GET /health", () => {
  it("responde 200 con el payload esperado", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "API is running",
    });
  });
});
