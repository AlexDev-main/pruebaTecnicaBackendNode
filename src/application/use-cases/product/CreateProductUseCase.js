import { Product } from "../../../domain/entities/Product.js";

export class CreateProductUseCase {

  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(createProductRequest) {

    const product = new Product({
      name: createProductRequest.name,
      description: createProductRequest.description,
      price: createProductRequest.price,
      stock: createProductRequest.stock,
    });

    await this.productRepository.save(product);

    return product;
  }

}