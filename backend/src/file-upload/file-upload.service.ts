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

    if (user.public_id) {
      await this.deleteImage(user.public_id);
    }

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

    car.image_url = [];
    car.public_id = [];

    const urls = [];
    const publicIds = [];

    for (const file of files) {
      const uploadedImage = await this.uploadStream(file);
      urls.push(uploadedImage.secure_url);
      publicIds.push(uploadedImage.public_id);
    }

    // if (!Array.isArray(car.image_url)) {
    //   car.image_url = [];
    // }
    // if (!Array.isArray(car.public_id)) {
    //   car.public_id = [];
    // }

    car.image_url.push(...urls);
    car.public_id.push(...publicIds);
    await this.carsRepository.save(car);

    const updatedCar = await this.carsRepository.findOneBy({ id: vehicleId });

    return updatedCar;
  }

  async deleteImage(publicId: string) {
    const user = await this.usersRepository.findOneBy({ public_id: publicId });

    await this.usersRepository.update(user.id, {
      image_url:
        'https://res.cloudinary.com/dkent00db/image/upload/v1717555619/image%20profile%20picture%20placeholder/vqnmnefzjwscrtkfpxtw.webp',
      public_id: null,
    });

    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  async deleteVehicleImage(publicId: string) {
    const car = await this.carsRepository
      .createQueryBuilder('car')
      .where(':publicId = ANY(car.public_id)', { publicId })
      .getOne();

    if (!car) throw new NotFoundException('Vehiculo no encontrado');

    car.image_url = car.image_url.filter((url) => !url.includes(publicId));
    car.public_id = car.public_id.filter((id) => id !== publicId);

    await this.carsRepository.save(car);

    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  async updateProfilePicture(userid: string, file: Express.Multer.File) {
    const user = await this.usersRepository.findOneBy({ id: userid });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (user.public_id) {
      await this.deleteImage(user.public_id);
    }

    const uploadImage = await this.uploadProfilePicture(file, userid);

    return uploadImage;
  }
}
