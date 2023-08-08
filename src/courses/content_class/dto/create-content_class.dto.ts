import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateContentClassDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  classe: number;

  @IsNumber()
  order: number;
}
