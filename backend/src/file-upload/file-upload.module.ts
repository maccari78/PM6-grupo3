import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { CloudinaryConfig } from 'src/config/config.cloudinary';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryConfig],
})
export class FileUploadModule {}
