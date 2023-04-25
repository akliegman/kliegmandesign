import { Application } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const filteredEnv = process.env
  ? Object.keys(process.env)
      .filter((key) => key.startsWith("REACT_APP_"))
      .reduce((obj: any, key) => {
        obj[key] = process.env[key];
        return obj;
      }, {})
  : {};

export const envRoutes = (app: Application) => {
  app.get("/api/env", (req, res) => {
    res.json(filteredEnv);
  });
};
