import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Car } from 'src/cars/entities/car.entity';
import { User } from 'src/users/entities/user.entity';
import { PassThrough } from 'stream';

describe('FileUploadService', () => {
  let fileUploadService: FileUploadService;

  const fileMock = {
    buffer: Buffer.from('dummyImageData'),
    originalname: 'test_image.jpg',
    mimetype: 'image/jpeg',
    fieldname: 'file',
    encoding: '7bit',
    size: 40,
    stream: new PassThrough(),
    destination: '',
    filename: 'test.jpg',
    path: '',
  };

  const mockCars = [
    {
      brand: 'Kia',
      model: 'Sorento',
      year: 2020,
      mileage: 'menos de 5000km',
      color: 'white',
      availability: true,
    },
  ];

  const mockUsers = [
    {
      id: 1,
      email: 'test@mail.com',
      password: 'Test',
      image_url: null,
      public_id: null,
    },
  ];

  const mockCarRepository = {
    find: jest.fn().mockResolvedValue(mockCars),
  };

  const mockUserRepository = {
    findOneBy: jest.fn().mockResolvedValue(mockUsers[0]),
    update: jest.fn().mockImplementation((id, updateData) => {
      mockUsers[0].image_url = 'http://test/img.com';
      mockUsers[0].public_id = '1234';
      return Promise.resolve({ ...mockUsers[0] });
    }),
  };

  const mockUploadStream = jest.fn().mockResolvedValue({
    secure_url: 'http://test/img.com',
    public_id: '1234',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileUploadService,
        {
          provide: getRepositoryToken(Car),
          useValue: mockCarRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    fileUploadService = module.get<FileUploadService>(FileUploadService);
  });

  it('should create an instance of fileUploadService', () => {
    expect(fileUploadService).toBeDefined();
  });

  it('uploadProfilePicture should return "usuario no encontrado" if user not found', async () => {
    mockUserRepository.findOneBy = jest.fn().mockResolvedValue(undefined);
    try {
      await fileUploadService.uploadProfilePicture(fileMock, '1');
    } catch (error) {
      expect(error.message).toEqual('Usuario no encontrado');
    }
  });

  it('uploadProfilePicture should return a user with image_url and public_id', async () => {
    mockUserRepository.findOneBy = jest.fn().mockResolvedValue(mockUsers[0]);

    jest
      .spyOn(fileUploadService, 'uploadStream')
      .mockImplementation(mockUploadStream);

    const user = await fileUploadService.uploadProfilePicture(fileMock, '1');

    expect(user.image_url).toEqual('http://test/img.com');
    expect(user.public_id).toEqual('1234');
  });
});
