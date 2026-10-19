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
import { CurrentUser, type IUserDto, JwtAuthGuard } from '@app/shared';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() userDto: IUserDto,
  ): Promise<ReservationDocument> {
    return await this.reservationsService.create(createReservationDto, userDto);
  }

  @Get()
  async findAll(): Promise<ReservationDocument[]> {
    return await this.reservationsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param() findOneReservationDto: FindOneReservationDto,
  ): Promise<ReservationDocument> {
    return await this.reservationsService.findOne(findOneReservationDto.id);
  }

  @Patch(':id')
  async update(
    @Param() findOneReservationDto: FindOneReservationDto,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return await this.reservationsService.update(
      findOneReservationDto.id,
      updateReservationDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param() findOneReservationDto: FindOneReservationDto,
  ): Promise<ReservationDocument> {
    return await this.reservationsService.remove(findOneReservationDto.id);
  }
}
