import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';

import { AppDataService } from '../app.data.service';
import {
  OrderActionTypes,
  AllOrderActions,
  AddOrder,
  OrderActionCreators
} from './actions';
import { AppState } from './reducer';

@Injectable()
export class OrderEpics {
  constructor(private _appDataService: AppDataService) {}

  addOrder = (
    action$: ActionsObservable<AllOrderActions>,
    state$: StateObservable<AppState>
  ) => {
    return action$.pipe(
      ofType(OrderActionTypes.ADD_ORDER),
      withLatestFrom(state$),
      mergeMap(([action, lastState]) =>
        this._appDataService
          .addProduct(
            lastState.order.quantity,
            (action as AddOrder).payload.quantity // (<AddOrder>action).payload.quantity
          )
          .pipe(
            map(order => OrderActionCreators.addSuccess({ order })),
            catchError(error => of(OrderActionCreators.addFailure({ error })))
          )
      )
    );
  }
}
