import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import request from "supertest";
import { app, mockContainer, setupDefaultContainerMocks } from "./supertest-test-context.js";

describe("GET /api/products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupDefaultContainerMocks();
  });

  it("responde 200 y propaga filtros al caso de uso", async () => {
    const response = await request(app)
      .get("/api/products")
      .query({ name: "mouse", minPrice: "20", maxPrice: "100" });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(mockContainer.getProductsUseCase.execute).toHaveBeenCalledWith({
      name: "mouse",
      minPrice: "20",
      maxPrice: "100",
    });
  });
});
