import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CarsService, FiltersCars } from './cars.service';
import { CreateCarDto } from './dto/create-cars.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/utils/roles.guard';
import { Role } from 'src/users/utils/roles.enum';
import { Roles } from 'src/users/utils/roles.decorator';

@ApiTags('CARS')
@Roles(Role.User, Role.Admin, Role.SuperAdmin)
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

  @Patch('soft-delete/:id')
  @Roles(Role.SuperAdmin)
  async softDelete(@Param('id') id: string): Promise<{ message: string }> {
    return this.carsService.softDelete(id);
  }

  @Patch('restore/:id')
  async restoreCar(@Param('id') id: string): Promise<void> {
    return this.carsService.restoreCar(id);
  }
}
