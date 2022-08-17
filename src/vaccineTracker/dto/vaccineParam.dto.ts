import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { CountryCodeEnum } from '../enums/countryCode.enum';
import { SortEnum } from '../enums/sort.enum';
import { CustomDateValidator } from '../validators/customDate.validator';

export class VaccineParamDto {
  @IsString()
  @IsEnum(CountryCodeEnum)
  public c!: string;
  @IsString()
  @Validate(CustomDateValidator)
  public dateFrom!: string;
  @IsString()
  @Validate(CustomDateValidator)
  public dateTo!: string;
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  public rangeSize!: number;
  @IsString()
  @IsEnum(SortEnum)
  @IsOptional()
  public sort?: string;
}
