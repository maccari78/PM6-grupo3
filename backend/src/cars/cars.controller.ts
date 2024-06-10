import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CarsService, FiltersCars } from './cars.service';
import { CreateCarDto } from './dto/create-cars.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CARS')
@Controller('cars')
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
