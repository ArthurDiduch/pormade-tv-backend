import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAchievementDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  requiredVideos: number;
}
