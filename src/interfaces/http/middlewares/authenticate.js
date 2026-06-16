import { container } from "../../../infrastructure/container/index.js";
import { UnauthorizedError } from "../../../domain/errors/UnauthorizedError.js";

export const authenticate = (req, res, next) => {

    try {

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedError();
      }

      const token = authHeader.replace(
          "Bearer ",
          ""
        );

      const payload = container
          .tokenService
          .verify(token);

      req.user = {
        userId: payload.userId,
        role: payload.role,
      };

      next();

    } catch (error) {

      next(
        new UnauthorizedError()
      );

    }

  };