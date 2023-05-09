import { Optional } from "sequelize";

export interface AlbumAttributes {
  id: number;
  name: string;
  albumId: number;
  published: boolean;
}

export interface AlbumCreationAttributes
  extends Optional<AlbumAttributes, "id"> {}
