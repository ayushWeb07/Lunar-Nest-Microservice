import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { ReservationDocument } from './schemas/reservation.schema';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll(): Promise<ReservationDocument[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReservationDocument> {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ReservationDocument> {
    return this.reservationsService.remove(id);
  }
}
