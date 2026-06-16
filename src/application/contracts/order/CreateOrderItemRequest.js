export class CreateOrderItemRequest {
  constructor({
    productId,
    quantity,
  }) {
    this.productId = productId;
    this.quantity = quantity;
  }
}