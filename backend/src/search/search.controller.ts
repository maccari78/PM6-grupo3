import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  BadRequestException,
  ParseUUIDPipe,
  Put,
  Res /* UseGuards */,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { searchService } from './search.service';


@Controller('searching')
export class searchController {
   constructor(private readonly searchServices: searchService) {}

  @Get()
  async searching(@Query("q") query: string) {
    // return this.searchServices.search(query);
    try {
      const results = await this.searchServices.search(query);
      return results; // Asegúrate de que results tenga las propiedades posts y cars
    } catch (error) {
      console.error('Error during search:', error.message);
      throw new Error(error.message || 'Error en la búsqueda');
    }




  }

}
