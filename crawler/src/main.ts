// import * as Dotenv from 'dotenv-safe';
// Dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './modules/util/env';
import { Logger as NestLogger } from '@nestjs/common';
import { Logger } from './modules/util/logger';

const logger = new Logger('main');

async function bootstrap() {
  logger.log('bootstrapping');

  const allowedOrigins: string | string[] = Env.API_URL;
  logger.log('allowedOrigins', allowedOrigins);

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: allowedOrigins,
    },
    logger: new NestLogger(),
  });

  await app.listen(Env.CRAWLER_PORT);
  logger.log(`App is lintening on port '${Env.CRAWLER_PORT}'`);
  logger.log('bootstrap finished');
}
bootstrap().catch(error => {
  throw error;
});
