import express, { Application, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import path from "path";
import { envConfig } from "./config/env";
import { db } from "./models/db";
import { envRoutes } from "./routes/env";
import { logger } from "./utils/logger";
import { readVisitsConfig } from "./visits/config";
import { startVisits } from "./visits";

const app: Application = express();

logger.info("-------------------------------------------------------");
logger.info("WELCOME TO THE KLIEGMAN DESIGN APP");
logger.info("-------------------------------------------------------");

const port: number = envConfig.port! || 3001;

logger.info("-------------------------------------------------------");
logger.info("SETTING UP MIDDLEWARE");
logger.info("-------------------------------------------------------");

// Mounted before CORS: the collector is same-origin only and checks the Origin header itself.
logger.info("Setting up visit analytics...");
startVisits(app, db.sequelize, readVisitsConfig(), (message) => logger.info(message));

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

logger.info("-------------------------------------------------------");
logger.info("SETTING UP ROUTES");
logger.info("-------------------------------------------------------");
logger.info("Checking path...");
logger.info(path.join(__dirname, "../../client/build"));

// The résumé was renamed; links already sent out still resolve.
app.get("/resume_kliegman_adam_2026.pdf", (req: Request, res: Response) => {
  res.redirect(301, "/adamkliegman_resume_2026.pdf");
});

logger.info("Setting up static routes...");
logger.info(path.join(__dirname, "../../client/build"));
app.use(express.static(path.join(__dirname, "../../client/build")));

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
