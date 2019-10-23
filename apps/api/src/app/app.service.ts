import { Injectable } from '@nestjs/common';
import { Message, Order } from '@ngx-sm/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  getBalance(): number {
    return 40;
  }

  getPrice(quantity: number): number {
    let price = null;
    if (quantity < 10) {
      price = 700;
    } else if (quantity < 20) {
      price = 650;
    } else {
      price = 600;
    }
    return price;
  }
}
