export class Order {
  constructor({
    id,
    user_id,
    order_date,
    total_amount,
    products,
  }) {
    this.id = id;
    this.user_id = user_id;
    this.order_date = order_date;
    this.total_amount = total_amount;
    this.products = products;
  }
}