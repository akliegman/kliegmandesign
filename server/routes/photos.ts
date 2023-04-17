import { Router } from "express";
import {
  findAll,
  upload,
  create,
  delete as deletePhoto,
  findOne,
  findAllByAlbumId,
  update,
  get,
} from "../controllers/photos";

const router = Router();
const photosDir = process.env.ENV === "local" ? "photos-local" : "photos";

router.get("/", findAll);
router.post("/create", upload, create);
router.delete("/delete/:id", deletePhoto);
router.get("/:id", findOne);
router.get("/album/:id", findAllByAlbumId);
router.post("/update/:id", update);

export default (app: any) => {
  app.use("/api/photos", router);
  app.get(`/${photosDir}/:imageId`, get);
};
