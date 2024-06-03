import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
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

  public postsssToPreLoad = [
    {
      title: '2020 Toyota Highlander',
      description:
        'Spacious and reliable SUV with plenty of room for passengers and cargo. Well-maintained and in excellent condition.',
      price: 29995.0,
      // userId: 2,
      // carId: 12345, // Hypothetical car ID
      created_at: new Date('2024-05-30'),
      updated_at: new Date('2024-05-30'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762a"
    },
    {
      title: '2023 Ford F-150 XLT',
      description:
        'Powerful and capable pickup truck for work or play. Low mileage and loaded with features.',
      price: 42500.0,
      // userId: 1,
      // carId: 54321, // Hypothetical car ID
      created_at: new Date('2024-05-29'),
      updated_at: new Date('2024-05-29'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762c"
    },
    {
      title: '2018 Honda Accord EX-L',
      description:
        'Comfortable and fuel-efficient sedan with a sunroof and leather seats. One owner and meticulously maintained.',
      price: 19800.0,
      // userId: 3,
      // carId: 67890, // Hypothetical car ID
      created_at: new Date('2024-05-28'),
      updated_at: new Date('2024-05-28'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762d"
    },
    {
      title: '2022 Tesla Model 3 Long Range',
      description:
        'High-performance electric car with long range and advanced technology. Excellent condition and a joy to drive.',
      price: 56999.0,
      // userId: 4,
      // carId: 90123, // Hypothetical car ID
      created_at: new Date('2024-05-27'),
      updated_at: new Date('2024-05-27'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762z"
    },
    {
      title: '2019 Jeep Wrangler Rubicon',
      description:
        'Off-road capable SUV perfect for exploring the outdoors. Lifted suspension and upgraded tires.',
      price: 38500.0,
      // userId: 2,
      // carId: 34567, // Hypothetical car ID
      created_at: new Date('2024-05-26'),
      updated_at: new Date('2024-05-26'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762x"
    },
    {
      title: '2017 Toyota Camry Hybrid',
      description:
        'Fuel-efficient and reliable sedan with a spacious interior. Perfect for everyday commutes.',
      price: 16999.0,
      // userId: 1,
      // carId: 87654, // Hypothetical car ID
      created_at: new Date('2024-05-25'),
      updated_at: new Date('2024-05-25'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762n"
    },
    {
      title: '2022 BMW X3 M',
      description:
        'High-performance luxury SUV with a powerful engine and luxurious interior. A thrill to drive.',
      price: 68995.0,
      // userId: 3,
      // carId: 21098, // Hypothetical car ID
      created_at: new Date('2024-05-24'),
      updated_at: new Date('2024-05-24'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762m"
    },
    {
      title: '2021 Nissan Frontier',
      description:
        'Reliable and capable mid-size pickup truck for work or adventure. Great value for the price.',
      price: 27800.0,
      // userId: 4,
      // carId: 78901, // Hypothetical car ID
      created_at: new Date('2024-05-23'),
      updated_at: new Date('2024-05-23'),
      // user:"e679b4a9-22e9-49eb-945f-8b600694762p"
    },
  ];

  ////////////////////////////..........
  //Services | Seeder
  async SeederPostsServices() {
    return Promise.all(
      this.postsssToPreLoad.map(async (post) => {
        const newPost = this.postRepository.create(post);
        if (!newPost) {
          throw new BadRequestException('Error al insertar publicaciones');
        }
        await this.postRepository.save(newPost);
        return 'Publicaciones insertadas';
        // return await this.postsRepository.save(newPost);
      }),
    );
  }
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

  //Services | Get All Posts
  async getPostsAllServices() {
    const posts = await this.postRepository.find({
      relations: ['user', 'car'],
    });
    if (!posts) throw new NotFoundException('No se encontraron publicaciones');
    return posts;
  }

  //Services | Get posts by Id
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

  //Services | Add Posts
  async AddPostsServices(
    posts: CreatePostDto,
    currentUser: string,
    files?: Express.Multer.File[],
  ) {
    const { title, description, price, ...rest } = posts;

    const secret = process.env.JWT_SECRET_KEY;
    const payload: JwtPayload = await this.jwtService.verify(currentUser, {
      secret,
    });
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

  //Services | Update posts by Id
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

  //Services | Delete Posts by Id
  async DeletePostsServices(id: string) {
    const postsFind = await this.postRepository.findOne({ where: { id } });
    if (!postsFind)
      throw new NotFoundException(
        `No se pudo obtener la publicación con ${id}`,
      );

    try {
      await this.postRepository.remove(postsFind);
    } catch (error) {
      throw new ConflictException(
        'No se puede eliminar publicación porque UUID is invalido',
      );
    }

    // await this.productsRepositorynew.delete(productFind);
    return postsFind;
  }
}
