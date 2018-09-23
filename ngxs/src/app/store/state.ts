// В Ngrx это файл reducer
import { State, Selector, Action, StateContext } from '@ngxs/store';
import {
  AddOrder,
  ClearOrder,
  AddOrderSuccess,
  AddOrderFailure
} from './actions';
import { AppService } from '../app.service';
import { catchError, map } from 'rxjs/operators';

export interface Order {
  quantity: number;
  price: number;
}

/** Модель состояния */
export interface AppStateModel {
  title: string;
  order: Order;
  error: Error;
  loading: boolean;
}

const initialState: AppStateModel = {
  title: 'Ngxs',
  order: {
    quantity: 0,
    price: 700
  },
  error: null,
  loading: false
};

/**
 * Декоратор для имени состояния и значения по-умолчанию
 * @see https://ngxs.gitbook.io/ngxs/concepts/state#defining-a-state
 * Под капотом используется BehaviorSubject
 * Внутри селекторы и action'ы
 */
@State<AppStateModel>({
  name: 'order',
  defaults: initialState
})
export class AppState {
  constructor(private _appService: AppService) {}

  @Selector()
  static getQuantity(state: AppStateModel) {
    return state.order.quantity;
  }

  @Selector()
  static getErrorMessage(state: AppStateModel) {
    return state.error.message;
  }

  @Selector()
  static getLoading(state: AppStateModel) {
    return state.loading;
  }

  @Action(AddOrder)
  add(ctx: StateContext<AppStateModel>, action: AddOrder) {
    const state = ctx.getState();
    ctx.patchState({
      error: null,
      loading: true
    });
    // полная форма @see https://ngxs.gitbook.io/ngxs/concepts/state#actions-with-a-payload
    // ctx.setState({
    //   ...state,
    //   error: null,
    //   loading: true
    // });
    const currentValue = state.order.quantity;
    return this._appService.addProduct(currentValue, action.quantity).pipe(
      map(order => ctx.dispatch(new AddOrderSuccess(order))),
      catchError(error => ctx.dispatch(new AddOrderFailure(error)))
    );
  }

  @Action(AddOrderSuccess)
  addSuccess(ctx: StateContext<AppStateModel>, action: AddOrderSuccess) {
    ctx.patchState({
      order: action.order,
      error: null,
      loading: false
    });
  }

  @Action(AddOrderFailure)
  addFailure(ctx: StateContext<AppStateModel>, action: AddOrderFailure) {
    ctx.patchState({
      error: action.error,
      loading: false
    });
  }

  @Action(ClearOrder)
  clear(ctx: StateContext<AppStateModel>) {
    ctx.setState(initialState);
  }
}
