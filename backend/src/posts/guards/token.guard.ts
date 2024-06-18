import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? '';
    try {
      const secret = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, {
        secret,
      });
      console.log(payload, 'PAYLOAD DEL GUARDIAN');
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido');
    }
  }
}
