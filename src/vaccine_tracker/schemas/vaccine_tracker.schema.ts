import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VaccineTrackerDocument = VaccineTracker & Document;

@Schema()
export class VaccineTracker {
  @Prop()
  YearWeekISO: string;

  @Prop()
  Vaccine: string;

  @Prop()
  TargetGroup: string;

  @Prop()
  ReportingCountry: string;

  // @Prop()
  // ReportingCountry: string;

  // Denominator
  // 7388778
  // NumberDosesReceived
  // 0
  // NumberDosesExported
  // 0
  // FirstDose
  // 0
  // FirstDoseRefused
  // ""
  // SecondDose
  // 0
  // DoseAdditional1
  // 0
  // DoseAdditional2
  // 0
  // UnknownDose
  // 8
  // Region
  // "AT"
  // TargetGroup
  // "ALL"
  // Vaccine
  // "UNK"
  // Population
  // 8901064
}

export const VaccineTrackerSchema =
  SchemaFactory.createForClass(VaccineTracker);
