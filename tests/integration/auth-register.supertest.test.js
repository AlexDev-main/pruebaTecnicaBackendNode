import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import request from "supertest";
import { UserAlreadyExistsError } from "../../src/domain/errors/UserAlreadyExistsError.js";
import { app, mockContainer, setupDefaultContainerMocks } from "./supertest-test-context.js";

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupDefaultContainerMocks();
  });

  it("responde 201 cuando el registro es exitoso", async () => {
    const payload = {
      email: "cliente@test.com",
      password: "123456",
    };

    const response = await request(app).post("/api/auth/register").send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User registered successfully" });
    expect(mockContainer.registerUserUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it("responde 400 cuando el body es invalido", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "no-valido",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("responde 409 cuando el usuario ya existe", async () => {
    mockContainer.registerUserUseCase.execute.mockRejectedValue(
      new UserAlreadyExistsError("cliente@test.com")
    );

    const response = await request(app).post("/api/auth/register").send({
      email: "cliente@test.com",
      password: "123456",
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toContain("already exists");
  });
});
