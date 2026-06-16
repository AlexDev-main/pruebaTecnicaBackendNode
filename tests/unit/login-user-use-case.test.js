import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { LoginUserUseCase } from "../../src/application/use-cases/auth/LoginUserUseCase.js";
import { InvalidCredentialsError } from "../../src/domain/errors/InvalidCredentialsError.js";
import { ROLES } from "../../src/domain/constants/roles.js";

describe("LoginUserUseCase", () => {
  let userRepository;
  let passwordHasher;
  let tokenService;
  let useCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    };

    passwordHasher = {
      compare: jest.fn(),
    };

    tokenService = {
      generate: jest.fn(),
    };

    useCase = new LoginUserUseCase(userRepository, passwordHasher, tokenService);
  });

  it("lanza InvalidCredentialsError cuando el usuario no existe", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({ email: "cliente@test.com", password: "123456" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

    expect(passwordHasher.compare).not.toHaveBeenCalled();
    expect(tokenService.generate).not.toHaveBeenCalled();
  });

  it("lanza InvalidCredentialsError cuando el password no coincide", async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: "u1",
      email: "cliente@test.com",
      password: "hashed-password",
      role: ROLES.CUSTOMER,
    });
    passwordHasher.compare.mockResolvedValue(false);

    await expect(
      useCase.execute({ email: "cliente@test.com", password: "incorrecta" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);

    expect(tokenService.generate).not.toHaveBeenCalled();
  });

  it("devuelve token cuando las credenciales son validas", async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: "u1",
      email: "cliente@test.com",
      password: "hashed-password",
      role: ROLES.CUSTOMER,
    });
    passwordHasher.compare.mockResolvedValue(true);
    tokenService.generate.mockReturnValue("jwt-token");

    const result = await useCase.execute({
      email: "cliente@test.com",
      password: "123456",
    });

    expect(tokenService.generate).toHaveBeenCalledWith({
      userId: "u1",
      role: ROLES.CUSTOMER,
    });
    expect(result).toEqual({ token: "jwt-token" });
  });
});
