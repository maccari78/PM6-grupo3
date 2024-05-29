import { ApiProperty } from "@nestjs/swagger";
import {  IsNumber, IsString } from "class-validator";

export class CreatePostDto {


    @ApiProperty({ description: 'name', example: 'Panasonic' })   
    @IsString()
    title: string;

    @ApiProperty({ description: 'description', example: 'Modelo XYZ' })   
    @IsString()
    description: string;

    @ApiProperty({ description: 'price', example: '100.50' })   
    @IsNumber()
    price: number;

    // user_id: number;
    // car_id: number;
    // create_at: Date;
    // updated_at: Date;
}
