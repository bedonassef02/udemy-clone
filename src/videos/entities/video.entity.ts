import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Section } from '../../sections/entities/section.entity';

export type VideoDocument = HydratedDocument<Video>;

export class Video {
  @Prop()
  name: string;
  @Prop()
  filename: string;
  @Prop()
  description: string;
  @Prop()
  duration: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
