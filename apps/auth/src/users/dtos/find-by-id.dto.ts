import { IsNotEmpty, IsString, Length } from 'class-validator';

export class FindByIdDto {
  @IsString()
  @IsNotEmpty()
  @Length(24, 24)
  id: string;
}