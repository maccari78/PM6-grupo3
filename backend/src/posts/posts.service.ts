import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Car } from 'src/cars/entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from 'src/rentals/interfaces/payload.interfaces';
import { JwtService } from '@nestjs/jwt';
import { FiltersPosts } from './interfaces/filter.interfaces';

@Injectable()
export class PostsService {
  constructor(
    private readonly carService: CarsService,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async getPostsByFilterServices(filters: FiltersPosts) {
    if (filters.year && typeof filters.year !== 'number') {
      filters.year = Number(filters.year);
    }
    if (filters.price && typeof filters.price !== 'number') {
      filters.price = Number(filters.price);
    }
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.car', 'car');

    if (filters.brand) {
      query.andWhere('car.brand = :brand', { brand: filters.brand });
    }
    if (filters.model) {
      query.andWhere('car.model = :model', { model: filters.model });
    }
    if (filters.year) {
      query.andWhere('car.year = :year', { year: filters.year });
    }
    if (filters.mileage) {
      query.andWhere('car.mileage = :mileage', { mileage: filters.mileage });
    }
    if (filters.color) {
      query.andWhere('car.color = :color', { color: filters.color });
    }
    if (filters.price) {
      query.andWhere('car.price = :price', { price: filters.price });
    }

    const posts = await query.getMany();

    if (posts.length === 0) {
      throw new NotFoundException('No se encontraron resultados');
    } else {
      return posts;
    }
  }

  async getPostsAllServices() {
    const posts = await this.postRepository.find({
      relations: ['user', 'car'],
    });
    if (!posts) throw new NotFoundException('No se encontraron publicaciones');
    return posts;
  }

  async getPostsServiceId(id: string) {
    const postsId = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'car'],
    });
    if (!postsId) {
      return `publicación con ${id} no encontrado`;
    }

    return postsId;
  }

  async AddPostsServices(
    posts: CreatePostDto,
    currentUser: string,
    files?: Express.Multer.File[],
  ) {
    const { title, description, price, ...rest } = posts;

    const secret = process.env.JWT_SECRET;

    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret,
    });
    console.log(payload);

    if (!payload) throw new UnauthorizedException('token invalido 3');
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
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

  async UpdatePostsServices(
    id: string,
    posts: UpdatePostDto,
    token: string,
    files?: Express.Multer.File[],
  ) {
    const secret = process.env.JWT_SECRET_KEY;
    const payload: JwtPayload = await this.jwtService.verify(token, {
      secret,
    });
    if (!payload) throw new UnauthorizedException('token invalido 3');
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const findPosts = await this.postRepository.findOneBy({ id });

    if (!findPosts)
      throw new NotFoundException(`No se encontro publicación con ${id}`);

    const updatePosts = await this.postRepository.update(id, posts);
    console.log(updatePosts, files);
  }

  async DeletePostsServices(id: string) {
    const postsFind = await this.postRepository.findOne({ where: { id } });
    if (!postsFind)
      throw new NotFoundException(
        `No se pudo obtener la publicación con ${id}`,
      );

    const posts = await this.postRepository.delete(postsFind);
    if (posts.affected === 0)
      throw new BadRequestException('No se pudo borrar la publicación');

    return 'Publicación eliminada';
  }
}
