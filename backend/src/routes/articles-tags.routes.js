import { Router } from "express";
import { addTagToArticle, removeTagFromArticle } from "../controllers/articles-tags.controller.js";
import { articleIdValidation } from "../middlewares/validations/article.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";

export const articlesTagsRoutes = Router();

articlesTagsRoutes.post("/articles-tags",authMiddleware, articleIdValidation, validate, addTagToArticle);
articlesTagsRoutes.delete("/articles-tags/:articleTagId",authMiddleware, removeTagFromArticle);