// import * as Dotenv from 'dotenv-safe';
// Dotenv.config();

import { Logger } from './modules/util/logger';
import { ApiApp } from './apps/api/api.app';
import { Env } from './modules/util/env/variables';

async function bootstrap() {
  const logger = new Logger('main');
  const appTypes = Env.APP_TYPES;

  logger.log('starting apps:', appTypes);

  if (appTypes.indexOf('api') !== -1) {
    const apiApp = new ApiApp();
    await apiApp.bootstrap().catch(error => {
      logger.error(`error while bootstrapping ${ApiApp.name}`, error);
      throw new Error();
    });
  }
  if (appTypes.indexOf('cron') !== -1) {
    // const cronApp = new CronApp();
    // await cronApp.bootstrap().catch(error => {
    //   logger.error(`error while bootstrapping ${CronApp.name}`, error);
    //   throw new Error();
    // });
  }
}

bootstrap().catch(error => {
  throw error;
});
