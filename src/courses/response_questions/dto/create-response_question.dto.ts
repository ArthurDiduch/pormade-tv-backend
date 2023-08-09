import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateResponseQuestionDto {
  @IsNotEmpty()
  @IsString()
  response: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsNotEmpty()
  @IsNumber()
  question: number;
}
