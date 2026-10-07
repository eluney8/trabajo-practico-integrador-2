import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio")
    .isAlphanumeric()
    .withMessage("el nombre de usuario debe ser alfanumerico")
    .isLength({ min: 3, max: 20 })
    .withMessage("el username debe tener entre 3 y 20 caracteres")
    .custom(async (value) => {
      const user = await UserModel.findOne({ where: { username: value } });
      if (user) throw new Error("el nombre de usuario ya existe");
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("el email es obligatorio")
    .isEmail()
    .withMessage("el email debe ser un correo valido")
    .custom(async (value) => {
      const user = await UserModel.findOne({ where: { email: value } });
      if (user) throw new Error("el email ya se encuentra registrado");
      return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("la contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("la contraseña debe tener minimo 8 caracteres")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "la contraseña debe incluir una mayuscula, una minuscula y un numero",
    ),
  body("first_name").trim().notEmpty().withMessage("el nombre es obligatorio"),
  body("last_name").trim().notEmpty().withMessage("el apellido es obligatorio"),
  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("la biografía no puede superar los 500 caracteres"),
];
export const loginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("la contraseña es obligatoria"),
];
