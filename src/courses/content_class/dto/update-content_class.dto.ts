import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateContentClassDto {
  @IsOptional()
  @IsString()
  content: Buffer;

  @IsOptional()
  @IsNumber()
  classe: number;

  @IsOptional()
  @IsNumber()
  order: number;
}
