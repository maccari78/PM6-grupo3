import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Car } from 'src/cars/entities/car.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { AddressesService } from 'src/addresses/addresses.service';
import { geolocationService } from 'src/addresses/geolocation.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, Address])],
  controllers: [UsersController],
  providers: [
    UsersService,
    FileUploadService,
    AddressesService,
    geolocationService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
