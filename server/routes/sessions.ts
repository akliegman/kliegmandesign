import { Application, Router, Request, Response } from "express";
import {
  findAllSessions,
  createSession,
  endSession,
  slackSessionStarted,
} from "../controllers/sessions";

const router: Router = Router();

router.get(
  "/",
  createSession,
  slackSessionStarted,
  (req: Request, res: Response) => {
    res.status(200).send(req.session);
  }
);
router.post("/end", endSession);

export const sessionsRoutes: (app: Application) => void = (
  app: Application
) => {
  app.get("/api/sessions", findAllSessions);
  app.use("/api/session", router);
};
