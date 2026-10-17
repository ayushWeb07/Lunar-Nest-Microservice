import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReservationDto {
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
