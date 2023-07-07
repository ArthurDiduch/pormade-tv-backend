import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: `Digite um nome válido` })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
