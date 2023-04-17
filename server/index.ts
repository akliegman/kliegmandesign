import express from "express";
import cors from "cors";
import path from "path";
import session from "express-session";
import dotenv from "dotenv";
import authConfig from "./config/auth";
import db from "./models";
import photosSeed from "./seed/photos";
import authRoutes from "./routes/auth";
import sessionRoutes from "./routes/sessions";
import photosRoutes from "./routes/photos";
import winston from "winston";

const app = express();
const port = process.env.PORT || 3001;

const whitelist = process.env.CORS_ORIGINS.split(",").map((item) =>
  item.trim()
);

dotenv.config();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "kliegmandesign" },
  transports: [new winston.transports.Console()],
});

const corsOptions = {
  origin(origin: any, cb: any) {
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
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (typeof req.session.isNew === "undefined") {
      req.session.isNew = true;
      req.session.save(next);
    } else if (req.session.isNew) {
      req.session.isNew = false;
      req.session.save(next);
    } else {
      next();
    }
  }
);

db.sequelize
  .sync()
  .then(() => logger.info("Synced db."))
  .catch((err: any) => logger.info("Failed to sync db: " + err.message));

photosSeed(db);

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/upload", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "public", "upload.html"));
});

authRoutes(app);
sessionRoutes(app);
photosRoutes(app);

app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(port, () => logger.info(`Server is running on ${port}`));
