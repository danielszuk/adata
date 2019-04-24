import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user.entity';
import { GoogleEntity } from './google/google.entity';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Env } from '../../util/env/variables';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: Env.SECRET_KEY,
      signOptions: {
        expiresIn: Env.SECRET_EXPIRATION,
      },
    }),
    TypeOrmModule.forFeature([UserEntity, GoogleEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
})
export class AuthModule {}
