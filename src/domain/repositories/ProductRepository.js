export class ProductRepository {

  async save(product) {
    throw new Error("Method not implemented");
  }

  async findAll(filters = {}) {
    throw new Error("Method not implemented");
  }

  async findByIds(ids) {
    throw new Error("Method not implemented");
  }

  async decreaseStock(productId, quantity, session) {
    throw new Error("Method not implemented");
  }

}