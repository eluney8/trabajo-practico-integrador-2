import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";

export const articleIdValidation = [
  param("id")
    .trim()
    .isInt({ min: 1 }).withMessage("el id del articulo debe ser entero y positivo")
    .custom(async (value) => {
      const article = await ArticleModel.findByPk(value);
      if (!article) throw new Error("el articulo no existe");
      return true;
    })
];

export const createArticleValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("el titulo es obligatorio")
    .isLength({ min: 3, max: 200 }).withMessage("el titulo debe tener entre 3 y 200 caracteres"),
  body("content")
    .trim()
    .notEmpty().withMessage("el contenido es obligatorio")
    .isLength({ min: 50 }).withMessage("el contenido debe tener minimo 50 caracteres"),
  body("excerpt")
    .optional()
    .isLength({ max: 500 }).withMessage("el excerpt no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"]).withMessage("el estado debe ser published o archived")
];