import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Course } from '../../entities/course.entity';

export type SectionDocument = HydratedDocument<Section>;
@Schema({ timestamps: true })
export class Section {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;
}

export const SectionSchema = SchemaFactory.createForClass(Section);
