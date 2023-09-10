import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MaxLength,
  IsMongoId,
  IsOptional,
  Max,
  Min,
  IsIn,
} from 'class-validator';
import { LANGUAGE } from '../utils/types/language';
import { Expose, Transform } from 'class-transformer';
import { createSlug } from '../../utils/helpers/create-slug';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsNotEmpty()
  @IsMongoId()
  createdBy: string; // You can use a string for the createdBy user ID

  @IsOptional()
  @IsString({ each: true })
  requirements: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  summary: string;
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsIn(Object.values(LANGUAGE))
  language: string;

  @IsNotEmpty()
  @IsString({ each: true })
  learn: string[];
  @IsNotEmpty()
  @IsNumber()
  @Max(10000)
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsMongoId()
  category: string;
  @Expose({ name: 'slug' })
  get slug(): string {
    if (this.name) {
      return createSlug(this.name);
    }
    return;
  }
}
