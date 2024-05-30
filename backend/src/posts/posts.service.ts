import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {PostsRepository} from "./posts.repository"
@Injectable()
export class PostsService {

  constructor(private readonly postsService: PostsRepository) { }

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


  // //Service: Add products
  // async AddProductsServices (posts: CreatePostDto){
  //   const { title } = posts;
  //   const existProduct = await this.postsService.getProductsByName(title);
  //   if(existProduct) throw new Error("Product already exists");
    
  //   return await this.postsService.AddProductsRepository({...product});    
  // }






  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }


}
