import { INestApplication } from '@nestjs/common';
import { Server } from 'http';
import { Logger } from '../modules/util/logger';
import {Env} from '../modules/util/env/variables';

export abstract class App {
  public readonly name: string;

  protected app: INestApplication;
  protected server: Server;

  protected readonly logger: Logger;

  constructor(name: string) {
    this.name = name;
    this.logger = new Logger(this.name);
    // handle promise rejections
    process.on(
      'unhandledRejection',
      async (reason: Error, promise: Promise<any>) => {
        await this.handleRejection(reason, promise);
      },
    );
  }

  private async handleRejection(error: Error, _): Promise<void> {
    this.logger.error('promise rejected', error);
  }

  protected abstract async bootstrap(): Promise<void>;

  protected async listen(app: any): Promise<void> {
    try {
      this.server = await app.listen(Env.API_PORT);
      this.logger.log(`server started, listening`);
    } catch (error) {
      this.logger.error('unable to start server', error);

      return;
    }
  }
}
