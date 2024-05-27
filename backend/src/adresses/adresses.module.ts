import { Module } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { AdressesController } from './adresses.controller';

@Module({
  controllers: [AdressesController],
  providers: [AdressesService],
})
export class AdressesModule {}
