import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { LANGUAGE } from '../utils/types/language';
import { Category } from '../../categories/entities/category.entity';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true })
export class Course {
  @Prop()
  name: string;
  @Prop({ unique: true })
  slug: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
  @Prop()
  requirements: string[];
  @Prop()
  description: string;

  @Prop()
  summary: string;

  @Prop({ default: LANGUAGE.EN })
  language: string;

  @Prop()
  learn: string[];
  @Prop()
  price: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
