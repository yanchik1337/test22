import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name?: string;

  @IsNumber()
  rate?: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsNumber()
  deviceId?: number;
}
