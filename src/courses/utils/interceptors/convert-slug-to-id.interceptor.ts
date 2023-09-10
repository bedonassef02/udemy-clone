import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class ConvertSlugToIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Extract the 'id' from the request parameters
    const { id } = context.switchToHttp().getRequest().params;

    // Find the last index of '-' in the 'id'
    const lastHyphenIndex = id.lastIndexOf('-');

    // Extract the substring after the last '-' and update 'id'
    const newId =
      lastHyphenIndex !== -1 ? id.substring(lastHyphenIndex + 1) : id;
    context.switchToHttp().getRequest().params.id = newId;

    // Continue handling the request
    return next.handle();
  }
}
