import { Controller, Get, Post, Param, Req } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { ParseMongoIdPipe } from '../../utils/pipes/parse-mongo-id.pipe';

@Controller('courses/:course/enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  // TODO: Add guards here
  @Post()
  create(
    @Req() request: any,
    @Param('course', ParseMongoIdPipe) course: string,
  ) {
    const user = request.user.id;
    return this.enrollmentService.create({ course, user });
  }

  @Get()
  findAll() {
    return this.enrollmentService.findAll({ course: '' });
  }
}
