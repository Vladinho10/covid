import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccineTrackerModule } from './vaccine_tracker/vaccine_tracker.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/covid'),
    VaccineTrackerModule,
  ],
  controllers: [],
  providers: [
    // { provide: APP_FILTER, useClass: GlobalValidationExceptionFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        validationError: {
          value: true,
        },
      }),
    },
  ],
})
export class AppModule {}
