import { Router } from "express";
import { createUser,getAllUsers, getUserById,updateUser,deleteUser } from "../controllers/user.controller.js";
import { userIdValidation,createUserValidation } from "../middlewares/validations/user.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.js";

export const usersRoutes = Router();
usersRoutes.post("/users", authMiddleware, adminMiddleware, createUserValidation, validate,createUser);
usersRoutes.get("/users", authMiddleware, adminMiddleware,getAllUsers);
usersRoutes.get("/users/:id", authMiddleware, adminMiddleware, userIdValidation, validate, getUserById);
usersRoutes.put("/users/:id", authMiddleware, adminMiddleware, updateUser, deleteUser);
usersRoutes.delete("/users/:id", authMiddleware, adminMiddleware, userIdValidation, validate, deleteUser);