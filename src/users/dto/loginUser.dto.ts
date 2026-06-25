import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class LogUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Email не может быть пустым' })
  email!: string;

  @IsString()
  @Length(6, 20, { message: 'Пароль должен быть от 6 до 20 символов' })
  password!: string;
}
