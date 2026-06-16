import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { RegisterUserUseCase } from "../../src/application/use-cases/auth/RegisterUserUseCase.js";
import { UserAlreadyExistsError } from "../../src/domain/errors/UserAlreadyExistsError.js";
import { ROLES } from "../../src/domain/constants/roles.js";

describe("RegisterUserUseCase", () => {
  let userRepository;
  let passwordHasher;
  let useCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    passwordHasher = {
      hash: jest.fn(),
    };

    useCase = new RegisterUserUseCase(userRepository, passwordHasher);
  });

  it("lanza UserAlreadyExistsError cuando el email ya existe", async () => {
    userRepository.findByEmail.mockResolvedValue({ id: "u1" });

    await expect(
      useCase.execute({ email: "cliente@test.com", password: "123456" })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    expect(passwordHasher.hash).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it("registra usuario CUSTOMER y devuelve mensaje esperado", async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    passwordHasher.hash.mockResolvedValue("hashed-password");
    userRepository.save.mockResolvedValue(undefined);

    const result = await useCase.execute({
      email: "cliente@test.com",
      password: "123456",
    });

    expect(result).toEqual({ message: "User registered successfully" });
    expect(passwordHasher.hash).toHaveBeenCalledWith("123456");
    expect(userRepository.save).toHaveBeenCalledTimes(1);

    const savedUser = userRepository.save.mock.calls[0][0];

    expect(savedUser.email).toBe("cliente@test.com");
    expect(savedUser.password).toBe("hashed-password");
    expect(savedUser.role).toBe(ROLES.CUSTOMER);
  });
});
