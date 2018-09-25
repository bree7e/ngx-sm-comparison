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
