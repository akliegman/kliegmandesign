import * as dotenv from "dotenv";
import { EnvConfig } from "./env.interface";

dotenv.config();

export const envConfig: EnvConfig = {
  env: process.env.ENV! || process.env.NODE_ENV!,
  port: parseInt(process.env.PORT!, 10),
  whitelist: process.env.CORS_ORIGINS!.split(",").map((item) => item.trim()),
};
