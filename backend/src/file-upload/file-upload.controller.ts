import {
  Controller,
  Param,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseInterceptors,
  Post,
  Delete,
  UploadedFiles,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadProfilePicture/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePicture(
    @Param('id') userId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'La imagen es demasiado grande',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProfilePicture(file, userId);
  }

  @Post('uploadVehicleImages/:id')
  @UseInterceptors(FilesInterceptor('file', 5))
  async uploadVehicleImages(
    @Param('id') vehicleId: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5000000, // 5MB
            message: 'Uno de los archivos es demasiado grande',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|mp4|avi|mov)$/,
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.fileUploadService.uploadVehicleImages(vehicleId, files);
  }

  @Delete('deleteImage/:publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    return this.fileUploadService.deleteImage(publicId);
  }

  @Delete('deleteVehicleImage/:publicId')
  async deleteVehicleImage(@Param('PublicId') publicId: string) {
    return this.fileUploadService.deleteVehicleImage(publicId);
  }
}
