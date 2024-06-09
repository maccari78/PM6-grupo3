import { Controller, Get, Post, Body, Param, Delete, Headers, BadRequestException, ParseUUIDPipe, Put, Res, UseGuards } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/utils/roles.guard';
import { Role } from 'src/users/utils/roles.enum';
import { Roles } from 'src/users/utils/roles.decorator';

// @ApiBearerAuth()
@ApiTags('RENTALS')
@Controller('rentals')
@UseGuards(RolesGuard)
@Roles(Role.User, Role.Admin)
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @ApiBearerAuth()
  @Post(':id')
  async create(
    @Body() createRentalDto: CreateRentalDto,
    @Param('id', ParseUUIDPipe) postId: string,
    @Headers('Authorization') authorization: string,
    @Res() res: Response,
  ) {
    const currentUser = authorization?.split(' ')[1];

    if (!currentUser)
      throw new BadRequestException('No hay un usuario autenticado');
    const url = await this.rentalsService.create(
      createRentalDto,
      currentUser,
      postId,
    );
    if (!url) throw new BadRequestException('Error al crear el contrato');
    return res.json({ url });
  }

  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }
  @Get('/sucess/:id')
  paymentSucess(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const payment = this.rentalsService.paymentSucess(id);
    if (payment) res.redirect(`http://localhost:3000/successcheckout/${id}`);
  }

  @Get('/cancel/:id')
  paymentCancel(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    const payment = this.rentalsService.paymentCancel(id);
    if (payment) res.redirect(`http://localhost:3000/`);
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
