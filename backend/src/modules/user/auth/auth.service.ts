import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ThirdPartyProvider } from './auth.third.party.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user.entity';
import { GoogleEntity } from './google/google.entity';
import { JwtPayload } from './jwt/jwt.payload';
import { Env } from '../../util/env/variables';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(GoogleEntity)
    private readonly googleRepository: Repository<GoogleEntity>,
  ) {}

  public async validateGoogleOAuthLogin(
    thirdPartyId: string,
    profile: any,
    provider: ThirdPartyProvider,
  ): Promise<any> {
    try {
      const email = profile.emails[0].value;
      let user: UserEntity = await this.userRepository.findOne({ email });
      if (!user) {
        const newUser = new UserEntity();
        newUser.email = email;
        user = await this.userRepository.save(newUser);

        const newGProfile = new GoogleEntity();
        newGProfile.profile = profile;
        newGProfile.user = user;
        await this.googleRepository.save(newGProfile);
      }

      const payload = {
        user: {
          email: user.email,
          id: user.id,
          admin:
            -1 !== Env.GOOGLE_ADMIN_EMAILS.indexOf(user.email) ? true : false,
        },
        provider,
      };

      return this.jwtService.sign(payload);
    } catch (e) {
      throw new InternalServerErrorException('validateOAuthLogin', e.message);
    }
  }

  public async validateUser(payload: JwtPayload) {
    return this.userRepository.findOne({
      where: { email: payload.user.email },
    });
  }
}
