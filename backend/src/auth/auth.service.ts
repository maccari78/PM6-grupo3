import { Injectable } from '@nestjs/common';
import * as passport from 'passport';
import { Strategy as Auth0Strategy } from 'passport-auth0';

@Injectable()
export class AuthService {
  constructor() {
    passport.use(
      new Auth0Strategy(
        {
          domain: process.env.AUTH0_ISSUER_BASE_URL,
          clientID: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          callbackURL: `${process.env.AUTH0_BASE_URL}/callback`,
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
          return done(null, profile);
        },
      ),
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });
  }
}
