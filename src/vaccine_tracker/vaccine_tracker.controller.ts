import { Controller, Get, Query } from '@nestjs/common';
import { VaccineTrackerService } from './vaccine_tracker.service';
import { VaccineParamDto } from './dto/vaccineParam.dto';
import {
  VaccineDoseCountResult,
  VaccineDoseResult,
} from './results/vaccineDoseCount.result';

@Controller('vaccine-summary')
export class VaccineTrackerController {
  constructor(private vaccineTrackerService: VaccineTrackerService) {}

  @Get()
  async findAll(@Query() query: VaccineParamDto): Promise<VaccineDoseResult> {
    const data = await this.vaccineTrackerService.findAll(query);
    return new VaccineDoseCountResult(data);
  }
}
