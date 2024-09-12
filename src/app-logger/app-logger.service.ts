import { ConsoleLogger, Injectable } from '@nestjs/common';
import logger from './logger';

@Injectable()
export class AppLoggerService extends ConsoleLogger {
  log(message: any, context?: string) {
    const msg = `${context} \ ${message}`;
    logger.log({
      level: 'info',
      message: msg,
    });

    super.log(msg);
  }

  error(message: any, stack?: string, context?: string) {
    const msg = `${context} \ ${message}`;
    logger.log({
      level: 'error',
      message: msg,
    });
    super.error(msg);
  }
}
