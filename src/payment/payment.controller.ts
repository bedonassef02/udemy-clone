import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { Roles } from '../utils/decorators/roles.decorator';
import { USER_ROLES } from '../users/utils/types/user-role';
import { IsUserPaidCourseGuard } from './guards/is-user-paid-course.guard';
import { PaymentDocument } from './entities/payment.entity';

@Controller({ path: 'courses/:course/payment', version: '1' })
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Roles(USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  @UseGuards(IsUserPaidCourseGuard)
  create(
    @Param('course', ParseMongoIdPipe) course: string,
    @Req() request: any,
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<PaymentDocument> {
    const user = request.user.id;
    createPaymentDto.user = user;
    createPaymentDto.course = course;
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @Roles(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  findAll(
    @Param('course', ParseMongoIdPipe) course: string,
  ): Promise<PaymentDocument[]> {
    return this.paymentService.findAll(course);
  }
}
