import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from '../../courses/entities/course.entity';
import mongoose, { HydratedDocument } from 'mongoose';

export type CouponDocument = HydratedDocument<Coupon>;

@Schema({ timestamps: true })
export class Coupon {
  @Prop({ unique: true })
  code: string;

  @Prop()
  discountPercent: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;

  @Prop()
  validFrom: Date;
  @Prop()
  validTo: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
