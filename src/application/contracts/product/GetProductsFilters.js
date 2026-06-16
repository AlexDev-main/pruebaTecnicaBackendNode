export class GetProductsFilters {
  constructor({
    name,
    minPrice,
    maxPrice,
  }) {
    this.name = name;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}