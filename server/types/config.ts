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

export interface DbConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  shouldUseSSL: boolean;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

export interface EnvConfig {
  env: string;
  port: number;
  whitelist: string[];
}

export interface PhotosConfig {
  directory: string;
}

export interface S3Config {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
  sslEnabled?: boolean;
  signatureVersion?: string;
  s3forcePathStyle?: boolean;
}

export interface SlackConfig {
  botToken: string;
  channel: string;
}
