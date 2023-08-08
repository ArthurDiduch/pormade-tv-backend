import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  question: string;

  @IsOptional()
  @IsNumber()
  activity: number;
}
