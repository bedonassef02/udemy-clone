import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class IsAlreadyEnrolledFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorMessage = exception.message || 'An error occurred';

    if (status === HttpStatus.UNAUTHORIZED) {
      response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: 'You are already enrolled in this course',
      });
    } else {
      response.status(status).json({
        statusCode: status,
        message: errorMessage,
      });
    }
  }
}
