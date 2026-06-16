import { UserAlreadyExistsError } from "../../../domain/errors/UserAlreadyExistsError.js";

import { InvalidCredentialsError } from "../../../domain/errors/InvalidCredentialsError.js";

import { ProductNotFoundError } from "../../../domain/errors/ProductNotFoundError.js";

import { InsufficientStockError } from "../../../domain/errors/InsufficientStockError.js";

import { UnauthorizedError } from "../../../domain/errors/UnauthorizedError.js";

import { ForbiddenError } from "../../../domain/errors/ForbiddenError.js";

export const errorHandler =
  (
    error,
    req,
    res,
    next
  ) => {

    if (
      error instanceof
      UserAlreadyExistsError
    ) {
      return res.status(409).json({
        message: error.message,
      });
    }

    if (
      error instanceof
      InvalidCredentialsError
    ) {
      return res.status(401).json({
        message: error.message,
      });
    }

    if (
      error instanceof
      UnauthorizedError
    ) {
      return res.status(401).json({
        message: error.message,
      });
    }

    if (
      error instanceof
      ForbiddenError
    ) {
      return res.status(403).json({
        message: error.message,
      });
    }

    if (
      error instanceof
      ProductNotFoundError
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (
      error instanceof
      InsufficientStockError
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      message:
        "Internal server error",
    });

  };