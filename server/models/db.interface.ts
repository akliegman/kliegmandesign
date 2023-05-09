import { Sequelize } from "sequelize";
import { Photo } from "./photos.class";
import { Session } from "./sessions.class";
import { Album } from "./albums.class";

export interface Db {
  sequelize: Sequelize;
  photos: typeof Photo;
  albums: typeof Album;
  sessions: typeof Session;
}
