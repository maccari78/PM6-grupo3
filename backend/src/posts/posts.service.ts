import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {PostsRepository} from "./posts.repository"
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CarsService } from 'src/cars/cars.service';
// import { FileUploadService } from 'src/file-upload/file-upload.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {

  constructor(
    private readonly postsService: PostsRepository,
    @Inject()private carService: CarsService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Posts) private postsRepository: Repository<Posts>,
    private jwtService: JwtService,
  ) { }
  
  //Seeder Services
  async SeederService() {
    return this.postsService.SeederPostsRepository();
  }
  // Get All posts services
  async getPostsAllServices() {
    const posts = await this.postsService.getPostsAllRepository();
    return posts;
  }

  // Get by Id posts services
  async getPostsIdServices(id: string) {
    const posts = await this.postsService.getProductsRepositoryId(id);
    return posts;
  }


  //Service: Add Posts
  async AddPostsServices (posts: CreatePostDto,currentUser:string,files:Express.Multer.File[]){
    const { title,description,price, ...rest } = posts;

    // const secret = process.env.JWT_SECRET_KEY;
    const secret = process.env.JWT_SECRET_KEY;
    const payload = await this.jwtService.verify(currentUser, {
      secret,
    });
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const newCar= this.carService.createdCar(files,rest, user.id);
    if(!newCar) throw new BadRequestException('No se pudo crear el auto');
    const newPosts= this.postsRepository.create({title,description,price, car: newCar, user});
    
    await this.postsRepository.save(newPosts);
    return "Publicación insertada" ;    
  }



  // Service: Update posts by Id 
  async updatePostsIdServices(id: string, posts: Partial<Posts>){
    return await this.postsService.UpdatePostsRepository(id,posts)
  }

  // Service: Delete posts by Id
  async deletePostsIdServices(id: string) {
    return await this.postsService.DeletePostsRepository(id)
  }



}
