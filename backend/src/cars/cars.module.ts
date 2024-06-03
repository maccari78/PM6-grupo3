import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { User } from 'src/users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, User, Posts])],
  controllers: [CarsController],
  providers: [CarsService, FileUploadService],
})
export class CarsModule {}
