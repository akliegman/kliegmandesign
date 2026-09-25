export interface DbConfig {
  URL?: string;
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
