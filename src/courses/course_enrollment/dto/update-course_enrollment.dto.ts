import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCourseEnrollmentDto {
  @IsOptional()
  @IsNumber()
  user: number;

  @IsOptional()
  @IsNumber()
  course: number;
}
