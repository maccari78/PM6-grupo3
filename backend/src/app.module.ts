import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RentalsModule } from './rentals/rentals.module';
import { AddressesModule } from './addresses/addresses.module';
import { CommentsModule } from './comments/comments.module';
import { CarsModule } from './cars/cars.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModuleRoot } from './config/config.module';
import { ConfigTypOrmModule } from './config/configTypOrm.module';
import { PostsModule } from './posts/posts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import morgan from 'morgan';

@Module({
  imports: [
    ConfigModuleRoot,
    ConfigTypOrmModule,
    PostsModule,
    NotificationsModule,
    UsersModule,
    RentalsModule,
    AddressesModule,
    CommentsModule,
    CarsModule,
    ReviewsModule,
    FileUploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
  }
}
