import { jest } from "@jest/globals";
import { ROLES } from "../../src/domain/constants/roles.js";

export const mockContainer = {
  tokenService: {
    verify: jest.fn(),
  },
  registerUserUseCase: {
    execute: jest.fn(),
  },
  loginUserUseCase: {
    execute: jest.fn(),
  },
  getProductsUseCase: {
    execute: jest.fn(),
  },
  createProductUseCase: {
    execute: jest.fn(),
  },
  createOrderUseCase: {
    execute: jest.fn(),
  },
};

export const setupDefaultContainerMocks = () => {
  mockContainer.tokenService.verify.mockImplementation((token) => {
    if (token === "admin-token") {
      return {
        userId: "admin-1",
        role: ROLES.ADMIN,
      };
    }

    if (token === "customer-token") {
      return {
        userId: "customer-1",
        role: ROLES.CUSTOMER,
      };
    }

    throw new Error("Invalid token");
  });

  mockContainer.registerUserUseCase.execute.mockResolvedValue({
    message: "User registered successfully",
  });

  mockContainer.loginUserUseCase.execute.mockResolvedValue({
    token: "jwt-token",
  });

  mockContainer.getProductsUseCase.execute.mockResolvedValue([
    {
      id: "p1",
      name: "Mouse",
      description: "Mouse ergonomico",
      price: 50,
      stock: 10,
    },
  ]);

  mockContainer.createProductUseCase.execute.mockResolvedValue({
    id: "p1",
    name: "Mouse",
    description: "Mouse ergonomico",
    price: 50,
    stock: 10,
  });

  mockContainer.createOrderUseCase.execute.mockResolvedValue({
    id: "o1",
    userId: "customer-1",
    totalAmount: 100,
    products: [
      {
        productId: "p1",
        quantity: 2,
        unitPrice: 50,
      },
    ],
  });
};

jest.unstable_mockModule("../../src/infrastructure/container/index.js", () => ({
  container: mockContainer,
}));

const { default: app } = await import("../../src/interfaces/http/app.js");

export { app };
