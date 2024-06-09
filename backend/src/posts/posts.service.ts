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
    @InjectRepository(Car) private carRepository: Repository<Car>,
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
      where: { email: payload.sub },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newCar = await this.carService.createdCar(files, rest, user.id);
    if (!newCar) throw new BadRequestException('No se pudo crear el auto');
    const newPosts = this.postRepository.create({ title, description, price });

    newPosts.car = newCar;

    newPosts.user = user;

    const postsSaved = await this.postRepository.save(newPosts);
    if (!postsSaved)
      throw new BadRequestException('No se pudo insertar la publicación');
    await this.carRepository.update(newCar.id, { post: postsSaved });
    return 'Publicación insertada';
  }

  async UpdatePostsServices(
    id: string,
    posts: UpdatePostDto,
    token: string,
    files?: Express.Multer.File[],
  ) {
    const { title, description, price, image_url, ...rest } = posts;
    console.log(id, 'ID EN SERVICE');

    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = await this.jwtService.verify(token, {
      secret,
    });
    if (!payload) throw new UnauthorizedException('token invalido 3');
    const user = await this.userRepository.findOne({
      where: { email: payload.sub },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const findPosts = await this.postRepository.findOne({
      where: { id },
      relations: ['car', 'user'],
    });
    console.log(findPosts, 'FIND POSTS EN SERVICE');

    if (!findPosts)
      throw new NotFoundException(`No se encontro publicación con ${id}`);
    if (findPosts.user.id !== user.id)
      throw new UnauthorizedException(
        'No tiene permisos para actualizar esta publicación',
      );
    const car = await this.carRepository.findOneBy({
      id: findPosts.car.id,
    });
    if (!car) throw new NotFoundException('Auto no encontrado');
    if (files?.length === 0 || !files) {
      const updateCar = await this.carRepository.update(car.id, rest);
      if (!updateCar)
        throw new BadRequestException('No se pudo actualizar el auto');
      const updatePost = await this.postRepository.update(id, {
        title,
        description,
        price,
      });
      if (!updatePost)
        throw new BadRequestException('No se pudo actualizar la publicación');
      if (image_url) {
        await this.carService.removeImageUrl(car.id, image_url);
      }
      return 'Publicación actualizada';
    }

    const updateCar = await this.carService.update(car.id, rest, files);
    if (!updateCar)
      throw new BadRequestException('No se pudo actualizar el auto');
    await this.postRepository.update(id, {
      title,
      description,
      price,
    });
    if (image_url) {
      const updateImage = await this.carService.removeImageUrl(
        car.id,
        image_url,
      );
      if (!updateImage)
        throw new BadRequestException('No se pudo borrar la imagen');
      return 'Publicación actualizada';
    }
    return 'Publicación actualizada';
  }

  async DeletePostsServices(id: string) {
    const postsFind = await this.postRepository.findOne({ where: { id } });
    if (!postsFind)
      throw new NotFoundException(
        `No se pudo obtener la publicación con ${id}`,
      );

    const posts = await this.postRepository.delete(postsFind.id);
    if (posts.affected === 0)
      throw new BadRequestException('No se pudo borrar la publicación');

    return 'Publicación eliminada';
  }
}
