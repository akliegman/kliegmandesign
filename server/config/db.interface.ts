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
