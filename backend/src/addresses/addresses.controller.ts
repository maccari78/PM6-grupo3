import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ADDRESSES')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  getAddresses(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.addressesService.getAddresses(page, limit);
  }

  @Get(':id')
  getAddressById(@Param('id') id: string) {
    return this.addressesService.getAddressById(id);
  }

  @Put(':id')
  updateAddress(
    @Param('id') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressesService.updateAddress(addressId, updateAddressDto);
  }

  @Delete(':id')
  deleteAddress(@Param('id') id: string) {
    return this.addressesService.deleteAddress(id);
  }

  @Post(':id')
  async addressWithGeolocation(
    @Param('id') userId: string,
    @Body()
    createAddressDto: CreateAddressDto,
  ) {
    return this.addressesService.addressWithGeolocation(
      userId,
      createAddressDto,
    );
  }
}
