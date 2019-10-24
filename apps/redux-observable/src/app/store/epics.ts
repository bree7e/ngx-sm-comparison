import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { OrderActionType } from '@ngx-sm/flux';
import { ApiDataAccessService } from '@ngx-sm/api-data-access';

import {
  AllOrderActions,
  AddOrder,
  OrderActionCreators
} from './actions';
import { AppState } from '@ngx-sm/flux';

@Injectable()
export class OrderEpics {
  constructor(private _apiData: ApiDataAccessService) {}

  addOrder = (
    action$: ActionsObservable<AllOrderActions>,
    state$: StateObservable<AppState>
  ) => {
    return action$.pipe(
      ofType(OrderActionType.ADD_ORDER),
      withLatestFrom(state$),
      mergeMap(([action, lastState]) =>
        this._apiData
          .order(String(
            lastState.order.quantity +
            (action as AddOrder).payload.quantity // (<AddOrder>action).payload.quantity
          ))
          .pipe(
            map(order => OrderActionCreators.addSuccess({ order })),
            catchError(errorRes => of(OrderActionCreators.addFailure({ error: new Error(errorRes.error.message) })))
          )
      )
    );
  }
}
