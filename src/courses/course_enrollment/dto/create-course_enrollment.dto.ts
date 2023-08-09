import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseEnrollmentDto {
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @IsNumber()
  @IsNotEmpty()
  course: number;
}
