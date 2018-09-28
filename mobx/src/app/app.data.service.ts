import { Injectable } from '@angular/core';

import { Observable, timer, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Order } from './app.store';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  readonly max = 40;

  addProduct(currentValue = 0, addValue: number): Observable<Order> {
    // backend http логика
    if (!addValue) {
      return this._error('Не указано количество продукта');
    }
    const quantity = currentValue + addValue;
    let price = null;
    if (quantity < 10) {
      price = 700;
    } else if (quantity < 20) {
      price = 650;
    } else if (quantity <= this.max) {
      price = 600;
    } else {
      return this._error('Отказано. Максимальный заказ ' + this.max);
    }
    const product = <Order>{
      quantity,
      price
    };
    return of(product).pipe(delay(300));
  }

  private _error(message: string): Observable<never> {
    return timer(300).pipe(map(() => { throw new Error(message); }));
  }
}
