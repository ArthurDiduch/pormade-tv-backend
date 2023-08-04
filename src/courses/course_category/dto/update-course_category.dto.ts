import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseCategoryDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
