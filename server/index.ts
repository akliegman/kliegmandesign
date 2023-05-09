import express, { Application, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import path from "path";
import session from "express-session";
import { authConfig } from "./config/auth";
import { envConfig } from "./config/env";
import { db } from "./models/db";
import { photosSeed } from "./seed/photos";
import { albumsSeed } from "./seed/albums";
import { authRoutes } from "./routes/auth";
import { sessionsRoutes } from "./routes/sessions";
import { photosRoutes } from "./routes/photos";
import { albumsRoutes } from "./routes/albums";
import { envRoutes } from "./routes/env";
import { logger } from "./utils/logger";

const app: Application = express();

logger.info("-------------------------------------------------------");
logger.info("WELCOME TO THE KLIEGMAN DESIGN APP");
logger.info("-------------------------------------------------------");

const port: number = envConfig.port! || 3001;

logger.info("-------------------------------------------------------");
logger.info("SETTING UP MIDDLEWARE");
logger.info("-------------------------------------------------------");

logger.info("Setting up CORS...");

const corsOptions: CorsOptions = {
  origin(origin: any, cb: any) {
    if (!origin || envConfig.whitelist.indexOf(origin) !== -1) {
      return cb(null, true);
    } else {
      return cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

logger.info("Cors options: " + JSON.stringify(corsOptions));
app.use(cors(corsOptions));
logger.info("Set up CORS.");

logger.info("Setting up JSON and URL encoded middleware...");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
logger.info("Set up JSON and URL encoded middleware.");

logger.info("Setting up session middleware...");
app.use(session(authConfig.session));

app.use((req: Request, res: Response, next: NextFunction) => {
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
logger.info("Set up session middleware.");

logger.info("-------------------------------------------------------");
logger.info("SYNCING DB");
logger.info("-------------------------------------------------------");
db.sequelize
  .sync()
  .then(() => logger.info("Synced db."))
  .catch((err: any) => logger.info("Failed to sync db: " + err.message))
  .then(() => {
    logger.info("-------------------------------------------------------");
    logger.info("SEEDING DB");
    logger.info("-------------------------------------------------------");
    photosSeed(db);
    albumsSeed(db);
    logger.info("Seeded db.");
  });

logger.info("-------------------------------------------------------");
logger.info("SETTING UP ROUTES");
logger.info("-------------------------------------------------------");
logger.info("Checking path...");
logger.info(path.join(__dirname, "../../client/build"));

logger.info("Setting up static routes...");
logger.info(path.join(__dirname, "../../client/build"));
app.use(express.static(path.join(__dirname, "../../client/build")));

logger.info("Setting up public route...");
logger.info(path.join(__dirname, "../public"));
app.use(express.static(path.join(__dirname, "../public")));

logger.info("Setting upload dummy page route...");
logger.info(path.join(__dirname, "../public", "upload.html"));
app.get("/upload", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "upload.html"));
});

logger.info("Setting up auth routes...");
authRoutes(app);
logger.info("Setting up sessions routes...");
sessionsRoutes(app);
logger.info("Setting up photos routes...");
photosRoutes(app);
logger.info("Setting up albums routes...");
albumsRoutes(app);
logger.info("Setting up env routes...");
envRoutes(app);

logger.info("Setting up catch-all routes...");
app.get("/api/*", (req: Request, res: Response) => {
  res.status(404).send({ message: "404: Not Found" });
});
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

logger.info("Set up routes.");

logger.info("-------------------------------------------------------");
logger.info("STARTING SERVER");
logger.info("-------------------------------------------------------");
app.listen(port, () => logger.info(`Server is running on ${port}`));
