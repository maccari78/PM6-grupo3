import { Module } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { User } from 'src/users/entities/user.entity';
import { geolocationService } from './geolocation.service';
import { Car } from 'src/cars/entities/car.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User, Car]), UsersModule],
  controllers: [AddressesController],
  providers: [AddressesService, geolocationService],
})
export class AddressesModule {}
