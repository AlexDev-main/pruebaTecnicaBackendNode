import { container } from "../../../infrastructure/container/index.js";

export class ProductController {

  async create(req, res, next) {

    try {

      const result = await container
          .createProductUseCase
          .execute(req.body);

      return res.status(201).json(result);

    } catch (error) {
      next(error);
    }

  }

  async getAll(req, res, next) {

    try {

      const result = await container
          .getProductsUseCase
          .execute(req.query);

      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }

  }

}

export const productController =
  new ProductController();