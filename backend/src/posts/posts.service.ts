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
import { Review } from 'src/reviews/entities/review.entity';
import { Rental } from 'src/rentals/entities/rental.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly carService: CarsService,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
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
      console.log('Entra al if?', filters);

      query.andWhere('car.mileage = :mileage', { mileage: filters.mileage });
    }
    if (filters.color) {
      query.andWhere('car.color = :color', { color: filters.color });
    }
    if (filters.price) {
      query.andWhere('car.price = :price', { price: filters.price });
    }

    const posts = await query.getMany();
    console.log(posts);

    if (posts.length === 0) {
      throw new NotFoundException('No se encontraron resultados');
    } else {
      return posts;
    }
  }

  //Con paginacion
  // async getPostsAllServices(page: number, limit: number) {
  //   let posts = await this.postRepository.find({
  //     relations: {
  //       user: true,
  //       car: true,
  //       review: true},
  //   });
  //   if (!posts) throw new NotFoundException('No se encontraron publicaciones');

  //   const start = (page - 1) * limit;
  //   const end = page * limit;
  //   posts = posts.slice(start, end);

  //   return posts;
  // }

  //Sin paginacion
  async getPostsAllServices() {
    const posts = await this.postRepository.find({
      relations: {
        user: true,
        car: true,
        review: true,
      },
    });
    if (!posts) throw new NotFoundException('No se encontraron publicaciones');

    return posts;
  }

  async getPostsServiceId(id: string) {
    const postsId = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'car', 'review', 'user.addresses', 'rentals'],
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
    if (!postsSaved) {
      throw new BadRequestException('No se pudo insertar la publicación');
    }

    if (Array.isArray(postsSaved)) {
      throw new BadRequestException('postsSaved no es un array');
    }

    await this.postRepository.update(postsSaved.id, { car: newCar });

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

  async softDelete(id: string): Promise<{ message: string }> {
    const car = await this.carRepository.findOne({
      where: { id },
      relations: ['post'],
    });

    if (!car) {
      throw new NotFoundException(
        `El automóvil con ID ${id} no se ha encontrado`,
      );
    }

    car.isDeleted = true;
    await this.carRepository.save(car);

    const postsToUpdate = car.post.map((post) => ({
      id: post.id,
      isDeleted: true,
    }));
    await this.postRepository.save(postsToUpdate);

    return { message: 'El automóvil ha sido borrado lógicamente con éxito' };
  }

  async restoreCar(id: string): Promise<void> {
    const car = await this.carRepository.findOne({
      where: { id },
      withDeleted: true,
      relations: ['post'],
    });
    if (!car) {
      throw new NotFoundException(
        `El automóvil con ID ${id} no se ha encontrado`,
      );
    }

    car.isDeleted = false;
    await this.carRepository.save(car);

    const postsToUpdate = car.post.map((post) => ({
      id: post.id,
      isDeleted: false,
    }));
    await this.postRepository.save(postsToUpdate);
  }

  async getPostsByDate() {
    // const allPosts = await this.postRepository.find({
    //   relations: ['rental'],
    // });
    // return allPosts;

    const posts = await this.postRepository.find({
      relations: ['car'],
    });

    const availablePosts = posts.filter((post) => {
      return post.car.availability === true;
    });

    return availablePosts;
  }
  //Prueba xd
}
