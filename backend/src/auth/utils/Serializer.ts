/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    console.log('Serialize user');
    done(null, user);
  }
  async deserializeUser(payload: any, done: Function) {
    console.log('Deserialize user');
    console.log(payload);
    const user = await this.authService.findUser(payload.id);
    console.log('Deserialize user');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
