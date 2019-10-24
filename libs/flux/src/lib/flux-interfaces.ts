import { Order } from '@ngx-sm/api-interfaces';

export interface AppState {
  title: string;
  order: Order;
  error: Error;
  loading: boolean;
}

export const INITIAL_STATE: AppState = {
  title: 'Flux',
  order: {
    quantity: 0,
    price: 700,
    sum: 0
  },
  error: null,
  loading: false
};
