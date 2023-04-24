import * as dotenv from "dotenv";

dotenv.config();

interface DbConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  shouldUseSSL: boolean;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

export const dbConfig: DbConfig = {
  HOST: process.env.POSTGRES_HOST!,
  USER: process.env.POSTGRES_USER!,
  PASSWORD: process.env.POSTGRES_PASSWORD!,
  DB: process.env.POSTGRES_DB!,
  shouldUseSSL: process.env.ENV === "prod" ? true : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
