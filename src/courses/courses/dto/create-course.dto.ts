import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  instructor: string;

  @IsNotEmpty()
  category: number;
}
