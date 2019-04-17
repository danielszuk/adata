import { ThirdPartyProvider } from '../auth.third.party.provider';

export interface JwtPayload {
  user: {
    email: string;
    id: string;
    admin: boolean;
  };
  provide: ThirdPartyProvider;
}
