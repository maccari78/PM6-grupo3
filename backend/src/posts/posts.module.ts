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

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Car, User])],
  controllers: [PostsController],
  providers: [
    PostsService,
    CarsService,
    FileUploadService,
    CloudinaryConfig,
    JwtService,
  ],
})
export class PostsModule {}
