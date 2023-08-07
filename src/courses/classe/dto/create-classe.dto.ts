import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClasseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  order: number;

  @IsNumber()
  @IsNotEmpty()
  module: number;
}
