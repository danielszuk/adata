import { Logger as NestLogger } from '@nestjs/common';

// tslint:disable-next-line:no-var-requires
const util = require('util');

export class Logger extends NestLogger {
  public log(message: string, ...args: any[]): void {
    super.log(message + this.argsLogger(args));
  }

  public warn(message: string, ...args: any[]): void {
    super.warn(message + this.argsLogger(args));
  }

  public error(message: string, ...args: any[]): void {
    super.error(message + this.argsLogger(args));
  }

  private argsLogger(args: any[]): string {
    if (args.length) {
      return ' ' + util.inspect(args, false, null, true);
    } else {
      return '';
    }
  }
}
