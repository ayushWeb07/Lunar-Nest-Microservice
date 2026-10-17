import { AbstractSchema } from '@app/shared';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class ReservationDocument extends AbstractSchema {
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date, required: true })
  endDate: Date;

  @Prop({ type: String, required: true })
  userId: string;

  @Prop({ type: String, required: true })
  placeId: string;

  @Prop({ type: String, required: true })
  invoiceId: string;
}

export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
