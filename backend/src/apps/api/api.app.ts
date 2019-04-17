import { App } from 'src/apps/app';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';

import { ApiModule } from 'src/apps/api/api.module';
import startApiSwagger from './api.swagger';
import { Env } from '../../modules/util/env/variables';

export class ApiApp extends App {
  constructor() {
    super('ApiApp');
  }

  public async bootstrap(): Promise<void> {
    this.logger.log('bootstapping');

    const allowedOrigins: string | string[] = Env.FE_URL;
    this.logger.log('allowedOrigins', allowedOrigins);

    this.app = await NestFactory.create(ApiModule, {
      cors: {
        credentials: true,
        origin: allowedOrigins,
      },
      logger: new Logger(),
    });

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );

    await startApiSwagger(this.app);
    await this.listen(this.app);

    this.logger.log('bootstrap finished');
  }
}
