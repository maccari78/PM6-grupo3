import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Car } from 'src/cars/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car])],
  controllers: [UsersController],
  providers: [UsersService, FileUploadService],
})
export class UsersModule {}
