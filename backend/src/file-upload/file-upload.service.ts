import { Injectable, NotFoundException } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

const carMock = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Tacoma',
    year: '2020',
    imgUrl: [],
    public_id: null,
  },
];

const userMock = [
  {
    id: '1',
    email: 'test@hotmail.com',
    password: 'test1234',
    imgUrl: 'http://test',
    public_id: null,
  },
];

@Injectable()
export class FileUploadService {
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
    const user = userMock.find((user) => user.id === userId);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const uploadedImage = await this.uploadStream(file);
    user.imgUrl = uploadedImage.secure_url;

    user.public_id = uploadedImage.public_id;

    return user;
  }

  async uploadVehicleImages(vehicleId: string, files: Express.Multer.File[]) {
    const car = carMock.find((car) => car.id === vehicleId);

    if (!car) throw new NotFoundException('Vehiculo no encontrado');

    const urls = [];

    for (const file of files) {
      const uploadedImage = await this.uploadStream(file);
      urls.push(uploadedImage.secure_url);
    }

    car.imgUrl = urls;

    return car;
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
