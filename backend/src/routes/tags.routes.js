import { Router } from "express";
import { createTag, getAllTags,getTagById, updateTag, deleteTag } from "../controllers/tags.controller.js";
import { tagIdValidation,createTagValidation } from "../middlewares/validations/tag.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validate.js";

export const tagsRoutes = Router();

tagsRoutes.post("/tags",authMiddleware, adminMiddleware, createTagValidation, validate,  createTag);
tagsRoutes.get("/tags",authMiddleware, getAllTags);
tagsRoutes.get("/tags/:id", authMiddleware, adminMiddleware, tagIdValidation, validate, getTagById);
tagsRoutes.put("/tags/:id",authMiddleware, adminMiddleware,updateTag);
tagsRoutes.delete("/tags/:id",authMiddleware, adminMiddleware, tagIdValidation, validate, deleteTag);