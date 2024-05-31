import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {PostsRepository} from "./posts.repository"
import { Posts } from './entities/post.entity';
// import { FileUploadService } from 'src/file-upload/file-upload.service';
@Injectable()
export class PostsService {

  constructor(
    private readonly postsService: PostsRepository,
    // private readonly fileUploadService: FileUploadService,
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


  //Service: Add products
  // async AddProductsServices (posts: CreatePostDto){
  //   const { title } = posts;
  //   const existProduct = await this.postsService.getProductsByName(title);
  //   if(existProduct) throw new Error("Product already exists");
    
  //   return await this.postsService.AddProductsRepository({...product});    
  // }



  // Service: Update posts by Id 
  async updatePostsIdServices(id: string, posts: Partial<Posts>){
    return await this.postsService.UpdatePostsRepository(id,posts)
  }

  // Service: Delete posts by Id
  async deletePostsIdServices(id: string) {
    return await this.postsService.DeletePostsRepository(id)
  }



}
