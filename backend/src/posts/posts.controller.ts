import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //Controllers | Seeder
  @Get('seeder')
  SeederController() {
    return this.postsService.SeederPostsServices();
  }

  //Controllers | Get All posts
  @Get()
  getPostsAllController() {
    return this.postsService.getPostsAllServices();
  }

  //Controllers | Get posts by Id
  @Get(':id')
  getPostsByIdController(@Param('id') id: string) {
    return this.postsService.getPostsServiceId(id);
  }

  //Controllers | Create new posts
  @Post()
  @UseInterceptors(FilesInterceptor('file', 5))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles(
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
    @Headers('Authorization') headers: string,
  ) {
    const token = headers.split(' ')[1];
    return this.postsService.AddPostsServices(createPostDto, token, files);
  }

  //Controllers | Update posts by Id
  @Put(':id')
  putPostsByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.UpdatePostsServices(id, updatePostDto);
  }

  @Delete(':id')
  deletePostsByIdController(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.DeletePostsServices(id);
  }
}
