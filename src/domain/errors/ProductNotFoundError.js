export class ProductNotFoundError extends Error {
  constructor(productId) {
    super(`Product ${productId} not found`);

    this.name = "ProductNotFoundError";
  }
}