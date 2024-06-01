import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async uploadStream(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadProfilePicture(file: Express.Multer.File, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const uploadedImage = await this.uploadStream(file);

    await this.usersRepository.update(user.id, {
      image_url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    });

    const updatedUser = this.usersRepository.findOneBy({ id: userId });
    return updatedUser;
  }

  async uploadVehicleImages(vehicleId: string, files: Express.Multer.File[]) {
    const car = await this.carsRepository.findOneBy({ id: vehicleId });

    if (!car) throw new NotFoundException('Vehiculo no encontrado');

    const urls = [];
    const publicIds = [];

    for (const file of files) {
      const uploadedImage = await this.uploadStream(file);
      urls.push(uploadedImage.secure_url);
      publicIds.push(uploadedImage.public_id);
    }

    await this.carsRepository.update(car.id, {
      image_url: urls,
      public_id: publicIds,
    });

    const updatedCar = await this.carsRepository.findOneBy({ id: vehicleId });

    return updatedCar;
  }

  deleteImage(publicId: string) {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }
}
