import { Injectable } from '@angular/core';

import { Subject, MonoTypeOperatorFunction } from 'rxjs';
import {
  filter,
  map,
  scan,
  publishReplay,
  refCount,
  mergeMap,
  withLatestFrom,
  switchMap,
} from 'rxjs/operators';
import { Order } from '@ngx-sm/api-interfaces';
import { ApiDataAccessService } from '@ngx-sm/api-data-access';

import { AppState } from './app.service.interface';

export enum OrderActionTypes {
  ADD_ORDER = '[Order] Add',
  ADD_ORDER_SUCCESS = '[Order] Added success',
  ADD_ORDER_FAILURE = '[Order] Add failure',
  CLEAR_ORDER = '[Order] Clear',
}

export interface AddOrder {
  type: OrderActionTypes.ADD_ORDER;
  payload: { quantity: number };
}

export interface ClearOrder {
  type: OrderActionTypes.CLEAR_ORDER;
}

export interface AddOrderSuccess {
  type: OrderActionTypes.ADD_ORDER_SUCCESS;
  payload: { order: Order };
}

export interface AddOrderFailure {
  type: OrderActionTypes.ADD_ORDER_FAILURE;
  payload: { error: Error };
}

export type AllOrderActions =
  | AddOrder
  | AddOrderSuccess
  | AddOrderFailure
  | ClearOrder;

function ofType<T extends AllOrderActions>(
  type: OrderActionTypes
): MonoTypeOperatorFunction<T> {
  return filter(action => type === action.type);
}

@Injectable({
  providedIn: 'root',
})
export class AppScanService {
  readonly initialState: AppState = {
    title: 'Rxjs',
    order: {
      quantity: 0,
      price: 700,
      sum: null
    },
    error: null,
    loading: false,
  };
  private _action$ = new Subject<AllOrderActions>();
  readonly state$ = this._action$.pipe(
    scan(this._reducer.bind(this), this.initialState), // magic is here!
    publishReplay(1),
    refCount()
  );
  readonly loading$ = this.state$.pipe(map(s => s.loading));

  constructor(private _apiData: ApiDataAccessService) {
    // this._initAsyncActions();
  }

  add(quantity: number): void {
    this.dispatch({ type: OrderActionTypes.ADD_ORDER, payload: { quantity } });
  }

  reset(): void {
    this.dispatch({ type: OrderActionTypes.CLEAR_ORDER });
  }

  private dispatch(action: AllOrderActions): void {
    this._action$.next(action);
  }

  private _reducer(state: AppState, action: AllOrderActions): AppState {
    switch (action.type) {
      case OrderActionTypes.ADD_ORDER: {
        this._apiData
          .order(String(state.order.quantity + action.payload.quantity))
          .subscribe({
            next: order =>
              this.dispatch({
                type: OrderActionTypes.ADD_ORDER_SUCCESS,
                payload: { order },
              }),
            error: errorRes =>
              this.dispatch({
                type: OrderActionTypes.ADD_ORDER_FAILURE,
                payload: { error: new Error(errorRes.error.message) },
              }),
          });
        return {
          ...state,
          error: null,
          loading: true,
        };
      }
      case OrderActionTypes.ADD_ORDER_SUCCESS:
        return {
          ...state,
          order: action.payload.order,
          error: null,
          loading: false,
        };
      case OrderActionTypes.ADD_ORDER_FAILURE:
        return {
          ...state,
          error: action.payload.error,
          loading: false,
        };
      case OrderActionTypes.CLEAR_ORDER: {
        return {
          ...this.initialState,
        };
      }
      default: {
        return state;
      }
    }
  }

  /**
   * Необходимость отменять запросы
   */
  private _initAsyncActions(): void {
    this._action$
      .pipe(
        filter(action => action.type === OrderActionTypes.ADD_ORDER),
        map((action: AddOrder) => action),
        withLatestFrom(this.state$),
        switchMap(([action, state]) =>
          this._apiData.order(
            String(state.order.quantity + action.payload.quantity),
          )
        )
      )
      .subscribe({
        next: order =>
          this.dispatch({
            type: OrderActionTypes.ADD_ORDER_SUCCESS,
            payload: { order },
          }),
        error: errorRes =>
          this.dispatch({
            type: OrderActionTypes.ADD_ORDER_FAILURE,
            payload: { error: new Error(errorRes.error.message) },
          }),
      });
  }
}
