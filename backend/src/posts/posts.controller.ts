import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseUUIDPipe,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  Headers,
  Query,
  UnauthorizedException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FiltersPosts } from './interfaces/filter.interfaces';
// import { TokenGuard } from './guards/token.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { RolesGuard } from 'src/users/utils/roles.guard';
import { Role } from 'src/users/utils/roles.enum';
import { Roles } from 'src/users/utils/roles.decorator';
import { RolesGuard } from 'src/users/utils/roles.guard';
// import { RolesGuard } from 'src/users/utils/roles.guard';

@ApiTags('POSTS')
@Controller('posts')
// @UseGuards(RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  //Con paginación
  // @Get()
  // getPostsAllController(

  //   @Query('page') page:number = 1,
  //   @Query('limit') limit:number = 5
  //   ) {
  //   return this.postsService.getPostsAllServices(page,limit);

  // }

  //sin paginacion
  @Get()
  getPostsAllController() {
    return this.postsService.getPostsAllServices();
  }

  @Get('filter')
  getPostsByFilter(@Query() filter: FiltersPosts) {
    console.log(filter);
    return this.postsService.getPostsByFilterServices(filter);
  }
  @Get('available')
  getPostsByDate(@Query('location') location: string) {
    return this.postsService.getPostsByDate(location);
  }

  @Get(':id')
  getPostsByIdController(@Param('id') id: string) {
    return this.postsService.getPostsServiceId(id);
  }

  // @ApiBearerAuth()
  @Post()
  // @UseGuards(TokenGuard)
  @UseInterceptors(FilesInterceptor('file', 5))

  //@UseGuards(RolesGuard)
  //@Roles(Role.User, Role.Admin)
  create(
    @Body() createPostDto: CreatePostDto,
    @Headers('Authorization') headers?: string,
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
    console.log(headers);

    if (!headers) {
      throw new UnauthorizedException('token invalido 1');
    }
    const token = headers.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token invalido 2');
    }
    console.log(files);

    if (files?.length !== 0 || files) {
      return this.postsService.AddPostsServices(createPostDto, token, files);
    }

    return this.postsService.AddPostsServices(createPostDto, token);
  }

  @Post('cancel/:id')
  async cancelReservation(@Param('id') id: string) {
    const cancelPost = await this.postsService.cancel(id);
    return cancelPost;
  }

  @ApiBearerAuth()
  @Put(':id')
  @UseInterceptors(FilesInterceptor('file', 5))
  // @UseGuards(RolesGuard)
  // @Roles(Role.User, Role.Admin)
  putPostsById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Headers('Authorization') headers: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5000000, // 5MBa
            message: 'Uno de los archivos es demasiado grande',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|mp4|avi|mov)$/,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    files?: Express.Multer.File[],
  ) {
    console.log(id);
    console.log(headers);

    if (!headers) {
      throw new UnauthorizedException('token invalido 1');
    }
    const token = headers.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token invalido 2');
    }
    console.log(token);

    if (files?.length !== 0 || files) {
      return this.postsService.UpdatePostsServices(
        id,
        updatePostDto,
        token,
        files,
      );
    }
    console.log(updatePostDto);
    return this.postsService.UpdatePostsServices(id, updatePostDto, token);
  }

  @Patch('soft-delete/:id')
  @Roles(Role.SuperAdmin)
  async softDelete(@Param('id') id: string): Promise<{ message: string }> {
    return this.postsService.softDelete(id);
  }
}
