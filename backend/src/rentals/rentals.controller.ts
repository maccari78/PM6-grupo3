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
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  create(
    @Body() createRentalDto: CreateRentalDto,
    // @Headers('Authorization') authorization: string,
  ) {
    // const currentUser = authorization?.split(' ')[1];
    // if (!currentUser)
    //   throw new BadRequestException('No hay un usuario autenticado');
    return this.rentalsService.create(createRentalDto /*currentUser*/);
  }

  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.rentalsService.findOne(id);
  }

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
