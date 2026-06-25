import { IsString, IsNotEmpty } from 'class-validator';
export class CreateTypeDto {
  @IsString({ message: 'Имя типа должно быть строкой' })
  @IsNotEmpty({ message: 'Имя типа не может быть пустым' })
  name!: string;
}
