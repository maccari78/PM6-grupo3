import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Headers,
  UploadedFile,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from './utils/roles.guard';
import { Role } from './utils/roles.enum';
import { Roles } from './utils/roles.decorator';
import { CustomHeaderGuard } from 'src/middleweare/protectedEndpoints.guard';

@ApiTags('USERS')
@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard, CustomHeaderGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get('token')
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard, CustomHeaderGuard)
  getUserForRent(@Headers('Authorization') token: string) {
    return this.usersService.getUserByRent(token);
  }

  @ApiBearerAuth()
  @Get('dashboard')
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard, CustomHeaderGuard)
  getUserForDashboard(@Headers('Authorization') token: string) {
    return this.usersService.getUserForDashboard(token);
  }

  @ApiBearerAuth()
  @Get('admin-dashboard')
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard)
  async getAdminDashboard(@Headers('Authorization') token: string) {
    return this.usersService.getUserForDashboard(token);
  }

  @Get(':id')
  // @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @UseGuards(CustomHeaderGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @Put('update')
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard, CustomHeaderGuard)
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
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    const { city, address, country, state, zip_code, ...rest2 } = updateUserDto;

    if (!file)
      return this.usersService.update(token, rest2, {
        city,
        address,
        country,
        state,
        zip_code,
      });
    return this.usersService.update(
      token,
      rest2,
      { city, address, country, state, zip_code },
      file,
    );
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard, CustomHeaderGuard)
  putByID(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
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
    const { city, address, country, state, zip_code, ...rest2 } = updateUserDto;

    if (!file)
      return this.usersService.putByID(id, rest2, {
        city,
        address,
        country,
        state,
        zip_code,
      });
    return this.usersService.putByID(
      id,
      rest2,
      { city, address, country, state, zip_code },
      file,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Patch('soft-delete/:id')
  @Roles(Role.SuperAdmin)
  @UseGuards(RolesGuard, CustomHeaderGuard)
  async softDelete(@Param('id') id: string): Promise<{ message: string }> {
    return this.usersService.softDelete(id);
  }
}
