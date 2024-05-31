import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseUUIDPipe, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors, Headers } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

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
  @Post()
  @UseInterceptors(FilesInterceptor('file', 5))
  create(@Body() createPostDto: CreatePostDto, @UploadedFiles(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 5000000, // 5MB
          message: 'Uno de los archivos es demasiado grande',
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp|mp4|avi|mov)$/,
        }),
      ],
    }),
  )
  files: Express.Multer.File[],
  @Headers("Authorization") headers: string) {

    const token = headers.split(" ")[1];
    return this.postsService.AddPostsServices(createPostDto, token, files);

  }

  @Put(':id')
  putPostsByIdController(@Param("id", ParseUUIDPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePostsIdServices(id, updatePostDto);
  }

  @Delete(':id')
  deletePostsByIdController(@Param("id", ParseUUIDPipe) id: string) {
    return this.postsService.deletePostsIdServices(id);
  }
}
