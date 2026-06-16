import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import request from "supertest";
import { InvalidCredentialsError } from "../../src/domain/errors/InvalidCredentialsError.js";
import { app, mockContainer, setupDefaultContainerMocks } from "./supertest-test-context.js";

describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupDefaultContainerMocks();
  });

  it("responde 200 con token cuando las credenciales son validas", async () => {
    const payload = {
      email: "cliente@test.com",
      password: "123456",
    };

    const response = await request(app).post("/api/auth/login").send(payload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ token: "jwt-token" });
    expect(mockContainer.loginUserUseCase.execute).toHaveBeenCalledWith(payload);
  });

  it("responde 400 cuando el body es invalido", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "cliente@test.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("responde 401 cuando las credenciales son invalidas", async () => {
    mockContainer.loginUserUseCase.execute.mockRejectedValue(
      new InvalidCredentialsError()
    );

    const response = await request(app).post("/api/auth/login").send({
      email: "cliente@test.com",
      password: "incorrecta",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });
});
