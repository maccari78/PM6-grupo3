import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { Car } from '../cars/entities/car.entity';

@Injectable()
export class RentalCronService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  @Cron('0 0 * * *') // Esta tarea se ejecutará todos los días a medianoche
  async handleCron() {
    const rentals = await this.rentalRepository.find({
      where: {
        daysRemaining: MoreThan(0),
      },
      relations: ['posts', 'posts.car'],
    });

    for (const rental of rentals) {
      rental.daysRemaining -= 1;

      if (rental.daysRemaining <= 0) {
        rental.posts.car.availability = true;
        await this.carRepository.save(rental.posts.car);
      }

      await this.rentalRepository.save(rental);
    }
  }
}
