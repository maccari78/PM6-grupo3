import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { NoProfanity } from '../decorators/wordValidator.decorator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsArray()
  @IsOptional()
  @NoProfanity()
  image_url?: string[];
}
