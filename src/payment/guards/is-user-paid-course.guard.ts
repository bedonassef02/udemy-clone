import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { PaymentService } from '../payment.service';
import { PaymentDocument } from '../entities/payment.entity';

@Injectable()
export class IsUserPaidCourseGuard implements CanActivate {
  constructor(private readonly paymentService: PaymentService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { course } = request.params;
    const user = request.user.id;

    const payment: PaymentDocument | undefined =
      await this.paymentService.findOne(user, course);

    if (payment) {
      throw new ConflictException('you already paid this course');
    }
    return true;
  }
}
