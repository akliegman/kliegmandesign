import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";
import { PhotoCreationAttributes } from "../types/photos";
import { logger } from "../utils/logger";

export class Photo
  extends Model<PhotoCreationAttributes>
  implements PhotoCreationAttributes
{
  public id!: number;
  public name!: string;
  public albumId!: number;
  public imageUrl!: string;
  public awsUrl!: string | null;
  public mimetype!: string;
  public published!: boolean;
}

export function PhotosModel(sequelize: Sequelize): typeof Photo {
  logger.info("Creating Photos model...");

  Photo.init(
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
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      awsUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "photos",
    }
  );

  logger.info("Photos model created.");
  return Photo;
}
