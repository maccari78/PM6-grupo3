import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from 'src/rentals/interfaces/payload.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewService: Repository<Review>,
    @InjectRepository(User) private userService: Repository<User>,
    @InjectRepository(Posts) private postsService: Repository<Posts>,
    private jwtService: JwtService,
  ){}

  async AddReviewsCreate(createCarDto: CreateReviewDto) {
    
    const newReview = await this.reviewService.save(createCarDto);
    if (!newReview) {
      throw new BadRequestException('El review no fue creado');
    }
    return newReview;
  }


  async AddReviewsServices(
    reviews: CreateReviewDto,
    currentUser: string,
    id: string,
  ) {
     const {rating, comment}= reviews
    const secret = process.env.JWT_SECRET_KEY;
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret,
    });
  // `FIND WHERE ID = ${id}`; 
    const searchposts = await this.postsService.findOneBy({  id  })
    if(!searchposts) throw new UnauthorizedException('No se encontro publicación');

    if (!payload) throw new UnauthorizedException('token invalido 3');
    const searchuser = await this.userService.findOne({
      where: { id: payload.sub },
    });
    if(!searchuser) throw new UnauthorizedException('Usuario no encontrado');

    const newReview = this.reviewService.create({rating, comment});
    newReview.post = searchposts;
    newReview.user = searchuser;    
    await this.reviewService.save(newReview);
    return 'Reseña realizada';
  }



  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
