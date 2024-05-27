import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RentalsModule } from './rentals/rentals.module';
import { AdressesModule } from './adresses/adresses.module';
import { CommentsModule } from './comments/comments.module';
import { CarsModule} from './cars/cars.module'

@Module({
  imports: [UsersModule, RentalsModule, AdressesModule, CommentsModule,CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
