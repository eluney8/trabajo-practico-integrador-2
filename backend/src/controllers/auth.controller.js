import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword,comparePassword } from "../helpers/bcript.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { matchedData } from "express-validator";

export const register = async (req, res) => {
  try {
    const data = matchedData(req);
    const hashedPassword = await hashPassword(data.password);
    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });
    const profile = await ProfileModel.create({
      user_id: user.id,
      first_name: data.first_name,
      last_name: data.last_name,
      biography: data.biography || null,
    });

    return res.status(201).json({
      message: "usuario registrado y perfil creado con exito",
      user: { id: user.id, username: user.username, email: user.email },
      profile,
    });
  } catch (error) {
    return res.status(500).json({ message: "error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "credenciales invalidas" });
    }
    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 5,
    });
    return res.status(200).json({ message: "login correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "error al iniciar sesion" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "logout correctamente" });
};

export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
      include: { model: ProfileModel, as: "profile" },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "error al obtener perfil" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req);
    const profile = await ProfileModel.findOne({
      where: { user_id: req.user.id },
    });

    if (!profile) {
      return res.status(404).json({ message: "perfil no encontrado" });
    }

    await profile.update(data);
    return res
      .status(200)
      .json({ message: "perfil actualizado correctamente", profile });
  } catch (error) {
    return res.status(500).json({ message: "error al actualizar perfil" });
  }
};
