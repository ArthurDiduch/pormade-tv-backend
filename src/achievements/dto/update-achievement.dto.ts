import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAchievementDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsNumber()
  requiredVideos: number;
}
