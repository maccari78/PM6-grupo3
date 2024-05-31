import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { PostsRepository } from './posts.repository';
import { Car } from 'src/cars/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts,Car])],
  controllers: [PostsController],
  providers: [PostsService,PostsRepository],
})
export class PostsModule {}
