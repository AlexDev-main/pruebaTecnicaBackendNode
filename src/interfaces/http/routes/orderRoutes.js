import { Router } from "express";

import { orderController } from "../controllers/OrderController.js";

import { validateRequest } from "../middlewares/validateRequest.js";

import {
  createOrderSchema
} from "../validators/orderValidator.js";

const router = Router();

router.post(
  "/",
  validateRequest(createOrderSchema),
  orderController.create.bind(orderController)
);

export default router;