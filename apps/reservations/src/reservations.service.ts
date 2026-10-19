import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './schemas/reservation.schema';
import type { IUserDto } from '@app/shared';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    userDto: IUserDto,
  ): Promise<ReservationDocument> {
    const newReservation: ReservationDocument =
      await this.reservationsRepository.create({
        ...createReservationDto,
        userId: userDto._id,
      });

    return newReservation;
  }

  async findAll(): Promise<ReservationDocument[]> {
    const existingReservations: ReservationDocument[] =
      await this.reservationsRepository.find({});

    return existingReservations;
  }

  async findOne(id: string): Promise<ReservationDocument> {
    const existingReservation: ReservationDocument =
      await this.reservationsRepository.findOne({ _id: id });

    return existingReservation;
  }

  async update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    const updatedReservation: ReservationDocument =
      await this.reservationsRepository.findOneAndUpdate(
        { _id: id },
        updateReservationDto,
      );

    return updatedReservation;
  }

  async remove(id: string): Promise<ReservationDocument> {
    const deletedReservation: ReservationDocument =
      await this.reservationsRepository.findOneAndDelete({ _id: id });

    return deletedReservation;
  }
}
