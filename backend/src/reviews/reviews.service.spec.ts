import { getRepositoryToken } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { User } from 'src/users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { Review } from './entities/review.entity';
import { JwtService } from '@nestjs/jwt';

describe('ReviewsService', () => {
  let reviewsService: ReviewsService;

  const mockReviews = [
    {
      id: '1',
      rating: 5,
      comment: 'El mejor vehículo',
    },
    {
      id: '1',
      rating: 3,
      comment: 'Más o menos',
    },
    {
      id: '1',
      rating: 2,
      comment: 'No cumplió con lo que quería',
    },
  ];

  const mockUsersRepository = {};
  const mockPostsRepository = {};
  const mockJwtService = {};
  const mockReviewsRepository = {
    find: jest.fn().mockResolvedValue(mockReviews),
    findOne: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewsRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Posts),
          useValue: mockPostsRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  it('Should create an instance of reviewsService', () => {
    expect(reviewsService).toBeDefined();
  });

  it('findAll() returns all reviews', async () => {
    const findReviews = await reviewsService.findAll();

    expect(findReviews).toBeDefined();
    expect(findReviews).toEqual(mockReviews);
  });

  it('findOne() must return review if found', async () => {
    mockReviewsRepository.findOne = jest.fn().mockResolvedValue(mockReviews[0]);
    const findReviews = await reviewsService.findOne('1');

    expect(findReviews).toBeDefined();
    expect(findReviews).toEqual(mockReviews[0]);
  });

  it('findOne() must return error if no review was found', async () => {
    try {
      await reviewsService.findOne('10');
    } catch (error) {
      expect(error.message).toEqual('Reseña no encontrada');
    }
  });

  it('deleteReviewsService() must delete a review', async () => {
    try {
      await reviewsService.findOne('10');
    } catch (error) {
      expect(error.message).toEqual('Reseña no encontrada');
    }
  });
});
