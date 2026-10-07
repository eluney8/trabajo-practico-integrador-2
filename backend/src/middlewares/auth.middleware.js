import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies["token"];
    if (!token) {
      return res.status(401).json({ message: "no autenticado. inicie sesion" });
    }
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: "sesion invalida o expirada" });
  }
};