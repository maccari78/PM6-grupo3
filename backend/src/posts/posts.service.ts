import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
// import { FileUploadService } from 'src/file-upload/file-upload.service';
// import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly carService: CarsService,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(User) private userRepository: Repository<User>,
    // private jwtService: JwtService,
  ) {}

  async AddPostsServices(
    posts: CreatePostDto,
    // currentUser: string,
    files: Express.Multer.File[],
  ) {
    const { title, description, price, user_id, ...rest } = posts;

    // const secret = process.env.JWT_SECRET_KEY;
    // const secret = process.env.JWT_SECRET_KEY;
    // const payload = await this.jwtService.verify(currentUser, {
    //   secret,
    // });
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newCar = await this.carService.createdCar(files, rest, user.id);
    if (!newCar) throw new BadRequestException('No se pudo crear el auto');
    const newPosts = this.postRepository.create({ title, description, price });
    newPosts.car = newCar;
    newPosts.user = user;

    await this.postRepository.save(newPosts);
    return 'Publicación insertada';
  }
}
