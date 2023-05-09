import { DataTypes, Sequelize } from "sequelize";
import { Album } from "./albums.class";
import { logger } from "../utils/logger";

export function AlbumsModel(sequelize: Sequelize): typeof Album {
  logger.info("Creating Albums model...");

  Album.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "albums",
    }
  );

  logger.info("Albums model created.");
  return Album;
}
