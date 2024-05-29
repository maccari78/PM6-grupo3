import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto) {

    @ApiProperty({ description: 'name', example: 'Panasonic' })
    @IsOptional()      
    @IsString()
    title: string;

    @ApiProperty({ description: 'description', example: 'Modelo XYZ' })
    @IsOptional()      
    @IsString()
    description: string;

    @ApiProperty({ description: 'price', example: '100.50' })
    @IsOptional()   
    @IsNumber()
    price: number;

    // user_id: number;
    // car_id: number;
    // create_at: Date;
    // updated_at: Date;
}


