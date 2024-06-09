import { Controller, Get, Post, Body, Param, Delete, Headers, UnauthorizedException, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/users/utils/roles.guard';
import { Roles } from 'src/users/utils/roles.decorator';
import { Role } from 'src/users/utils/roles.enum';

@ApiTags('REVIEWS')
@Controller('reviews')

export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  //Controllers | Add reviews
  @ApiBearerAuth()
  @Post(":id")
  @UseGuards(RolesGuard)
  @Roles(Role.User, Role.Admin)
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
    return this.reviewsService.AddReviewsServices(createReviewDto, token, id);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }
  
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Put(':id')
  
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Headers('Authorization') headers: string
  ) {
    if (!headers) {
      throw new UnauthorizedException('token invalido 1');
    }
    const token = headers.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('token invalido 2');
    }

    return this.reviewsService.updateReview(id, updateReviewDto, token);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Delete(':id')
  removeIdController(@Param('id', ParseUUIDPipe) id: string) {
    return this.reviewsService.DeleteReviewsServices(id);
  }

}
