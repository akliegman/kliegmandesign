import { Sequelize } from "sequelize";
import { Photo } from "./photos.class";
import { Session } from "./sessions.class";
import { Vital } from "./vitals.class";

export interface Db {
  sequelize: Sequelize;
  photos: typeof Photo;
  sessions: typeof Session;
  vitals: typeof Vital;
}
