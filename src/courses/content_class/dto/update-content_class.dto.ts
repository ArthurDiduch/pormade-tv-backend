import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateContentClassDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  classe: number;

  @IsOptional()
  @IsNumber()
  order: number;
}
