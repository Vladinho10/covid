import { Module } from '@nestjs/common';
import { VaccineTrackerController } from './vaccine_tracker.controller';
import { VaccineTrackerService } from './vaccine_tracker.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VaccineTracker,
  VaccineTrackerSchema,
} from './schemas/vaccine_tracker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VaccineTracker.name, schema: VaccineTrackerSchema },
    ]),
  ],
  controllers: [VaccineTrackerController],
  providers: [VaccineTrackerService],
})
export class VaccineTrackerModule {}
