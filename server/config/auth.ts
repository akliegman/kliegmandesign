import * as dotenv from "dotenv";
import { AuthConfig } from "../types/config";

dotenv.config();

export const authConfig: AuthConfig = {
  user: process.env.AUTH_USERNAME!,
  pass: process.env.AUTH_PASSWORD!,
  adminUser: process.env.AUTH_ADMIN_USERNAME!,
  adminPass: process.env.AUTH_ADMIN_PASSWORD!,
  session: {
    secret: process.env.AUTH_SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  },
};
