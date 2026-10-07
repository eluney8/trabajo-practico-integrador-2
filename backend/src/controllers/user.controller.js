import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";
import { hashPassword } from "../helpers/bcript.helper.js";
import { matchedData } from "express-validator";

export const createUser = async (req, res) => {
  try {
    const data = matchedData(req);
    const hashedPassword = await hashPassword(data.password);

    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role || "user",
    });

    const profile = await ProfileModel.create({
      user_id: user.id,
      first_name: data.first_name,
      last_name: data.last_name,
      biography: data.biography || null,
    });
    return res.status(201).json({
      message: "se creó correctamente",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: { model: ProfileModel, as: "profile" },
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: ProfileModel, as: "profile" },
        { model: ArticleModel, as: "articles" },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const bodyData = matchedData(req, { locations: ["body"] });
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }
    if (bodyData.password) {
      bodyData.password = await hashPassword(bodyData.password);
    }
    await user.update(bodyData);
    return res.status(200).json({
      message: "usuario actualizado con exito",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }
    await user.destroy();
    return res.status(200).json({ message: "usuario eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "error interno del servidor" });
  }
};
