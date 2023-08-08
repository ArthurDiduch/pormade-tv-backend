import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateContentClassDto {
  @IsNotEmpty()
  content: Buffer;

  @IsNotEmpty()
  @IsNumber()
  classe: number;

  @IsNumber()
  order: number;
}
