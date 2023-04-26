import { Application } from "express";
import { findAllSessions } from "../controllers/sessions";

export const sessionsRoutes: (app: Application) => void = (
  app: Application
) => {
  app.get("/api/sessions", findAllSessions);
};
