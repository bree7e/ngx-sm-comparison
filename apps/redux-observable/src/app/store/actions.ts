import { Action } from 'redux';
import { Order } from './reducer';

// 1. Перечисление типов действий
export enum OrderActionTypes {
  ADD_ORDER = '[Order] Add',
  ADD_ORDER_SUCCESS = '[Order] Added',
  ADD_ORDER_FAILURE = '[Order] Add failed',
  CLEAR_ORDER = '[Order] Clear'
}

// 2. Интерфейсы действий
export interface AddOrder extends Action<OrderActionTypes.ADD_ORDER> {
  payload: { quantity: number };
}

export interface AddOrderSuccess
  extends Action<OrderActionTypes.ADD_ORDER_SUCCESS> {
  payload: { order: Order };
}

export interface AddOrderFailure
  extends Action<OrderActionTypes.ADD_ORDER_FAILURE> {
  payload: { error: Error };
}

export interface ClearOrder extends Action<OrderActionTypes.CLEAR_ORDER> {}

export type AllOrderActions =
  | AddOrder
  | AddOrderSuccess
  | AddOrderFailure
  | ClearOrder;

// 3. ActionCreators
export class OrderActionCreators {
  static add(payload: { quantity: number }): AddOrder {
    return {
      type: OrderActionTypes.ADD_ORDER,
      payload
    };
  }

  static addSuccess(payload: { order: Order }): AddOrderSuccess {
    return {
      type: OrderActionTypes.ADD_ORDER_SUCCESS,
      payload
    };
  }

  static addFailure(payload: { error: Error }): AddOrderFailure {
    return {
      type: OrderActionTypes.ADD_ORDER_FAILURE,
      payload
    };
  }

  static clear(): ClearOrder {
    return {
      type: OrderActionTypes.CLEAR_ORDER
    };
  }
}
