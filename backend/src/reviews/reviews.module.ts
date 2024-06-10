import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/entities/post.entity';
import { Review } from './entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Review, User])],
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    JwtService,
  ],
})
export class ReviewsModule {}
