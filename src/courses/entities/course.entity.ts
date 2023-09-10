import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { LANGUAGE } from '../utils/types/language';

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
}

export const CourseSchema = SchemaFactory.createForClass(Course);
