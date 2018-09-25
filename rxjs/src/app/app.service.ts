import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppDataService } from './app.data.service';
import { AppState, Order } from './app.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  readonly initialState: AppState = {
    title: 'Rxjs',
    order: {
      quantity: 0,
      price: 700
    },
    error: null,
    loading: false
  };

  private _state = new BehaviorSubject<AppState>(this.initialState);
  public state$ = this._state.asObservable();
  public loading$ = this.state$.pipe(map(s => s.loading));

  set order(order: Order) {
    this._state.next({
      ...this._state.getValue(),
      order,
      error: null,
      loading: false
    });
  }

  set loading(value: boolean) {
    this._state.next({
      ...this._state.getValue(),
      loading: value
    });
  }

  set error(error: Error) {
    this._state.next({
      ...this._state.getValue(),
      error,
      loading: false
    });
  }

  constructor(private _appDataService: AppDataService) {}

  add(quantity: number): void {
    const oldState = this._state.getValue();
    this.loading = true;
    this._appDataService
      .addProduct(oldState.order.quantity, quantity)
      .subscribe(
        order => (this.order = order),
        error => (this.error = error)
      );
  }

  reset(): void {
    this._state.next(this.initialState);
  }
}
