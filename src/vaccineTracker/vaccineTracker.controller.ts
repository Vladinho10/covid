import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { VaccineTrackerService } from './vaccineTracker.service';
import { VaccineParamDto } from './dto/vaccineParam.dto';
import {
  VaccineDoseCountResult,
  VaccineDoseResult,
} from './results/vaccineDoseCount.result';

@Controller('vaccine-summary')
export class VaccineTrackerController {
  constructor(private vaccineTrackerService: VaccineTrackerService) {}

  @Get()
  @HttpCode(200)
  async findAll(@Query() query: VaccineParamDto): Promise<VaccineDoseResult> {
    const data = await this.vaccineTrackerService.findAll(query);
    return new VaccineDoseCountResult(data);
  }
}
