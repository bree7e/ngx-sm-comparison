import { Injectable } from '@angular/core';

import { NgRedux } from '@angular-redux/store';

import { AppState } from '@ngx-sm/flux';
import { OrderActionCreators } from './store/actions';

@Injectable()
export class OrderActionsService {
  constructor(private _ngRedux: NgRedux<AppState>) {}

  add(quantity: number): void {
    this._ngRedux.dispatch(OrderActionCreators.add({ quantity }));
  }

  clear(): void {
    this._ngRedux.dispatch(OrderActionCreators.clear());
  }
}
