import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {EnrollmentService} from "./enrollment.service";
import {USER_ROLES} from "../users/utils/types/user-role";
import {Roles} from "../utils/decorators/roles.decorator";
import {IsUserEnrolledGuard} from "../courses/guards/is-user-enrolled.guard";
import {IsAlreadyEnrolledFilter} from "./filters/is-already-enrolled.filter";
import {ParseMongoIdPipe} from "../utils/pipes/parse-mongo-id.pipe";

@Controller({ path: 'courses/:course/enroll', version: '1' })
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}
  @Post()
  @Roles(USER_ROLES.STUDENT, USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  @UseGuards(IsUserEnrolledGuard)
  @UseFilters(IsAlreadyEnrolledFilter)
  create(
    @Req() request: any,
    @Param('course', ParseMongoIdPipe) course: string,
  ) {
    const user = request.user.id;
    return this.enrollmentService.create({ course, user });
  }

  @Get()
  @Roles(USER_ROLES.INSTRUCTOR, USER_ROLES.ADMIN)
  findAll() {
    return this.enrollmentService.findAll({ course: '' });
  }
}
