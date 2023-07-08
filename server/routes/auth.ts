import { Application, Router, Request, Response } from "express";
import {
  slackLoggedIn,
  authLogin,
  authLogout,
  authCheck,
} from "../middleware/auth";
import { createSession } from "../controllers/sessions";

const router: Router = Router();

router.get(
  "/login",
  authLogin,
  slackLoggedIn,
  createSession,
  (req: Request, res: Response) => {
    res.status(200).send(req.session);
  }
);

router.get("/auth", authCheck);
router.get("/logout", authLogout);

export const authRoutes: (app: Application) => void = (app: Application) => {
  app.use("/api", router);
};
