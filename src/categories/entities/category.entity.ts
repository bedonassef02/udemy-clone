import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;
export class Category {
  @Prop({ unique: true })
  name: string;
  @Prop({ unique: true })
  slug: string;
  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
