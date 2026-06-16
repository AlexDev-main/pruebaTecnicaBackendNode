import { Router } from "express";
import { productController } from "../controllers/ProductController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { ROLES } from "../../../domain/constants/roles.js";
import { createProductSchema } from "../validators/productValidator.js";

const router = Router();

router.get(
  "/",
  productController.getAll.bind(productController)
);

router.post(
  "/",
  authenticate,
  authorize(
    ROLES.ADMIN
  ),
  validateRequest(
    createProductSchema
  ),
  productController.create.bind(
    productController
  )
);

export default router;