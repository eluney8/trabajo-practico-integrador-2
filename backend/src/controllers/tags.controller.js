import { TagModel } from "../models/tag.model.js";
import { ArticleModel } from "../models/article.model.js";
import { matchedData } from "express-validator";

export const createTag = async (req, res) => {
  try {
    const validatedData = matchedData(req);
    const newTag = await TagModel.create(validatedData);
    return res.status(201).json({
      message: "etiqueta creada correctamente",
      tag: newTag,
    });
  } catch (error) {
    return res.status(500).json({ message: "error interno en el servidor" });
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
    const { id } = matchedData(req, { locations: ["params"] });
    const tag = await TagModel.findByPk(id, {
      include: [
        { model: ArticleModel, as: "articles", through: { attributes: [] } },
      ],
    });

    if (!tag) {
      return res
        .status(404)
        .json({ message: "esa etiqueta especificada no existe" });
    }
    return res.status(200).json(tag);
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const { name } = matchedData(req, { locations: ["body"] });

    const tag = await TagModel.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "esa etiqueta no existe" });
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
    const { id } = matchedData(req, { locations: ["params"] });
    const tag = await TagModel.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: "esa etiqueta no existe" });
    }
    await tag.destroy();
    return res.status(200).json({ message: "etiqueta eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
