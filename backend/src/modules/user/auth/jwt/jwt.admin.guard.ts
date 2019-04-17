import { Injectable, ExecutionContext } from '@nestjs/common';

import { JwtAuthGuard } from './jwt.guard';
import { Env } from 'src/modules/util/env/variables';

@Injectable()
export class JwtAdminGuard extends JwtAuthGuard {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const user = context.switchToHttp().getRequest().user;
    return -1 === Env.GOOGLE_ADMIN_EMAILS.indexOf(user.email);
  }
}
