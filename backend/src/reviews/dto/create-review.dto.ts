import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  comment: string;
}
