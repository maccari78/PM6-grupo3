import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  BadRequestException,
  ParseUUIDPipe,
  Put,
  Res /* UseGuards */,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Response } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/users/utils/roles.decorator';
import { Role } from 'src/users/utils/roles.enum';
import { RolesGuard } from 'src/users/utils/roles.guard';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post(':id')
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard)
  async create(
    @Body() createRentalDto: CreateRentalDto,
    @Param('id', ParseUUIDPipe) postId: string,
    @Headers('Authorization') authorization: string,
    @Res() res: Response,
  ) {
    const currentUser = authorization?.split(' ')[1];
    console.log(createRentalDto);

    if (!currentUser)
      throw new UnauthorizedException('No hay un usuario autenticado');
    const url = await this.rentalsService.create(
      createRentalDto,
      currentUser,
      postId,
    );
    if (!url) throw new BadRequestException('Error al crear el contrato');
    return res.json({ url });
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard)
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get('token')
  @Roles(Role.User, Role.Admin, Role.SuperAdmin)
  @UseGuards(RolesGuard)
  getChat(@Headers('Authorization') authorization: string) {
    const currentUser = authorization?.split(' ')[1];
    if (!currentUser)
      throw new UnauthorizedException('No hay un usuario autenticado');
    return this.rentalsService.getChat(currentUser);
  }

  // @Get('relations')
  // putRelation() {
  //   return this.rentalsService.putRelation();
  // }
  @Get('/sucess/:id')
  paymentSucess(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const payment = this.rentalsService.paymentSucess(id);
    const SUCCES_CHECK_URL = process.env.SUCCES_CHECK_URL;
    if (payment) res.redirect(`${SUCCES_CHECK_URL}`);
  }

  @Get('/cancel/:id')
  paymentCancel(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const payment = this.rentalsService.paymentCancel(id);
    const CANCEL_CHECK_URL = process.env.CANCEL_CHECK_URL;
    if (payment) res.redirect(`${CANCEL_CHECK_URL}`);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentalsService.findOne(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateRentalDto: UpdateRentalDto,
  ) {
    return this.rentalsService.update(id, updateRentalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentalsService.remove(id);
  }
}
