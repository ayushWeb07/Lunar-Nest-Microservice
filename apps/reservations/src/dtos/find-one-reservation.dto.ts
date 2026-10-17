import { IsNotEmpty, IsString, Length } from 'class-validator';

export class FindOneReservationDto {
  @IsNotEmpty()
  @IsString()
  @Length(24, 24)
  id: string;
}
