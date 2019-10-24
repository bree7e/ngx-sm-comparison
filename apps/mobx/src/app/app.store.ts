import { Injectable } from '@angular/core';
import { action, observable, set } from 'mobx';
import { ApiDataAccessService } from '@ngx-sm/api-data-access';
import { Order } from '@ngx-sm/api-interfaces';
import { AppState, INITIAL_STATE } from '@ngx-sm/flux';

const initialState: AppState = {
  ...INITIAL_STATE,
  title: 'Mobx',
};

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  @observable state: AppState = initialState;

  constructor(private _apiData: ApiDataAccessService) { }

  @action add(quantity: number): void {
    this.state.loading = true;
    this._apiData
      .order(String(this.state.order.quantity + quantity))
      .subscribe(
        order => this.addSuccess(order),
        errorRes => this.addFailure(new Error(errorRes.error.message))
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
