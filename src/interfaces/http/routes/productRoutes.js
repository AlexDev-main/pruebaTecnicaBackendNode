import { Router } from "express";

import { productController } from "../controllers/ProductController.js";

import { validateRequest } from "../middlewares/validateRequest.js";

import {
  createProductSchema
} from "../validators/productValidator.js";

const router = Router();

router.get(
  "/",
  productController.getAll.bind(productController)
);

router.post(
  "/",
  validateRequest(createProductSchema),
  productController.create.bind(productController)
);

export default router;