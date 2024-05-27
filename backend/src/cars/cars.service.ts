import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-cars.dto';
import { UpdateCarDto } from './dto/update-cars.dto';

@Injectable()
export class CarsService {
  create(createCarDto: CreateCarDto) {
    return 'This action adds a new car';
  }

  findAll() {
    return `This action returns all car`;
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
