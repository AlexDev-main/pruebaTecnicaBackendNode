export class InsufficientStockError extends Error {
  constructor(productId) {
    super(`Insufficient stock for product ${productId}`);

    this.name = "InsufficientStockError";
  }
}