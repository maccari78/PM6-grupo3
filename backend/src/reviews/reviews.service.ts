import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Review } from './entities/review.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from 'src/rentals/interfaces/payload.interfaces';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewService: Repository<Review>,
    @InjectRepository(User) private userService: Repository<User>,
    @InjectRepository(Posts) private postsService: Repository<Posts>,
    private jwtService: JwtService,
  ) {}

  //Services | Add Reviews
  async AddReviewsServices(
    reviews: CreateReviewDto,
    currentUser: string,
    id: string,
  ) {
    const { rating, comment } = reviews;
    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret,
    });
    // busca el post por id y carga las relaciones necesarias
    const searchposts = await this.postsService.findOne({
      where: { id },
      relations: ['review'],
    });
    if (!searchposts)
      throw new UnauthorizedException('No se encontro publicación');

    if (!payload) throw new UnauthorizedException('token invalido 3');

    // Busca el usuario por email y carga las relaciones necesarias
    const searchuser = await this.userService.findOne({
      where: { email: payload.sub },
      relations: ['reviews'],
    });
    if (!searchuser) throw new UnauthorizedException('Usuario no encontrado');

    //crea una nueva reseña
    const newReview = this.reviewService.create({ rating, comment });
    newReview.post = searchposts;
    newReview.user = searchuser;
    const review = await this.reviewService.save(newReview);
    if (!review) throw new BadRequestException('No se pudo realizar la reseña');

    // searchuser.reviews = [review];
    // searchposts.review = [review];

    // Añade la nueva reseña a la lista de reseñas del usuario y del post
    searchuser.reviews.unshift(review);
    searchposts.review.unshift(review);

    //Guarda los cambios en las entidades usuario y post
    await this.postsService.save(searchposts);
    await this.userService.save(searchuser);
    // return 'Reseña realizada';

    // Devolver la entidad de reseña completa con las relaciones
    return await this.reviewService.findOne({
      where: { id: review.id },
      relations: ['user', 'post'],
    });
  }

  //Services | Get All
  async findAll() {
    const findReviews = await this.reviewService.find({
      relations: ['user', 'post'],
    });
    if (!findReviews) throw new NotFoundException('No se encontraron reseñas');
    return findReviews;
  }

  //Services | Get One
  async findOne(id: string) {
    const findReview = await this.reviewService.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
    if (!findReview) throw new NotFoundException('Reseña no encontrada');
    return findReview;
  }

  //Services | PUt one
  async updateReview(id: string, updateReview: UpdateReviewDto, token: string) {
    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(token, {
      secret,
    });
    if (!payload) throw new UnauthorizedException('token invalido 3');

    const user = await this.userService.findOne({
      where: { email: payload.sub },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const findReview = await this.reviewService.findOneBy({ id });
    if (!findReview) throw new NotFoundException('Reseña no encontrado');

    const update = await this.reviewService.update(id, updateReview);
    console.log(update);
    return 'Reseña actualizada';
  }

  //Services | Delete one
  async DeleteReviewsServices(id: string) {
    const ReviewFind = await this.reviewService.findOne({ where: { id } });
    if (!ReviewFind)
      throw new NotFoundException(`No se pudo obtener la reseña con ${id}`);

    const review = await this.reviewService.remove(ReviewFind);
    // if (review.affected === 0)
    //   throw new BadRequestException('No se pudo borrar la reseña');

    return review;
  }
}
