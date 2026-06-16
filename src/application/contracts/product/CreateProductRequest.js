export class CreateProductRequest {
  constructor({
    name,
    description,
    price,
    stock,
  }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
  }
}