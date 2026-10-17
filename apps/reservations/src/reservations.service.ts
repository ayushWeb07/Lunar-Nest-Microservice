import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dtos/create-reservation.dto';
import { UpdateReservationDto } from './dtos/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.create({
      ...createReservationDto,
      userId: '1212',
    });
  }

  findAll(): Promise<ReservationDocument[]> {
    return this.reservationsRepository.find({});
  }

  findOne(id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOne({ _id: id });
  }

  update(
    id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndUpdate(
      { _id: id },
      updateReservationDto,
    );
  }

  remove(id: string): Promise<ReservationDocument> {
    return this.reservationsRepository.findOneAndDelete({ _id: id });
  }
}
