import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Coupon, CouponDocument } from './entities/coupon.entity';
import { Model } from 'mongoose';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
  ) {}
  async create(createCouponDto: CreateCouponDto): Promise<CouponDocument> {
    const coupon: CouponDocument | undefined = await this.findByCode(
      createCouponDto.code,
    );
    if (coupon) {
      throw new ConflictException('this coupon is already in use');
    }
    return this.couponModel.create(createCouponDto);
  }

  findAll(): Promise<CouponDocument[]> {
    return this.couponModel.find();
  }

  findByCode(code: string): Promise<CouponDocument | undefined> {
    return this.couponModel.findOne({ code });
  }
  async findOne(id: string): Promise<CouponDocument> {
    const coupon: CouponDocument | undefined = await this.couponModel.findById(
      id,
    );
    if (!coupon) throw new NotFoundException('coupon not found');
    return coupon;
  }
  async remove(id: string): Promise<void> {
    await this.couponModel.findByIdAndRemove(id);
  }
}
