import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { VaccineTrackerModule } from './vaccine_tracker/vaccine_tracker.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/covid'),
    UsersModule,
    VaccineTrackerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
