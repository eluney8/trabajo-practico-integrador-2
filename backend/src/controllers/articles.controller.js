import { ArticleModel } from "../models/article.model.js";
import { UserModel } from "../models/user.model.js";
import { matchedData } from "express-validator";

export const createArticle = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const user_id = req.user.id;
    const newArticle = await ArticleModel.create({
      ...validatedData,
      user_id,
    });
    return res.status(201).json({
      message: "articulo creado correctamente",
      article: newArticle,
    });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getPublishedArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      where: { status: "published" },
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const article = await ArticleModel.findByPk(id, {
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: ["id", "username", "email"],
        },
      ],
    });
    if (!article) {
      return res
        .status(404)
        .json({ message: "el articulo especificado no existe" });
    }
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getUserArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.findAll({
      where: { user_id: req.user.id },
    });
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const validatedBody = matchedData(req, { locations: ["body"] });
    const article = await ArticleModel.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "el articulo no existe" });
    }
    await article.update(validatedBody);
    return res.status(200).json({
      message: "articulo actualizado correctamente",
      article,
    });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const article = await ArticleModel.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: "el articulo no existe" });
    }
    await article.destroy();
    return res.status(200).json({ message: "articulo eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll();
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ message: "error interno en el servidor" });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await TagModel.findByPk(id, {
      include: [
        {
          model: ArticleModel,
          as: "articles",
          through: { attributes: [] },
        },
      ],
    });
    if (!tag) {
      return res.status(404).json({ message: "esa etiqueta no existe" });
    }
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: "error interno en el servidor" });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ message: "el nombre de la etiqueta no puede ser vacia" });
    }
    const tag = await TagModel.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "la etiqueta no existe" });
    }
    const nameDuplicado = await TagModel.findOne({ where: { name } });
    if (nameDuplicado && nameDuplicado.id !== parseInt(id)) {
      return res
        .status(400)
        .json({ message: "ya existe otra etiqueta con ese nombre" });
    }
    await tag.update({ name });
    return res.status(200).json({
      message: "etiqueta actualizada correctamente",
      tag,
    });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await TagModel.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "esa etiqueta no existe" });
    }
    await tag.destroy();
    return res
      .status(200)
      .json({ message: "etiqueta eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "error interno al servidor" });
  }
};
