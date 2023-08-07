import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateClasseDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  order: number;

  @IsNumber()
  @IsOptional()
  module: number;
}
