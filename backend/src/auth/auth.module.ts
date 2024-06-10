import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Address } from 'src/addresses/entities/address.entity';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';
import { Notification } from 'src/notifications/entities/notification.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { MailService } from 'src/mail/mail.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { Car } from 'src/cars/entities/car.entity';
import { geolocationService } from 'src/addresses/geolocation.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Notification, Car])],
  providers: [
    AuthService,
    NotificationsService,
    MailService,
    GoogleStrategy,
    SessionSerializer,
    AddressesService,
    geolocationService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
