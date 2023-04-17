"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./config/auth"));
const models_1 = __importDefault(require("./models"));
const photos_1 = __importDefault(require("./seed/photos"));
const auth_2 = __importDefault(require("./routes/auth"));
const sessions_1 = __importDefault(require("./routes/sessions"));
const photos_2 = __importDefault(require("./routes/photos"));
const winston_1 = __importDefault(require("winston"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
const whitelist = process.env.CORS_ORIGINS.split(",").map((item) => item.trim());
dotenv_1.default.config();
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    defaultMeta: { service: "kliegmandesign" },
    transports: [new winston_1.default.transports.Console()],
});
const corsOptions = {
    origin(origin, cb) {
        if (!origin)
            return cb(null, true);
        if (whitelist.indexOf(origin) !== -1) {
            cb(null, true);
        }
        else {
            cb(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)(auth_1.default.session));
app.use((req, res, next) => {
    if (typeof req.session.isNew === "undefined") {
        req.session.isNew = true;
        req.session.save(next);
    }
    else if (req.session.isNew) {
        req.session.isNew = false;
        req.session.save(next);
    }
    else {
        next();
    }
});
models_1.default.sequelize
    .sync()
    .then(() => logger.info("Synced db."))
    .catch((err) => logger.info("Failed to sync db: " + err.message));
(0, photos_1.default)(models_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/upload", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "upload.html"));
});
(0, auth_2.default)(app);
(0, sessions_1.default)(app);
(0, photos_2.default)(app);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../client/build", "index.html"));
});
app.listen(port, () => logger.info(`Server is running on ${port}`));
//# sourceMappingURL=index.js.map