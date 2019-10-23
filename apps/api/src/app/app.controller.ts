import {
  Controller,
  Get,
  Query,
  BadRequestException
} from '@nestjs/common';

import { Message, Order } from '@ngx-sm/api-interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Get('order')
  getOrder(@Query('value') value: string): Order {
    const quantity = Number(value);
    if (!quantity || quantity < 0) {
      throw new BadRequestException('Не указано количество продукта');
    }
    const maxValue = this.appService.getBalance();
    if (quantity > maxValue) {
      throw new BadRequestException(`Отказано. Доступный остаток ${maxValue}`);
    }
    const price = this.appService.getPrice(quantity);
    return {
      quantity,
      price,
      sum: quantity * price
    };
  }
}
