import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './entities/payment.entity';
import { Model } from 'mongoose';
import { CouponsService } from '../coupons/coupons.service';
import { CouponDocument } from '../coupons/entities/coupon.entity';
import { CoursesService } from '../courses/courses.service';
import { CourseDocument } from '../courses/entities/course.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<Payment>,
    private readonly couponsService: CouponsService,
    private readonly coursesService: CoursesService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDocument> {
    const course: CourseDocument | undefined =
      await this.coursesService.findOne(createPaymentDto.course);
    if (!course) {
      throw new NotFoundException('course not found');
    }
    if (createPaymentDto.coupon) {
      const coupon: CouponDocument | undefined =
        await this.couponsService.findByCode(createPaymentDto.coupon);
      if (coupon) {
        createPaymentDto.coupon = coupon.code;
      }
    }
    return this.paymentModel.create(createPaymentDto);
  }

  findAll(course: string): Promise<PaymentDocument[]> {
    return this.paymentModel.find();
  }

  findOne(user: string, course: string): Promise<PaymentDocument | undefined> {
    return this.paymentModel.findOne({ user, course });
  }
}
