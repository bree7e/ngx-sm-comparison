import * as ProductActions from './actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface Order {
  quantity: number;
  price: number;
}

export interface AppState {
  title: string;
  order: Order;
  error: Error;
  loading: boolean;
}

const initialState: AppState = {
  title: 'NgRx',
  order: {
    quantity: 0,
    price: 700,
  },
  error: null,
  loading: false,
};

const orderReducer = createReducer(
  initialState,
  on(ProductActions.addOrder, state => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(ProductActions.addOrderSuccess, (state, { order }) => ({
    ...state,
    order,
    error: null,
    loading: false,
  })),
  on(ProductActions.addOrderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ProductActions.clearOrder, () => ({ ...initialState }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return orderReducer(state, action);
}
