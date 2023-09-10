
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {User} from "../../users/entities/user.entity";
import {Course} from "../../courses/entities/course.entity";

export type EnrollmentDocument = HydratedDocument<Enrollment>;
@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
