import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-cars.dto';
import { UpdateCarDto } from './dto/update-cars.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
export interface FiltersCars {
  brand: string;
  model: string;
  year: number;
  mileage: string;
  color: string;
  price: number;
}
@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carsRepository: Repository<Car>) {}
  public cars = [
    {
      brand: 'BMW',
      model: 'X5',
      year: 2022,
      mileage: '10.000 km',
      color: 'blue',

      availability: true,
      image_url: ['image.jpg'],
    },
    {
      brand: 'Audi',
      model: 'A4',
      year: 2023,
      mileage: '5,000 km',
      color: 'black',

      availability: true,
      image_url: ['audi.jpg'],
    },
    {
      brand: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2021,
      mileage: '20,000 km',
      color: 'white',

      availability: false,
      image_url: ['mercedes.jpg'],
    },
    {
      brand: 'Toyota',
      model: 'Corolla',
      year: 2020,
      mileage: '15,000 km',
      color: 'silver',

      availability: true,
      image_url: ['corolla.jpg'],
    },
    {
      brand: 'Honda',
      model: 'Civic',
      year: 2022,
      mileage: '8,000 km',
      color: 'red',

      availability: false,
      image_url: ['civic.jpg'],
    },
    {
      brand: 'Ford',
      model: 'Mustang',
      year: 2023,
      mileage: '3,000 km',
      color: 'yellow',

      availability: true,
      image_url: ['mustang.jpg'],
    },
    {
      brand: 'Chevrolet',
      model: 'Camaro',
      year: 2021,
      mileage: '12,000 km',
      color: 'orange',

      availability: true,
      image_url: ['camaro.jpg'],
    },
    {
      brand: 'Tesla',
      model: 'Model S',
      year: 2024,
      mileage: '2,000 km',
      color: 'gray',

      availability: true,
      image_url: ['tesla.jpg'],
    },
    {
      brand: 'Volkswagen',
      model: 'Golf',
      year: 2022,
      mileage: '7,000 km',
      color: 'blue',

      availability: false,
      image_url: ['golf.jpg'],
    },
    {
      brand: 'Subaru',
      model: 'Outback',
      year: 2023,
      mileage: '4,000 km',
      color: 'blue',

      availability: true,
      image_url: ['outback.jpg'],
    },
  ];
  async create(createCarDto: CreateCarDto) {
    const newCar = await this.carsRepository.save(createCarDto);
    if (!newCar) {
      throw new BadRequestException('El auto no fue creado');
    }
    return newCar;
  }

  async findAll() {
    const cars = await this.carsRepository.find();
    if (!cars) throw new NotFoundException('No se encontraron autos');
    return cars;
  }

  async findOne(id: string) {
    const findCar = await this.carsRepository.findOneBy({ id });
    console.log(findCar);

    if (!findCar) throw new NotFoundException('Auto no encontrado');
    return findCar;
  }

  async seeder() {
    return Promise.all(
      this.cars.map(async (car) => {
        const newCar = this.carsRepository.create(car);
        if (!newCar) {
          throw new BadRequestException('Los autos no fueron creados');
        }
        await this.carsRepository.save(newCar);
        return 'Autos creados exitosamente';
      }),
    );
  }
  async findByFilter(filters: Partial<FiltersCars>) {
    if (filters.year && typeof filters.year !== 'number') {
      filters.year = Number(filters.year);
    }
    if (filters.price && typeof filters.price !== 'number') {
      filters.price = Number(filters.price);
    }
    const query = this.carsRepository.createQueryBuilder('car');
    if (filters.brand) {
      query.andWhere('car.brand = :brand', { brand: filters.brand });
    }
    if (filters.model) {
      query.andWhere('car.model = :model', { model: filters.model });
    }
    if (filters.year) {
      query.andWhere('car.year = :year', { year: filters.year });
    }
    if (filters.mileage) {
      query.andWhere('car.mileage = :mileage', { mileage: filters.mileage });
    }
    if (filters.color) {
      query.andWhere('car.color = :color', { color: filters.color });
    }
    if (filters.price) {
      query.andWhere('car.price = :price', { price: filters.price });
    }
    const result = await query.getMany();
    if (result.length === 0) {
      throw new NotFoundException('No se encontraron resultados');
    } else {
      return result;
    }
  }
  async update(id: string, updateCarDto: UpdateCarDto) {
    const car = await this.carsRepository.findOneBy({ id });

    if (!car) throw new NotFoundException('Auto no encontrado');
    const updateCar = await this.carsRepository.update(id, updateCarDto);

    if (!updateCar) {
      throw new BadRequestException('El auto no fue actualizado');
    }
    return 'Auto actualizado exitosamente';
  }

  async remove(id: string) {
    const car = await this.carsRepository.findOneBy({ id });
    if (!car) throw new NotFoundException('Auto no encontrado');
    const deleteCar = await this.carsRepository.delete(id);
    if (!deleteCar) {
      throw new BadRequestException('El auto no fue eliminado');
    }
    return 'Auto eliminado exitosamente';
  }
}
