import { Application, Router } from "express";
import {
  findAllPhotos,
  createPhoto,
  deletePhoto,
  findOnePhoto,
  findAllPhotosByAlbumId,
  updatePhoto,
  getPhoto,
} from "../controllers/photos";
import { uploadPhoto } from "../middleware/photos";
import { RequestHandlerWithFile } from "../types/photos";
import { photosConfig } from "../config/photos";

const router: Router = Router();

router.get("/", findAllPhotos);
router.post("/create", uploadPhoto, createPhoto as RequestHandlerWithFile);
router.delete("/delete/:id", deletePhoto);
router.get("/:id", findOnePhoto);
router.get("/album/:id", findAllPhotosByAlbumId);
router.post("/update/:id", updatePhoto);

export const photosRoutes = (app: Application) => {
  app.use("/api/photos", router);
  app.get(`/${photosConfig.directory}/:imageId`, getPhoto);
};
