import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Roles } from '../utils/decorators/roles.decorator';
import { USER_ROLES } from '../users/utils/types/user-role';
import { CouponDocument } from './entities/coupon.entity';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';

@Controller({ path: 'courses/:course/coupons', version: '1' })
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  @Roles(USER_ROLES.ADMIN)
  create(
    @Param('course', ParseMongoIdPipe) course: string,
    @Body() createCouponDto: CreateCouponDto,
  ): Promise<CouponDocument> {
    createCouponDto.course = course;
    return this.couponsService.create(createCouponDto);
  }

  @Get()
  @Roles(USER_ROLES.ADMIN)
  findAll(
    @Param('course', ParseMongoIdPipe) course: string,
  ): Promise<CouponDocument[]> {
    return this.couponsService.findAll();
  }

  @Get(':id')
  @Roles(USER_ROLES.ADMIN)
  findOne(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id') id: string,
  ): Promise<CouponDocument> {
    return this.couponsService.findOne(id);
  }

  @Delete(':id')
  @Roles(USER_ROLES.ADMIN)
  async remove(
    @Param('course', ParseMongoIdPipe) course: string,
    @Param('id') id: string,
  ): Promise<void> {
    await this.couponsService.remove(id);
  }
}
