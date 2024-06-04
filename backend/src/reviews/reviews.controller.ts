import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UnauthorizedException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(":id")
  create(
    @Body() createReviewDto: CreateReviewDto,
    @Headers('Authorization') headers: string,
    @Param('id') id: string
  ) {
    if (!headers) { 
      throw new UnauthorizedException('token invalido 1'); 
    }
    const token = headers.split(' ')[1]; 
    if (!token) { 
      throw new UnauthorizedException('token invalido 2'); 
    }
    return this.reviewsService.AddReviewsServices(createReviewDto, token,id);
  }

  // @Post()
  // async create(@Body() createreview: CreateReviewDto) {
  //   return await this.reviewsService.AddReviewsCreate(createreview);
  // }





  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
