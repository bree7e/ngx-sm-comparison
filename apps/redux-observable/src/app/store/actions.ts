import { Action } from 'redux';
import { Order } from '@ngx-sm/api-interfaces';
import { OrderActionType } from '@ngx-sm/flux';

// 2. Интерфейсы действий
export interface AddOrder extends Action<OrderActionType.ADD_ORDER> {
  payload: { quantity: number };
}

export interface AddOrderSuccess
  extends Action<OrderActionType.ADD_ORDER_SUCCESS> {
  payload: { order: Order };
}

export interface AddOrderFailure
  extends Action<OrderActionType.ADD_ORDER_FAILURE> {
  payload: { error: Error };
}

export interface ClearOrder extends Action<OrderActionType.CLEAR_ORDER> {}

export type AllOrderActions =
  | AddOrder
  | AddOrderSuccess
  | AddOrderFailure
  | ClearOrder;

// 3. ActionCreators
export class OrderActionCreators {
  static add(payload: { quantity: number }): AddOrder {
    return {
      type: OrderActionType.ADD_ORDER,
      payload
    };
  }

  static addSuccess(payload: { order: Order }): AddOrderSuccess {
    return {
      type: OrderActionType.ADD_ORDER_SUCCESS,
      payload
    };
  }

  static addFailure(payload: { error: Error }): AddOrderFailure {
    return {
      type: OrderActionType.ADD_ORDER_FAILURE,
      payload
    };
  }

  static clear(): ClearOrder {
    return {
      type: OrderActionType.CLEAR_ORDER
    };
  }
}
