import { Module } from '@nestjs/common';
import { VaccineTrackerController } from './vaccineTracker.controller';
import { VaccineTrackerService } from './vaccineTracker.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VaccineTracker,
  VaccineTrackerSchema,
} from './schemas/vaccineTracker.schema';

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
