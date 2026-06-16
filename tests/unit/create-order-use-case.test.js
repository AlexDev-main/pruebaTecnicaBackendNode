import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { CreateOrderUseCase } from "../../src/application/use-cases/order/CreateOrderUseCase.js";
import { ProductNotFoundError } from "../../src/domain/errors/ProductNotFoundError.js";
import { InsufficientStockError } from "../../src/domain/errors/InsufficientStockError.js";

describe("CreateOrderUseCase", () => {
  let productRepository;
  let orderRepository;
  let transactionManager;
  let useCase;

  beforeEach(() => {
    productRepository = {
      findByIds: jest.fn(),
      decreaseStockIfAvailable: jest.fn(),
    };

    orderRepository = {
      save: jest.fn(),
    };

    transactionManager = {
      execute: jest.fn(async (work) => work("session-1")),
    };

    useCase = new CreateOrderUseCase(
      productRepository,
      orderRepository,
      transactionManager
    );
  });

  it("crea pedido y descuenta stock cuando los items son validos", async () => {
    const request = {
      items: [
        { productId: "p1", quantity: 2 },
        { productId: "p2", quantity: 1 },
      ],
    };

    productRepository.findByIds.mockResolvedValue([
      { id: "p1", price: 10, stock: 5 },
      { id: "p2", price: 5, stock: 3 },
    ]);
    productRepository.decreaseStockIfAvailable.mockResolvedValue(undefined);
    orderRepository.save.mockResolvedValue(undefined);

    const result = await useCase.execute(request, "customer-1");

    expect(transactionManager.execute).toHaveBeenCalledTimes(1);
    expect(productRepository.findByIds).toHaveBeenCalledWith(["p1", "p2"]);
    expect(productRepository.decreaseStockIfAvailable).toHaveBeenNthCalledWith(
      1,
      "p1",
      2,
      "session-1"
    );
    expect(productRepository.decreaseStockIfAvailable).toHaveBeenNthCalledWith(
      2,
      "p2",
      1,
      "session-1"
    );

    expect(orderRepository.save).toHaveBeenCalledTimes(1);
    expect(orderRepository.save.mock.calls[0][1]).toBe("session-1");

    expect(result.userId).toBe("customer-1");
    expect(result.totalAmount).toBe(25);
    expect(result.products).toHaveLength(2);
    expect(result.products[0]).toMatchObject({
      productId: "p1",
      quantity: 2,
      unitPrice: 10,
    });
    expect(result.products[1]).toMatchObject({
      productId: "p2",
      quantity: 1,
      unitPrice: 5,
    });
  });

  it("lanza ProductNotFoundError cuando un producto no existe", async () => {
    const request = {
      items: [{ productId: "p404", quantity: 1 }],
    };

    productRepository.findByIds.mockResolvedValue([]);

    await expect(useCase.execute(request, "customer-1")).rejects.toBeInstanceOf(
      ProductNotFoundError
    );

    expect(productRepository.decreaseStockIfAvailable).not.toHaveBeenCalled();
    expect(orderRepository.save).not.toHaveBeenCalled();
  });

  it("lanza InsufficientStockError cuando no hay stock suficiente", async () => {
    const request = {
      items: [{ productId: "p1", quantity: 10 }],
    };

    productRepository.findByIds.mockResolvedValue([
      { id: "p1", price: 10, stock: 2 },
    ]);

    await expect(useCase.execute(request, "customer-1")).rejects.toBeInstanceOf(
      InsufficientStockError
    );

    expect(productRepository.decreaseStockIfAvailable).not.toHaveBeenCalled();
    expect(orderRepository.save).not.toHaveBeenCalled();
  });
});
