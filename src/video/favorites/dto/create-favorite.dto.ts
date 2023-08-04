import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  video: number;
}
