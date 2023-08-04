import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserAchievementDto {
  @IsNotEmpty()
  @IsNumber()
  achievementId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
