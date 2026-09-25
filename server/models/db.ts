import { Options, Sequelize } from "sequelize";
import { dbConfig } from "../config/db";
import { Db } from "./db.interface";

const options: Options = {
  dialect: "postgres",
  // Default query logging would print visit queries to the log stream.
  logging: false,
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
};

// Heroku rotates credentials (for example during a Postgres upgrade) and keeps DATABASE_URL
// current, so it takes precedence over the individual POSTGRES_* variables used locally.
const sequelize = dbConfig.URL
  ? new Sequelize(dbConfig.URL, options)
  : new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, { ...options, host: dbConfig.HOST });

export const db: Db = { sequelize };
