import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Car } from '../cars/entities/car.entity';
import { Posts } from 'src/posts/entities/post.entity';
// import { UsersModule } from 'src/users/users.module';
// import { NotificationsService } from 'src/notifications/notifications.service';
// import { Notification } from 'src/notifications/entities/notification.entity';
// import { MailService } from 'src/mail/mail.service';
import { ScheduleModule } from '@nestjs/schedule';

import { searchService } from './search.service';
import { searchController } from './search.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([

      Car,
      Posts,
      // Notification,

    ]),
    ScheduleModule.forRoot(),
    // UsersModule,
  ],
  providers: [searchService, 
    // NotificationsService, 
    // MailService
  ],
  controllers: [searchController],
})
export class searchModule {}
