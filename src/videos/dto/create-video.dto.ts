import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  filename: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsMongoId()
  section: string;
}
