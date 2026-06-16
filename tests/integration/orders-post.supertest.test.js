import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import request from "supertest";
import { ProductNotFoundError } from "../../src/domain/errors/ProductNotFoundError.js";
import { InsufficientStockError } from "../../src/domain/errors/InsufficientStockError.js";
import { app, mockContainer, setupDefaultContainerMocks } from "./supertest-test-context.js";

describe("POST /api/orders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupDefaultContainerMocks();
  });

  it("responde 401 cuando no hay token", async () => {
    const response = await request(app).post("/api/orders").send({
      items: [{ productId: "p1", quantity: 2 }],
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  it("responde 403 cuando el rol no es CUSTOMER", async () => {
    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer admin-token")
      .send({
        items: [{ productId: "p1", quantity: 2 }],
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe("Forbidden");
  });

  it("responde 400 cuando el body es invalido", async () => {
    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer customer-token")
      .send({ items: [] });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("responde 404 cuando un producto no existe", async () => {
    mockContainer.createOrderUseCase.execute.mockRejectedValue(
      new ProductNotFoundError("p404")
    );

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer customer-token")
      .send({
        items: [{ productId: "p404", quantity: 1 }],
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toContain("not found");
  });

  it("responde 400 cuando el stock es insuficiente", async () => {
    mockContainer.createOrderUseCase.execute.mockRejectedValue(
      new InsufficientStockError("p1")
    );

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer customer-token")
      .send({
        items: [{ productId: "p1", quantity: 5 }],
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Insufficient stock");
  });

  it("responde 201 y usa el userId del token", async () => {
    const payload = {
      items: [{ productId: "p1", quantity: 2 }],
    };

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", "Bearer customer-token")
      .send(payload);

    expect(response.status).toBe(201);
    expect(mockContainer.createOrderUseCase.execute).toHaveBeenCalledWith(
      payload,
      "customer-1"
    );
  });
});
