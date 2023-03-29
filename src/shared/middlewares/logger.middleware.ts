import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(req: any, res: any, next: (error?: any) => void) {
    this.logger.log('Request', req);
    this.logger.log('Response', res);
    next();
  }
}
