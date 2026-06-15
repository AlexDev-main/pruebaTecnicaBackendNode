export class Order {
  constructor({
    id,
    userId,
    orderDate,
    totalAmount,
    products,
  }) {
    this.id = id;
    this.userId = userId;
    this.orderDate = orderDate;
    this.totalAmount = totalAmount;
    this.products = products ?? [];
  }
}