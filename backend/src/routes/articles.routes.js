import { Router } from "express";
import { createArticle, getPublishedArticles,getUserArticles,getArticleById,updateArticle,deleteArticle } from "../controllers/articles.controller.js";
import { articleIdValidation,createArticleValidation } from "../middlewares/validations/article.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { ownerMiddleware } from "../middlewares/owner.middleware.js";
import { validate } from "../middlewares/validate.js";

export const articlesRoutes = Router();

articlesRoutes.post("/articles",  authMiddleware, createArticleValidation, validate,createArticle);
articlesRoutes.get("/articles", authMiddleware,getPublishedArticles);
articlesRoutes.get("/articles/user", authMiddleware,getUserArticles); 
articlesRoutes.get("/articles/:id", authMiddleware, articleIdValidation, validate,getArticleById);
articlesRoutes.put("/articles/:id", authMiddleware, ownerMiddleware,updateArticle);
articlesRoutes.delete("/articles/:id", authMiddleware, ownerMiddleware, articleIdValidation, validate,deleteArticle);
