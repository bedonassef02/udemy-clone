import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class IsUserEnrolledGuard implements CanActivate {
  constructor(private readonly enrollmentService: EnrollmentService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { course } = request.params;
    const user = request.user.id;
    const isUserEnrolled = await this.enrollmentService.isUserEnrollToCourse(
      user,
      course,
    );
    if (isUserEnrolled) {
      throw new UnauthorizedException(
        'you must enroll to the course before showing its content',
      );
    }
    return true;
  }
}
