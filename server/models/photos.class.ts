import { Model } from "sequelize";
import { PhotoCreationAttributes } from "./photos.interface";

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
