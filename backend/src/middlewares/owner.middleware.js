import { ArticleModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const article = await ArticleModel.findByPk(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "el articulo no existe" });
    }
    if (article.user_id === req.user.id || req.user.role === "admin") {
      return next();
    }
    return res.status(403).json({ message: "no tenes permisos" });
  } catch (error) {
    return res.status(500).json({ message: "error interno de autorizacion" });
  }
};