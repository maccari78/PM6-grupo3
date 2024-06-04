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
  Query,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FiltersPosts } from './interfaces/filter.interfaces';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPostsAllController() {
    return this.postsService.getPostsAllServices();
  }

  @Get('filter')
  getPostsByFilter(@Query() filter: FiltersPosts) {
    return this.postsService.getPostsByFilterServices(filter);
  }
  //Controllers | Seeder
  @Get('seeder')
  SeederController() {
    return this.postsService.SeederPostsServices();
  }

  //Controllers | Get All posts

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
    @Headers('Authorization') headers: string,
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
    files?: Express.Multer.File[],
  ) {
    if (!headers) {
      throw new UnauthorizedException('token invalido 1');
    }
    const token = headers.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token invalido 2');
    }
    if (files?.length !== 0 || files) {
      return this.postsService.AddPostsServices(createPostDto, token, files);
    }

    return this.postsService.AddPostsServices(createPostDto, token);
  }

  //Controllers | Update posts by Id
  @Put(':id')
  @UseInterceptors(FilesInterceptor('file', 5))
  putPostsByIdController(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Headers('Authorization') headers: string,
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
    files?: Express.Multer.File[],
  ) {
    if (!headers) {
      throw new UnauthorizedException('token invalido 1');
    }
    const token = headers.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token invalido 2');
    }
    if (files?.length !== 0 || files) {
      return this.postsService.UpdatePostsServices(
        id,
        updatePostDto,
        token,
        files,
      );
    }

    return this.postsService.UpdatePostsServices(id, updatePostDto, token);
  }

  @Delete(':id')
  deletePostsByIdController(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.DeletePostsServices(id);
  }
}
