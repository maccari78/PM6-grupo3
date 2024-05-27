import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RentalsModule } from './rentals/rentals.module';

@Module({
  imports: [UsersModule, RentalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
