import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/users.schema';
import { VaccineTrackerService } from './vaccine_tracker.service';
import { VaccineTracker } from './schemas/vaccine_tracker.schema';

@Controller('vaccine-tracker')
export class VaccineTrackerController {
  constructor(private vaccineTrackerService: VaccineTrackerService) {}

  @Get()
  async findAll() {
    return this.vaccineTrackerService.findAll();
  }
}
