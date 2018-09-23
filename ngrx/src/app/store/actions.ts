import { Action } from '@ngrx/store';
import { Order } from './reducer';

export enum OrderActionTypes {
  ADD_ORDER = '[Order] Add',
  ADD_ORDER_SUCCESS = '[Order] Added',
  ADD_ORDER_FAILURE = '[Order] Add failed',
  CLEAR_ORDER = '[Order] Clear'
}

export class AddOrder implements Action {
  readonly type = OrderActionTypes.ADD_ORDER;
  constructor(public payload: { quantity: number }) {}
}

export class ClearOrder implements Action {
  readonly type = OrderActionTypes.CLEAR_ORDER;
  constructor() {}
}

export class AddOrderSuccess implements Action {
  readonly type = OrderActionTypes.ADD_ORDER_SUCCESS;
  constructor(public payload: { order: Order }) {}
}

export class AddProductFailure implements Action {
  readonly type = OrderActionTypes.ADD_ORDER_FAILURE;
  constructor(public payload: { error: Error }) {}
}

export type ProductActions =
  | AddOrder
  | AddOrderSuccess
  | AddProductFailure
  | ClearOrder;
