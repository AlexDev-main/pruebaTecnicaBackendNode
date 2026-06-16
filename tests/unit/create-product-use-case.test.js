import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { CreateProductUseCase } from "../../src/application/use-cases/product/CreateProductUseCase.js";

describe("CreateProductUseCase", () => {
  let productRepository;
  let useCase;

  beforeEach(() => {
    productRepository = {
      save: jest.fn(),
    };

    useCase = new CreateProductUseCase(productRepository);
  });

  it("crea y persiste un producto con los datos recibidos", async () => {
    productRepository.save.mockResolvedValue(undefined);

    const request = {
      name: "Mouse Gamer",
      description: "Mouse ergonomico",
      price: 49.99,
      stock: 100,
    };

    const result = await useCase.execute(request);

    expect(productRepository.save).toHaveBeenCalledTimes(1);
    expect(result.name).toBe("Mouse Gamer");
    expect(result.description).toBe("Mouse ergonomico");
    expect(result.price).toBe(49.99);
    expect(result.stock).toBe(100);
  });
});
