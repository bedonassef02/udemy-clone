import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from 'mongoose';
import { Course } from '../../courses/entities/course.entity';
import { Video } from '../../videos/entities/video.entity';

export type SectionDocument = HydratedDocument<Section>;
@Schema({ timestamps: true })
export class Section {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Video' }] })
  videos: Video[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
