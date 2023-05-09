import { Application, Router } from "express";
import { findAllAlbums } from "../controllers/albums";

const router: Router = Router();

router.get("/", findAllAlbums);

export const albumsRoutes: (app: Application) => void = (app: Application) => {
  app.use("/api/albums", router);
};
