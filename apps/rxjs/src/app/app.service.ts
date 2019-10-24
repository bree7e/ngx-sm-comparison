import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiDataAccessService } from '@ngx-sm/api-data-access';
import { Order } from '@ngx-sm/api-interfaces';
import { AppState, INITIAL_STATE } from '@ngx-sm/flux';

const initialState: AppState = {
  ...INITIAL_STATE,
  title: 'Rxjs',
};


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _state = new BehaviorSubject<AppState>(initialState);
  public readonly state$ = this._state.asObservable();
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

  constructor(private _apiData: ApiDataAccessService) {}

  add(quantity: string): void {
    const oldOrder = this._state.getValue().order;
    this.loading = true;
    this._apiData
      .order(oldOrder.quantity + quantity)
      .subscribe(
        order => (this.order = order),
        errorRes => (this.error = new Error(errorRes.error.message))
      );
  }

  reset(): void {
    this._state.next(initialState);
    this._apiData.hello().subscribe(r => console.log(r));
  }
}
