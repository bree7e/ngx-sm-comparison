import { Injectable } from '@angular/core';
import { action, observable, computed, autorun, extendObservable, set } from 'mobx';
import { AppDataService } from './app.data.service';

export interface Order {
  quantity: number;
  price: number;
}

export interface AppState {
  title: string;
  order: Order;
  error: Error;
  loading: boolean;
}

const initialState: AppState = {
  title: 'Mobx',
  order: {
    quantity: 0,
    price: 700
  },
  error: null,
  loading: false
};

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  @observable state: AppState = initialState;

  constructor(private _appDataService: AppDataService) { }

  @action add(quantity: number): void {
    this.state.loading = true;
    this._appDataService
      .addProduct(this.state.order.quantity, quantity)
      .subscribe(
        order => this.addSuccess(order),
        error => this.addFailure(error)
      );
  }

  @action addSuccess(order: Order): void {
    this.state.order = order;
    this.state.error = null;
    this.state.loading = false;
  }

  @action addFailure(error: Error): void {
    this.state.error = error;
    this.state.loading = false;
  }

  @action reset(): void {
    set(this.state, initialState);
  }
}
