import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseModuleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  order: number;

  @IsNotEmpty()
  @IsNumber()
  course: number;
}
