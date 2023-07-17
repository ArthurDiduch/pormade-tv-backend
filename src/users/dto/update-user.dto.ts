import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: `Digite um nome válido` })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsOptional()
  imgProfile: string;

  @IsOptional()
  lastvideo: number;
}
