import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CountryCodeEnum } from '../enums/countryCode.enum';
import { SortEnum } from '../enums/sort.enum';

export type VaccineTrackerDocument = VaccineTracker & Document;

@Schema()
export class VaccineTracker {
  @Prop()
  YearWeekISO: string;

  @Prop()
  ReportingCountry: CountryCodeEnum;

  @Prop()
  Denominator: number;

  @Prop()
  NumberDosesReceived: SortEnum;

  @Prop()
  NumberDosesExported: SortEnum;

  @Prop()
  FirstDose: number;

  @Prop()
  FirstDoseRefused: string;

  @Prop()
  DoseAdditional1: number;

  @Prop()
  DoseAdditional2: number;

  @Prop()
  UnknownDose: number;

  @Prop()
  Region: CountryCodeEnum;

  @Prop()
  Population: number;

  @Prop()
  SecondDose: number;

  @Prop()
  Vaccine: string;

  @Prop()
  TargetGroup: string;
}

export const VaccineTrackerSchema =
  SchemaFactory.createForClass(VaccineTracker);
