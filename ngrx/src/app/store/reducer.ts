import { ProductActions, OrderActionTypes } from './actions';

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
    price: 700
  },
  error: null,
  loading: false
};

export function orderReducer(
  state: AppState = initialState,
  action: ProductActions
): AppState {
//   console.log(action);
  switch (action.type) {
    case OrderActionTypes.ADD_ORDER:
      return {
        ...state,
        error: null,
        loading: true
      };
    case OrderActionTypes.ADD_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
        error: null,
        loading: false
      };
    case OrderActionTypes.ADD_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case OrderActionTypes.CLEAR_ORDER:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
