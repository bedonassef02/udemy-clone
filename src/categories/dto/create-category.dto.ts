import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Expose } from 'class-transformer';
import { createSlug } from '../../utils/helpers/create-slug';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(128)
  name: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  description: string;

  @Expose({ name: 'slug' })
  get slug(): string {
    if (this.name) {
      return createSlug(this.name);
    }
    return;
  }
}
