export interface AuthConfig {
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
