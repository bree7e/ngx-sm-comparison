import * as ProductActions from './actions';
import { createReducer, on, Action } from '@ngrx/store';
import { AppState, INITIAL_STATE } from '@ngx-sm/flux';

const initialState: AppState = {
  ...INITIAL_STATE,
  title: 'NgRx',
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
