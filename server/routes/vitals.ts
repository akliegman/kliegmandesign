import { Application } from "express";
import { findAllVitals, createVital } from "../controllers/vitals";

export const vitalsRoutes: (app: Application) => void = (app: Application) => {
  app.get("/api/vitals", findAllVitals);
  app.post("/api/vitals/create", createVital);
};
