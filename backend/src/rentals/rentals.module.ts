import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';

@Module({
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
