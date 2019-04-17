import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { Env } from 'src/modules/util/env/variables';
import { AuthService } from '../auth.service';
import { ThirdPartyProvider } from '../auth.third.party.provider';
import {
  AuthUrl,
  AuthGoogleCallbackUrl,
} from 'src/modules/user/auth/auth.controller';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: Env.GOOGLE_CLIENT_ID,
      clientSecret: Env.GOOGLE_CLIENT_SECRET,
      callbackURL: Env.API_URL + '/' + AuthUrl + '/' + AuthGoogleCallbackUrl,
      passReqToCallback: true,
      scope: ['email'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    done: (error: Error, user: any) => void,
  ) {
    try {
      const jwt: any = await this.authService.validateGoogleOAuthLogin(
        profile.id,
        profile,
        ThirdPartyProvider.GOOGLE,
      );
      const user = {
        jwt,
      };
      done(null, user);
    } catch (e) {
      done(e, false);
    }
  }
}
