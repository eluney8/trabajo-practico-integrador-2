import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { registerValidation } from "./auth.validation.js";

export const userIdValidation = [
  param("id")
    .trim()
    .isInt({ min: 1 }).withMessage("el id debe ser un numero entero y positivo")
    .custom(async (value) => {
      const user = await UserModel.findByPk(value);
      if (!user) throw new Error("el usuario no existe");
      return true;
    })
];

export const createUserValidation = [
  ...registerValidation,
  body("role")
    .optional()
    .isIn(["user", "admin"]).withMessage("el rol debe ser user o admin")
];