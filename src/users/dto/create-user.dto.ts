import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { regexHelper } from 'src/regex.helper';

export class CreateUserDto {
  @IsString({ message: `Digite um nome válido` })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  /* @Matches(regexHelper.password, {
    message: `Sua senha deve conter letras maiusculas, minusculas, numeros e caracteres especiais`,
  })*/
  @MinLength(3, { message: `Sua senha precisa conter no minimo 8 caracteres` })
  password: string;
}
