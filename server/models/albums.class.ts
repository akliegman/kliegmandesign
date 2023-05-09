import { Model } from "sequelize";
import { AlbumCreationAttributes } from "./albums.interface";

export class Album
  extends Model<AlbumCreationAttributes>
  implements AlbumCreationAttributes
{
  public id!: number;
  public name!: string;
  public albumId!: number;
  public published!: boolean;
}
