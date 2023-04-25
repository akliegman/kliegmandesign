import { Sequelize } from "sequelize";
import { dbConfig } from "../config/db";
import { SessionsModel } from "./sessions";
import { PhotosModel } from "./photos";
import { DbInterface } from "../types/db";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "postgres",
  ...(dbConfig.shouldUseSSL && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    ssl: true,
  }),
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

export const db: DbInterface = {
  sequelize,
  photos: PhotosModel(sequelize),
  sessions: SessionsModel(sequelize),
};
