import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(88)
  discountPercent: number;
  course?: string;
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  validFrom: Date;
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  validTo: Date;
}
