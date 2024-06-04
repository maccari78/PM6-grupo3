import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RentalsModule } from './rentals/rentals.module';
import { AddressesModule } from './addresses/addresses.module';
import { CarsModule } from './cars/cars.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModuleRoot } from './config/config.module';
import { ConfigTypOrmModule } from './config/configTypOrm.module';
import { PostsModule } from './posts/posts.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MailModule } from './mail/mail.module';
import morgan from 'morgan';
import { AuthModule } from './auth/auth.module';
import { JwtConfigModule } from './config/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModuleRoot,
    ConfigTypOrmModule,
    PostsModule,
    NotificationsModule,
    UsersModule,
    RentalsModule,
    AddressesModule,
    CarsModule,
    ReviewsModule,
    FileUploadModule,
    MailModule,
    AuthModule,
    JwtConfigModule,
    PassportModule.register({ session: true }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
  }
}
