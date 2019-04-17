import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JwtAuthGuard } from './jwt/jwt.guard';
import { Env } from 'src/modules/util/env/variables';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAdminGuard } from './jwt/jwt.admin.guard';

export const AuthUrl = 'auth';
export const AuthGoogleCallbackUrl = 'google/callback';

@Controller(AuthUrl)
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Redirect to Google Authentication page',
  })
  googleLogin() {
    // Handle the Google OAuth 2.0 authentication request
  }

  @Get(AuthGoogleCallbackUrl)
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status: HttpStatus.FOUND,
    description:
      'Redirect after Google authentication process (succes or failed)',
  })
  googleLoginCallback(@Req() req, @Res() res) {
    // Handle the Google OAuth 2.0 callback

    const jwt: string = req.user.jwt;
    if (jwt) {
      res.redirect(`${Env.FE_URL}/auth/callback/${jwt}`);
    } else {
      res.redirect(Env.FE_URL);
    }
  }

  @Get('protected')
  @UseGuards(JwtAdminGuard)
  async protectedRoute() {
    return 'proteted';
  }
}
