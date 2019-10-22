import { Order } from './state';

/**
 * В action'ах можно свободно обойтись без payload и передавать
 * напрямую quantity, order и error
 */


export enum OrderActionTypes {
  ADD_ORDER = '[Order] Add',
  ADD_ORDER_SUCCESS = '[Order] Added success',
  ADD_ORDER_FAILURE = '[Order] Add failure',
  CLEAR_ORDER = '[Order] Clear'
}

export class AddOrder {
  static readonly type = OrderActionTypes.ADD_ORDER;
  constructor(public payload: { quantity: number }) {}
}

export class ClearOrder {
  static readonly type = OrderActionTypes.CLEAR_ORDER;
  constructor() {}
}

export class AddOrderSuccess {
  static readonly type = OrderActionTypes.ADD_ORDER_SUCCESS;
  constructor(public payload: { order: Order }) {}
}

export class AddOrderFailure {
  static readonly type = OrderActionTypes.ADD_ORDER_FAILURE;
  constructor(public payload: { error: Error }) {}
}
