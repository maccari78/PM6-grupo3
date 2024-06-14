import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { Rental } from './entities/rental.entity';
import { User } from '../users/entities/user.entity';
import { Car } from '../cars/entities/car.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { UsersModule } from 'src/users/users.module';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Notification } from 'src/notifications/entities/notification.entity';
import { MailService } from 'src/mail/mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RentalPrev } from './entities/rentalPrev.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Rental,
      User,
      Car,
      Posts,
      Notification,
      RentalPrev,
    ]),
    ScheduleModule.forRoot(),
    UsersModule,
  ],
  providers: [RentalsService, NotificationsService, MailService],
  controllers: [RentalsController],
})
export class RentalsModule {}
