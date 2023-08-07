import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCourseModuleDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  order: number;

  @IsOptional()
  @IsNumber()
  course: number;
}
