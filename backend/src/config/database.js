import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const bdLista = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("conexion a la bd correcta");
    } catch (error) {
    console.log("error al conectarse a la bd", error);
}
}