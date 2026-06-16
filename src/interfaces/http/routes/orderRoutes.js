import { Router } from "express";
import { orderController } from "../controllers/OrderController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { ROLES } from "../../../domain/constants/roles.js";
import { createOrderSchema } from "../validators/orderValidator.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(
    ROLES.CUSTOMER
  ),
  validateRequest(
    createOrderSchema
  ),
  orderController.create.bind(
    orderController
  )
);

export default router;