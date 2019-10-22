import { Injectable } from '@nestjs/common';
import { Message } from '@nx-sm-somparison/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
