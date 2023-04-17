import { findAll } from "../controllers/sessions";
import { requireAdminAuth } from "../middleware/auth";

export default (app: any) => {
  app.get("/api/sessions", requireAdminAuth, findAll);
};
