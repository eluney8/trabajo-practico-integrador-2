import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { bdLista } from "./src/config/database.js";
import { UserModel } from "./src/models/user.model.js";
import { TagModel } from "./src/models/tag.model.js";
import { ArticleModel } from "./src/models/article.model.js";
import { ArticleTagModel } from "./src/models/article_tag.model.js";
import { ProfileModel } from "./src/models/profile.model.js";
import { usersRoutes } from "./src/routes/user.routes.js";
import { articlesRoutes } from "./src/routes/articles.routes.js";
import { tagsRoutes } from "./src/routes/tags.routes.js";
import { articlesTagsRoutes } from "./src/routes/articles-tags.routes.js";
import { authRoutes } from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

// aca van a ir las rutas
app.use("/api", usersRoutes, articlesRoutes, tagsRoutes, articlesTagsRoutes,authRoutes);

app.get("/", (req, res) => {
  res.send("ruta de prueba");
});
bdLista();
app.listen(PORT, async () => {
  console.log(`servidor corriendo en el puerto ${PORT}`);
});