import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity'; // Asegúrate de importar la entidad Role

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]), // Importa el repositorio de la entidad Role
    // Otros módulos necesarios
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}

