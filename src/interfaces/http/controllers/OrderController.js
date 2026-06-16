import { container }
  from "../../../infrastructure/container/index.js";

export class OrderController {

  async create(req, res, next) {

    try {

      const result = await container
          .createOrderUseCase
          .execute(
            req.body,
            req.user.userId
          );

      return res.status(201).json(result);

    } catch (error) {
      next(error);
    }

  }

}

export const orderController =
  new OrderController();