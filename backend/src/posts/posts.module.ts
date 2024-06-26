import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';

import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { CarsService } from 'src/cars/cars.service';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { CloudinaryConfig } from 'src/config/config.cloudinary';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { Review } from 'src/reviews/entities/review.entity';
import { Rental } from 'src/rentals/entities/rental.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MailService } from 'src/mail/mail.service';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Posts,
      Car,
      User,
      Review,
      Rental,
      Notification,
      Address,
    ]),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    CarsService,
    FileUploadService,
    CloudinaryConfig,
    JwtService,
    NotificationsService,
    MailService,
  ],
})
export class PostsModule {}
