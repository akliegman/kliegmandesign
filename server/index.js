const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const authConfig = require("./config/auth");

const app = express();
const port = process.env.PORT || 3001;

const db = require("./models");

const whitelist = process.env.CORS_ORIGINS.split(",").map((item) =>
  item.trim()
);

const corsOptions = {
  origin: function (origin, cb) {
    if (!origin) return cb(null, true);

    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(authConfig.session));
app.use((req, res, next) => {
  if (typeof req.session.isNew === "undefined") {
    req.session.isNew = true;
    req.session.save(next);
  } else if (req.session.isNew) {
    req.session.isNew = false;
    req.session.save(next);
  } else {
    next();
  }
});

db.sequelize
  .sync()
  .then(() => console.log("Synced db."))
  .catch((err) => console.log("Failed to sync db: " + err.message));

require("./seed/photos")(db);

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "upload.html"));
});

require("./routes/auth")(app);
require("./routes/photos")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Server is running on ${port}`));
