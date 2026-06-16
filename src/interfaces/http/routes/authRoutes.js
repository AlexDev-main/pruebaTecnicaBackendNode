import { Router } from "express";

import { authController } from "../controllers/AuthController.js";

import { validateRequest } from "../middlewares/validateRequest.js";

import {
  registerSchema,
  loginSchema
} from "../validators/authValidator.js";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register.bind(authController)
);

router.post(
  "/login",
  validateRequest(loginSchema),
  authController.login.bind(authController)
);

export default router;