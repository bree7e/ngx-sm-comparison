
import { Order } from '@ngx-sm/api-interfaces';

export interface AppState {
  title: string;
  order: Order;
  error: Error;
  loading: boolean;
}
