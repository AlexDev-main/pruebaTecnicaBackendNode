import { ForbiddenError } from "../../../domain/errors/ForbiddenError.js";

export const authorize = (...roles) => (req, res, next) => {

    if (
      !roles.includes(
        req.user.role
      )
    ) {
      return next(
        new ForbiddenError()
      );
    }

    next();

  };