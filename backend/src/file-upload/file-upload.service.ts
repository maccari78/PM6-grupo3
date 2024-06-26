import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  DetectLabelsCommand,
  DetectModerationLabelsCommand,
} from '@aws-sdk/client-rekognition';
import { rekognition } from '../config/config.awsRekognitionClient';

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(Car) private readonly carsRepository: Repository<Car>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async uploadStream(
    file: Express.Multer.File,
    userId?: string,
    carId?: string,
  ): Promise<UploadApiResponse> {
    // if (userId && carId) {
    //   const verify = await this.analyzeImage(file.buffer);
    //   if (!verify) {
    //     await this.bannedUsers(userId, carId);
    //     throw new NotAcceptableException(
    //       'La imagen no cumple con nuestro estandares, nuestro validador no acepta la imagen, tus puntos estan bajando, cuando tus puntos sean insuficientes, tu cuenta sera baneada',
    //     );
    //   }
    // }
    // const containsExplicitContent = await this.moderationFile(file.buffer);
    // if (containsExplicitContent) {
    //   if (userId && carId) {
    //     await this.bannedUsers(carId, userId);
    //   }
    //   if (userId && !carId) {
    //     await this.bannedUsers(userId);
    //   }
    //   throw new NotAcceptableException(
    //     'La imagen no cumple con nuestros terminos de uso, nuestro validador no acepta la imagen, tus puntos estan bajando, cuando tus puntos sean insuficientes, tu cuenta sera baneada',
    //   );
    // }
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else {
            if (error) {
              reject(error);
            } else resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async uploadProfilePicture(file: Express.Multer.File, userId: string) {
    const user = await this.usersRepository.findOneBy({
      id: userId,
      isDeleted: false,
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    if (user.public_id) {
      await this.deleteImage(user.public_id);
    }

    const uploadedImage = await this.uploadStream(file, user.id);

    await this.usersRepository.update(user.id, {
      image_url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
    });

    const updatedUser = this.usersRepository.findOneBy({
      id: userId,
      isDeleted: false,
    });
    return updatedUser;
  }

  async uploadVehicleImages(vehicleId: string, files: Express.Multer.File[]) {
    const car = await this.carsRepository.findOne({
      where: { id: vehicleId },
      relations: { user: true },
    });

    if (!car) throw new NotFoundException('Vehiculo no encontrado');

    car.image_url = [];
    car.public_id = [];

    const urls = [];
    const publicIds = [];

    for (const file of files) {
      const uploadedImage = await this.uploadStream(file, car.user.id, car.id);
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
      image_url: process.env.IMAGE_URL,
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
  async analyzeImage(buffer: Buffer) {
    const params = {
      Image: {
        Bytes: buffer,
      },
      MaxLabels: 10,
      MinConfidence: 75,
    };

    const response = await rekognition.send(new DetectLabelsCommand(params));
    if (!response) return false;
    console.log('asda1', response);
    const { Labels } = response;

    const cars = Labels.some((label) => {
      if (
        label.Name.toLowerCase().includes('car') ||
        label.Name.toLowerCase().includes('vehicle')
      ) {
        return true;
      }
      return false;
    });
    return cars;
  }

  async moderationFile(buffer: Buffer) {
    const params = {
      Image: {
        Bytes: buffer,
      },
    };
    const response = await rekognition.send(
      new DetectModerationLabelsCommand(params),
    );
    console.log('response moderation', response);

    if (!response) return false;
    const { ModerationLabels } = response;
    console.log('moderationlabvels response', ModerationLabels);

    return ModerationLabels.some((label) => label.Confidence > 75);
  }
  async bannedUsers(userId: string, carId?: string) {
    if (carId) {
      await this.carsRepository.delete(carId);
    }
    const currentUser = await this.usersRepository.findOneBy({
      id: userId,
      isDeleted: false,
    });
    if (!currentUser) throw new NotFoundException('Usuario no encontrado');
    await this.usersRepository.update(userId, {
      points: currentUser.points - 1,
    });
    if (currentUser.points - 1 <= 0) {
      await this.usersRepository.update(userId, {
        isDeleted: true,
      });
    }
  }
}
