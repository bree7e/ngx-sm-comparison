import { Order } from '@ngx-sm/api-interfaces';
import { OrderActionType } from '@ngx-sm/flux';

/**
 * В action'ах можно свободно обойтись без payload и передавать
 * напрямую quantity, order и error
 */

export class AddOrder {
  static readonly type = OrderActionType.ADD_ORDER;
  constructor(public payload: { quantity: number }) {}
}

export class ClearOrder {
  static readonly type = OrderActionType.CLEAR_ORDER;
  constructor() {}
}

export class AddOrderSuccess {
  static readonly type = OrderActionType.ADD_ORDER_SUCCESS;
  constructor(public payload: { order: Order }) {}
}

export class AddOrderFailure {
  static readonly type = OrderActionType.ADD_ORDER_FAILURE;
  constructor(public payload: { error: Error }) {}
}
