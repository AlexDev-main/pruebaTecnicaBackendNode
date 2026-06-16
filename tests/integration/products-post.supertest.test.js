import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import request from "supertest";
import { app, mockContainer, setupDefaultContainerMocks } from "./supertest-test-context.js";

describe("POST /api/products", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupDefaultContainerMocks();
  });

  it("responde 401 cuando no hay token", async () => {
    const response = await request(app).post("/api/products").send({
      name: "Teclado",
      description: "Mecanico",
      price: 80,
      stock: 5,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("responde 403 cuando el rol no es ADMIN", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", "Bearer customer-token")
      .send({
        name: "Teclado",
        description: "Mecanico",
        price: 80,
        stock: 5,
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Forbidden");
  });

  it("responde 400 cuando el body es invalido", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", "Bearer admin-token")
      .send({ name: "Teclado" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("responde 201 cuando ADMIN crea producto", async () => {
    const payload = {
      name: "Teclado",
      description: "Mecanico",
      price: 80,
      stock: 5,
    };

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", "Bearer admin-token")
      .send(payload);

    expect(response.status).toBe(201);
    expect(mockContainer.createProductUseCase.execute).toHaveBeenCalledWith(
      payload
    );
  });
});
