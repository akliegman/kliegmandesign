import { Router, Request, Response } from "express";
import * as auth from "../middleware/auth";
import * as sessions from "../controllers/sessions";

const router = Router();

interface LoginRequest extends Request {
  session: any;
}

interface LoginResponse extends Response {
  session: any;
}

router.get(
  "/api/login",
  auth.login,
  auth.slackLoggedIn,
  sessions.create,
  (req: LoginRequest, res: LoginResponse) => {
    res.status(200).send(req.session);
  }
);

router.get("/auth", auth.check);
router.get("/logout", auth.logout);
router.get("/session", auth.session);

export default (app: any) => {
  app.use("/api", router);
};
