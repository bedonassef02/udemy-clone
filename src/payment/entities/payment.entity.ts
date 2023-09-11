import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';
import { Coupon } from '../../coupons/entities/coupon.entity';
import mongoose, { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;
@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
  course: Course;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' })
  coupon: Coupon;
  @Prop()
  price: number;
  @Prop()
  finalPrice: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
