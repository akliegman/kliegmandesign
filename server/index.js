const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const db = require("./models");
const corsOptions = { origin: process.env.CORS_ORIGIN };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

require("./routes/photos")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => console.log(`Server is running on ${port}`));
