import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  /* @Matches(regexHelper.password, {
    message: `Sua senha deve conter letras maiusculas, minusculas, numeros e caracteres especiais`,
  })*/
  password: string;
}
