import { IsNotEmpty, IsNumber } from 'class-validator';

export class removeFavoriteDTO {
  @IsNumber()
  @IsNotEmpty()
  idUser: number;

  @IsNumber()
  @IsNotEmpty()
  idVideo: number;
}
