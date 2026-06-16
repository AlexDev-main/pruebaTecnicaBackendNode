import { container } from "../../../infrastructure/container/index.js";

export class AuthController {

  async register(req, res, next) {

    try {

      const result = await container
          .registerUserUseCase
          .execute(req.body);

      return res.status(201).json(result);

    } catch (error) {
      next(error);
    }

  }

  async login(req, res, next) {

    try {

      const result = await container
          .loginUserUseCase
          .execute(req.body);

      return res.status(200).json(result);

    } catch (error) {
      next(error);
    }

  }

}

export const authController =
  new AuthController();