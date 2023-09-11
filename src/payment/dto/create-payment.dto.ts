import { IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsString()
  coupon: string;
  course?: string;
  user?: string;
  price?: number;
  finalPrice?: number;
}
