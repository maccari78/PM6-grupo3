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
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { User } from 'src/users/entities/user.entity';
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
  constructor(
    @InjectRepository(Car) private carsRepository: Repository<Car>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private fileUploadService: FileUploadService,
  ) {}

  async create(createCarDto: CreateCarDto) {
    const newCar = await this.carsRepository.save(createCarDto);
    if (!newCar) {
      throw new BadRequestException('El auto no fue creado');
    }
    return newCar;
  }

  async createdCar(
    files: Express.Multer.File[],
    car: Omit<CreateCarDto, 'image_url'>,
    id: string,
  ) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const newCar = await this.carsRepository.save({ user, ...car });
    if (!newCar) throw new BadRequestException('Error al crear el auto');
    const createdPicture = await this.fileUploadService.uploadVehicleImages(
      newCar.id,
      files,
    );
    if (createdPicture.image_url.length === 0)
      throw new BadRequestException('Error al subir la imagen');
    return createdPicture;
  }

  async findAll() {
    const cars = await this.carsRepository.find({ relations: ['post'] });
    if (!cars) throw new NotFoundException('No se encontraron autos');
    return cars;
  }

  async findOne(id: string) {
    const findCar = await this.carsRepository.findOneBy({ id });
    await this.carsRepository.update(findCar.id, { availability: true });

    if (!findCar) throw new NotFoundException('Auto no encontrado');
    return findCar;
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
  async update(
    id: string,
    updateCarDto: Omit<UpdateCarDto, 'image_url' | 'availability'>,
    files: Express.Multer.File[],
  ) {
    const car = await this.carsRepository.findOneBy({ id });
    if (!car) throw new NotFoundException('Auto no encontrado');
    const updateCar = await this.carsRepository.update(id, updateCarDto);
    if (updateCar.affected === 0) {
      throw new BadRequestException('El auto no fue actualizado');
    }
    const createdPicture = await this.fileUploadService.uploadVehicleImages(
      car.id,
      files,
    );
    if (createdPicture.image_url.length === 0)
      throw new BadRequestException('Error al subir la imagen');

    return 'Auto actualizado exitosamente';
  }

  async remove(id: string) {
    const car = await this.carsRepository.findOneBy({ id });
    if (!car) throw new NotFoundException('Auto no encontrado');
    const deleteCar = await this.carsRepository.delete(id);
    if (deleteCar.affected === 0) {
      throw new BadRequestException('El auto no fue eliminado');
    }
    return 'Auto eliminado exitosamente';
  }

  async removeImageUrl(id: string, image_url: string[]) {
    const car = await this.carsRepository.findOneBy({ id });
    if (!car) throw new NotFoundException('Auto no encontrado');
    console.log('ESTOS SON LAS IMAGENES ACTUALES', car.image_url);
    if (car.image_url.length === 0)
      throw new BadRequestException('No hay imagenes para eliminar');
    const updateImages = await car.image_url.filter(
      (url) => !image_url.includes(url),
    );
    console.log('IMAGENES LUEGO DE LA FUNCION', updateImages);
    if (updateImages.length === 0)
      throw new BadRequestException('STOP ANTES QUE ELIMINE TODAS LAS FOTOS');
    await this.carsRepository.update(id, { image_url: updateImages });
    return 'Imagenes eliminadas exitosamente';
  }
}
