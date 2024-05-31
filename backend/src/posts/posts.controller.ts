import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Seeder Controller
  @Get('seeder')
  SeederController() {
    return this.postsService.SeederService();
  }

  // Get All posts controller
  @Get()
  getPostsAllController() {
    return this.postsService.getPostsAllServices();
  }

  @Get(':id')
  getPostsByIdController(@Param('id') id: string) {
    return this.postsService.getPostsIdServices(id);
  }
  
  //Controller:Create  new posts
  // @Post()
  // create(@Body() createPostDto: CreatePostDto) {
  //   // return this.postsService.create(createPostDto);
  // }

  @Put(':id')
  putPostsByIdController(@Param("id", ParseUUIDPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePostsIdServices(id, updatePostDto);
  }

  @Delete(':id')
  deletePostsByIdController(@Param("id", ParseUUIDPipe) id: string) {
    return this.postsService.deletePostsIdServices(id);
  }
}
