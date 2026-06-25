import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBrandDto {
  @IsString({ message: 'Имя бренда должно быть строкой' })
  @IsNotEmpty({ message: 'Имя бренда не может быть пустым' })
  name!: string;
}
