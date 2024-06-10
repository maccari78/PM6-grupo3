import { Controller, Get, Body, Param, Delete, Put, ParseUUIDPipe, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Headers, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from './utils/roles.guard';
import { Role } from './utils/roles.enum';
import { Roles } from './utils/roles.decorator';

@ApiTags('USERS')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get('token')
  @Roles(Role.User, Role.Admin)
  getUserByToken(@Headers('Authorization') token: string) {
    return this.usersService.getUserByToken(token);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Put('update')
  @Roles(Role.User, Role.Admin)
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Headers('Authorization') token: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000000,
            message: 'El archivo es demasiado grande',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    console.log(updateUserDto);
    const { city, address, country, state, zip_code, ...rest2 } = updateUserDto;

    if (!file)
      return this.usersService.update(token, rest2, { city, address, country, state, zip_code });
    return this.usersService.update( token, rest2,
      { city, address, country, state, zip_code }, file,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
