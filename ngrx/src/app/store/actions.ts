import { createAction, props } from '@ngrx/store';

import { Order } from './reducer';

enum OrderActionTypes {
  ADD_ORDER = '[Order] Add',
  ADD_ORDER_SUCCESS = '[Order] Added',
  ADD_ORDER_FAILURE = '[Order] Add failed',
  CLEAR_ORDER = '[Order] Clear'
}

export const addOrder = createAction(
  OrderActionTypes.ADD_ORDER,
  props<{ quantity: number }>()
);

export const clearOrder = createAction(
  OrderActionTypes.CLEAR_ORDER,
);

export const addOrderSuccess = createAction(
  OrderActionTypes.ADD_ORDER_SUCCESS,
  props<{ order: Order }>()
);

export const addOrderFailure = createAction(
  OrderActionTypes.ADD_ORDER_FAILURE,
  props<{ error: Error }>()
);
