import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { GetProductsUseCase } from "../../src/application/use-cases/product/GetProductsUseCase.js";

describe("GetProductsUseCase", () => {
  let productRepository;
  let useCase;

  beforeEach(() => {
    productRepository = {
      findAll: jest.fn(),
    };

    useCase = new GetProductsUseCase(productRepository);
  });

  it("consulta el repositorio con filtros y retorna el resultado", async () => {
    const filters = {
      name: "mouse",
      minPrice: "20",
      maxPrice: "100",
    };

    const products = [
      { id: "p1", name: "Mouse A", price: 30, stock: 10 },
      { id: "p2", name: "Mouse B", price: 60, stock: 4 },
    ];

    productRepository.findAll.mockResolvedValue(products);

    const result = await useCase.execute(filters);

    expect(productRepository.findAll).toHaveBeenCalledWith(filters);
    expect(result).toEqual(products);
  });
});
