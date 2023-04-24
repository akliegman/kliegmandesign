import * as dotenv from "dotenv";

dotenv.config();

interface AuthConfig {
  user: string;
  pass: string;
  adminUser: string;
  adminPass: string;
  session: {
    secret: string;
    resave: boolean;
    saveUninitialized: boolean;
    cookie: {
      secure: boolean;
      maxAge: number;
    };
  };
}

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
