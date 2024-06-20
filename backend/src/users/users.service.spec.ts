import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from './users.service';
import { Address } from 'src/addresses/entities/address.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { AddressesService } from 'src/addresses/addresses.service';
import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUsers = [
    {
      id: '1',
      name: 'User 1',
      email: 'test1@hotmail.com',
      password: process.env.PASS_TESTING,
      addresses: [{ id: '1', address: 'Test #1' }],
    },
    {
      id: '2',
      name: 'User 2',
      email: 'test2@hotmail.com',
      password: process.env.PASS_TESTING,
      addresses: [{ id: '1', address: 'Test #2' }],
    },
    {
      id: '3',
      name: 'User 3',
      email: 'test3@hotmail.com',
      password: process.env.PASS_TESTING,
      addresses: [{ id: '1', address: 'Test #3' }],
    },
  ];

  const mockNewUser = {
    name: 'User 4',
    email: 'test4@hotmail.com',
    aboutMe: '',
    rExpiration: '',
  };

  const mockUpdateUserDto = {
    name: 'Updated name',
    email: 'updatedemail.mail.com',
    aboutMe: 'My new description',
    rExpiration: '12/30/30',
    addresses: [{ id: '1', address: 'Test #4' }],
  };

  const mockUpdateAddressDto = {
    address: 'Update Address Dto #1',
  };

  const mockAddressRepository = {};
  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      const user = mockUsers.find((user) => user.id === id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPass } = user;
      return userWithoutPass;
    }),
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
  const addressesService = {
    updateAddress: jest.fn().mockResolvedValue(undefined),
  };
  const jwtService = {
    verify: jest.fn().mockReturnValue({ sub: 'test1@hotmail.com' }),
  };

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

  it('findOne() must return user if found', async () => {
    const user = await usersService.findOne('2');

    expect(user).toBeDefined();
    expect(user.name).toEqual(mockUsers[1].name);
    expect(user.email).toEqual(mockUsers[1].email);
  });

  it('findOne() must return error if no user was found', async () => {
    mockUsersRepository.findOne = jest.fn().mockResolvedValue(undefined);

    try {
      await usersService.findOne('1');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual('Usuario no encontrado');
    }
  });

  it('findAll() returns all users', async () => {
    const users = await usersService.findAll();

    expect(users).toBeDefined();
    expect(users.length).toEqual(mockUsers.length);
    expect(users).toEqual(mockUsers);
  });

  it('getUserByEmail() must return error if no user was found', async () => {
    mockUsersRepository.findOne = jest.fn().mockResolvedValue(mockUsers[0]);
    try {
      await usersService.findByEmail('test1@hotmail.com');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
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
      await usersService.update('1', mockNewUser);
    } catch (error) {
      expect(error.message).toEqual('No hay un usuario autenticado');
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('update() must return updated user if found', async () => {
    mockUsersRepository.findOne = jest.fn().mockResolvedValue(mockUsers[0]);
    mockUsersRepository.update = jest.fn().mockResolvedValue({ affected: 1 });

    const result = await usersService.update(
      'Bearer validToken',
      mockUpdateUserDto,
      mockUpdateAddressDto,
    );

    expect(result).toEqual({ message: 'Usuario actualizado con exito' });
    expect(mockUsersRepository.update).toHaveBeenCalledWith(
      mockUsers[0].id,
      expect.objectContaining(mockUpdateUserDto),
    );
    expect(addressesService.updateAddress).toHaveBeenCalledWith(
      mockUsers[0].addresses[0].id,
      mockUpdateAddressDto,
    );
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
