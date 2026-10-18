import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { ReservationDocument } from './schemas/reservation.schema';
import { FindOneReservationDto } from './dtos/find-one-reservation.dto';
import { JwtAuthGuard } from '@app/shared';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
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
  findOne(
    @Param() findOneReservationDto: FindOneReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.findOne(findOneReservationDto.id);
  }

  @Patch(':id')
  update(
    @Param() findOneReservationDto: FindOneReservationDto,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.update(
      findOneReservationDto.id,
      updateReservationDto,
    );
  }

  @Delete(':id')
  remove(
    @Param() findOneReservationDto: FindOneReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsService.remove(findOneReservationDto.id);
  }
}
