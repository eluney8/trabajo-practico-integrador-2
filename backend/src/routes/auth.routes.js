import { Router } from "express";
import { register, login, logout, getProfile, updateProfile } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../middlewares/validations/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";

export const authRoutes = Router();

authRoutes.post("/auth/register", registerValidation, validate, register);
authRoutes.post("/auth/login", loginValidation, validate, login);
authRoutes.get("/auth/profile", authMiddleware, getProfile);
authRoutes.put("/auth/profile", authMiddleware, updateProfile);
authRoutes.post("/auth/logout", authMiddleware, logout);