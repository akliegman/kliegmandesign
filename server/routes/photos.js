const photos = require("../controllers/photos.js");
const router = require("express").Router();
const photosDir = process.env.ENV === "local" ? "photos-local" : "photos";

router.get("/", photos.findAll);
router.post("/create", photos.upload, photos.create);
router.delete("/delete/:id", photos.delete);
router.get("/:id", photos.findOne);
router.get("/album/:id", photos.findAllByAlbumId);
router.post("/update/:id", photos.update);

module.exports = (app) => {
  app.use("/api/photos", router);
  app.get(`/${photosDir}/:imageId`, photos.get);
};
