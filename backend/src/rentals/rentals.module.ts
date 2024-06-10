import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { Rental } from './entities/rental.entity';
import { User } from '../users/entities/user.entity';
import { Car } from '../cars/entities/car.entity';
import { Posts } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, User, Car, Posts])],
  providers: [RentalsService],
  controllers: [RentalsController],
})
export class RentalsModule {}
