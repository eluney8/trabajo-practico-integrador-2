import { ArticleModel } from "../models/article.model.js";
import { ArticleTagModel } from "../models/article_tag.model.js";
import { TagModel } from "../models/tag.model.js";
import { matchedData } from "express-validator";

export const addTagToArticle = async (req, res) => {
  try {
    const { article_id, tag_id } = matchedData(req);
    const article = await ArticleModel.findByPk(article_id);
    if (!article) {
      return res
        .status(404)
        .json({ message: "el articulo con ese id no existe" });
    }
    const tag = await TagModel.findByPk(tag_id);
    if (!tag) {
      return res
        .status(404)
        .json({ message: "la etiqueta con ese id no existe" });
    }
    const asociacionExiste = await ArticleTagModel.findOne({
      where: { article_id, tag_id },
    });
    if (asociacionExiste) {
      return res
        .status(400)
        .json({ message: "este articulo ya tiene esa etiqueta asociada" });
    }
    const newAssociation = await ArticleTagModel.create({ article_id, tag_id });
    return res.status(201).json({
      message: "etiqueta asocioada correctamente",
      association: newAssociation,
    });
  } catch (error) {
    return res.status(500).json({ message: "error interno del  servidor" });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleTagId } = req.params;
    const association = await ArticleTagModel.findByPk(articleTagId);
    if (!association) {
      return res.status(404).json({ message: "esa asociacion no existe" });
    }
    await association.destroy();
    return res
      .status(200)
      .json({ message: "etiqueta desvinculada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
