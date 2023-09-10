import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { createSlug } from '../../utils/helpers/create-slug';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;

  @Expose({ name: 'slug' })
  get slug(): string {
    if (this.name) return createSlug(this.name);
  }
}
