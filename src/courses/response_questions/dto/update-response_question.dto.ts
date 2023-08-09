import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateResponseQuestionDto {
  @IsOptional()
  @IsString()
  response: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsNumber()
  question: number;
}
