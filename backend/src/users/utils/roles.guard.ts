import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/rentals/interfaces/payload.interfaces';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    if (!token) {
      throw new UnauthorizedException('No se encontro ningun token');
    }
    const secret = process.env.JWT_SECRET;
    const payload: JwtPayload = this.jwtService.verify(token, {
      secret,
    });

    if (!payload) {
      throw new UnauthorizedException(
        'No estas autorizado acceder a esta ruta',
      );
    }

    // Allow access if its admin
    if (payload.role?.includes(Role.Admin)) {
      return true;
    }

    const authorization = requiredRoles.some((role) =>
      payload.role?.includes(role),
    );

    if (!authorization) {
      throw new UnauthorizedException(
        'No estas autorizado acceder a esta ruta',
      );
    }

    return true;
  }
}
