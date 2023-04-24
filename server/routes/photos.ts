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
import * as dotenv from "dotenv";

dotenv.config();

const router: Router = Router();
const photosDir: string =
  process.env.ENV === "local" ? "photos-local" : "photos";

router.get("/", findAllPhotos);
router.post("/create", uploadPhoto, createPhoto);
router.delete("/delete/:id", deletePhoto);
router.get("/:id", findOnePhoto);
router.get("/album/:id", findAllPhotosByAlbumId);
router.post("/update/:id", updatePhoto);

export const photosRoutes = (app: Application) => {
  app.use("/api/photos", router);
  app.get(`/${photosDir}/:imageId`, getPhoto);
};
