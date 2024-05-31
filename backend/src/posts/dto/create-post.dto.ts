import {  IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreatePostDto {
    //characteristics of the Posts
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    //characteristics of the car
    @IsNotEmpty()
    @IsString()
    @Length(2, 20)
    brand: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    model: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsNotEmpty()
    mileage: string;

    @IsString()
    color: string;

    @IsString()
    @IsOptional()
    @IsArray()
    image_url: string[];

}
