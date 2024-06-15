import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from './users.service';
import { Address } from 'src/addresses/entities/address.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsers = [
    {
      id: '1',
      name: 'User 1',
      email: 'test1@hotmail.com',
    },
    {
      id: '2',
      name: 'User 2',
      email: 'test2@hotmail.com',
    },
    {
      id: '3',
      name: 'User 3',
      email: 'test3@hotmail.com',
    },
  ];

  const mockNewUser = {
    name: 'User 4',
    email: 'test4@hotmail.com',
  };

  const mockAddressRepository = {};
  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn().mockResolvedValue(undefined),
    findOneBy: jest.fn().mockResolvedValue(undefined),
    save: jest.fn().mockResolvedValue(undefined),
    update: jest.fn().mockImplementation(async (id, user) => {
      mockUsers[id - 1] = user;
    }),

    delete: jest.fn().mockImplementation(async (id) => {
      mockUsers.splice(id - 1, 1);
      return 1;
    }),
  };

  const fileUploadService = {};
  const addressesService = {};
  const jwtService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
        {
          provide: FileUploadService,
          useValue: fileUploadService,
        },
        {
          provide: AddressesService,
          useValue: addressesService,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('Should create an instance of usersService', () => {
    expect(usersService).toBeDefined();
  });

  it('findAll() returns all users', async () => {
    const users = await usersService.findAll();

    expect(users).toBeDefined();
    expect(users.length).toEqual(mockUsers.length);
    expect(users).toEqual(mockUsers);
  });

  it('getUserByEmail() must return error if no user was found', async () => {
    try {
      await usersService.findByEmail('test1@hotmail.com');
    } catch (error) {
      expect(error.message).toEqual('Usuario no encontrado');
    }
  });

  it('getUserByEmail() must return user if found', async () => {
    mockUsersRepository.findOne = jest.fn().mockResolvedValue(mockUsers[0]);

    const user = await usersService.findByEmail('test1@hotmail.com');

    expect(user).toBeDefined();
    expect(user).toEqual(mockUsers[0]);
  });

  it('update() must return error if no user was found', async () => {
    try {
      await usersService.update('1', mockNewUser[0]);
    } catch (error) {
      expect(error.message).toEqual('No hay un usuario autenticado');
    }
  });

  it('remove() must return error if no user was found', async () => {
    try {
      await usersService.remove('10');
    } catch (error) {
      expect(error.message).toEqual('Usuario no encontrado');
    }
  });

  it('delete() must return deleted user if found', async () => {
    mockUsersRepository.findOneBy = jest.fn().mockResolvedValue(mockUsers[0]);

    const user = await usersService.remove('1');

    expect(user).toBeDefined();
    expect(user).toEqual('Usuario eliminado con exito');
    expect(mockUsers.length).toEqual(2);
  });
});
