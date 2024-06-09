import { Controller, Get, Post, Body, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CarsService, FiltersCars } from './cars.service';
import { CreateCarDto } from './dto/create-cars.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/utils/roles.guard';
import { Role } from 'src/users/utils/roles.enum';
import { Roles } from 'src/users/utils/roles.decorator';

@ApiTags('CARS')
@Controller('cars')
@UseGuards(RolesGuard)
@Roles(Role.User, Role.Admin)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get('filter')
  findByFilter(@Query() filter: FiltersCars) {
    return this.carsService.findByFilter(filter);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.remove(id);
  }
}
