import { Application, Router, Request, Response } from "express";
import {
  slackLoggedIn,
  authSession,
  authLogin,
  authLogout,
  authCheck,
  requireAuth,
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
router.get("/session", requireAuth, authSession);

export const authRoutes = (app: Application) => {
  app.use("/api", router);
};
