"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photos_1 = require("../controllers/photos");
const router = (0, express_1.Router)();
const photosDir = process.env.ENV === "local" ? "photos-local" : "photos";
router.get("/", photos_1.findAll);
router.post("/create", photos_1.upload, photos_1.create);
router.delete("/delete/:id", photos_1.delete);
router.get("/:id", photos_1.findOne);
router.get("/album/:id", photos_1.findAllByAlbumId);
router.post("/update/:id", photos_1.update);
exports.default = (app) => {
    app.use("/api/photos", router);
    app.get(`/${photosDir}/:imageId`, photos_1.get);
};
//# sourceMappingURL=photos.js.map