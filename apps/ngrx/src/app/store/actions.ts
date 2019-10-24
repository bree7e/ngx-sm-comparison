import { createAction, props } from '@ngrx/store';
import { OrderActionType } from '@ngx-sm/flux';
import { Order } from '@ngx-sm/api-interfaces';

export const addOrder = createAction(
  OrderActionType.ADD_ORDER,
  props<{ quantity: number }>()
);

export const clearOrder = createAction(
  OrderActionType.CLEAR_ORDER,
);

export const addOrderSuccess = createAction(
  OrderActionType.ADD_ORDER_SUCCESS,
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  OrderActionType.ADD_ORDER_FAILURE,
  props<{ error: Error }>()
);
