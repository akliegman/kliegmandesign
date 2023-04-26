import { Optional } from "sequelize";

export interface PhotoAttributes {
  id: number;
  name: string;
  albumId: number;
  imageUrl: string;
  awsUrl: string | null;
  mimetype: string;
  published: boolean;
}

export interface PhotoCreationAttributes
  extends Optional<PhotoAttributes, "id"> {}
