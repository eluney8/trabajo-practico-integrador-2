import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const tagIdValidation = [
  param("id")
    .trim()
    .isInt({ min: 1 }).withMessage("el id de la etiqueta debe ser entero y positivo")
    .custom(async (value) => {
      const tag = await TagModel.findByPk(value);
      if (!tag) throw new Error("la etiqueta no existe");
      return true;
    })
];

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("el nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 }).withMessage("el nombre debe tener entre 2 y 30 caracteres")
    .custom((value) => {
      if (/\s/.test(value)) {
        throw new Error("el nombre de la etiqueta no puede tener espacios");
      }
      return true;
    })
    .custom(async (value) => {
      const tag = await TagModel.findOne({ where: { name: value } });
      if (tag) throw new Error("ya existe una etiqueta con ese nombre");
      return true;
    })
];
