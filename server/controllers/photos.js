const db = require("../models");
const Photos = db.photos;
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

const photosDir = process.env.ENV === "local" ? "photos-local" : "photos";

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  key: function (req, file, cb) {
    cb(null, `${photosDir}/${Date.now()}-${file.originalname}`);
  },
  name: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.findAll = async (req, res) => {
  try {
    const photos = await Photos.findAll();
    return res.send(photos);
  } catch (error) {
    return res.status(500).send({
      message: `Error occurred while retrieving photos: ${error.message}`,
    });
  }
};

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: Images only!"));
  },
}).single("file");

exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        message: "Please upload a file.",
      });
    }

    const photo = {
      name: req.file.originalname,
      albumId: req.body.albumId || 1,
      imageUrl: `/${req.file.key}`,
      awsUrl: req.file.location,
      mimetype: req.file.mimetype,
      published: true,
    };

    const newPhoto = await Photos.create(photo);
    return res.send(newPhoto);
  } catch (error) {
    return res.status(500).send({
      message: `Error occurred while creating the photo: ${error.message}`,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Photos.destroy({ where: { id: id } });
    if (num == 1) {
      return res.send({ message: "Photo was deleted successfully!" });
    }
    return res.send({
      message: `Cannot delete photo with id=${id}. Maybe photo was not found!`,
    });
  } catch (error) {
    return res.status(500).send({
      message: `Could not delete photo with id=${id}: ${error.message}`,
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const photo = await Photos.findByPk(id);
    if (photo) {
      return res.send(photo);
    }
    return res.status(404).send({
      message: `Photo with id=${id} was not found`,
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error retrieving photo with id=${id}: ${error.message}`,
    });
  }
};

exports.findAllByAlbumId = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Photos.findAll({
      where: { albumId: id },
    });

    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving photos with albumId=" + id,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const [num, updatedPhoto] = await Photos.update(req.body, {
      where: { id: id },
      returning: true,
    });

    if (num == 1) {
      res.send({
        message: "Photo was updated successfully.",
        photo: updatedPhoto[0],
      });
    } else {
      res.send({
        message: `Cannot update photo with id=${id}. Maybe photo was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating photo with id=" + id,
      error: err,
    });
  }
};

exports.get = (req, res) => {
  if (!req.params.imageId) {
    return res.status(400).send("No image id in request");
  }
  const key = `${photosDir}/${req.params.imageId}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  const getImageType = (key) => {
    const imageTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
    };

    const extension = key.split(".").pop();

    return imageTypes[extension];
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send("File not found.");
    }

    res.writeHead(200, { "Content-Type": getImageType(key) });
    res.write(data.Body, "binary");
    res.end(null, "binary");
  });
};
