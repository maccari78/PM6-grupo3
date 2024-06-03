import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
      token: accessToken,
      image_url: profile.photos[0].value,
    });
    const token = await this.authService.generateJwtToken({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    return token || null;
  }
}
