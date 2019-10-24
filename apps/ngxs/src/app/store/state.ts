// В Ngrx это файл reducer
import { State, Selector, Action, StateContext } from '@ngxs/store';
import {
  AddOrder,
  ClearOrder,
  AddOrderSuccess,
  AddOrderFailure
} from './actions';
import { catchError, map } from 'rxjs/operators'
import { INITIAL_STATE, AppState as AppStateModel } from '@ngx-sm/flux'
import { ApiDataAccessService } from '@ngx-sm/api-data-access';

const initialState: AppStateModel = { 
  ...INITIAL_STATE, 
  title: 'Ngxs',
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
  constructor(private _apiData: ApiDataAccessService) {}

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
    return this._apiData.order(String(currentValue + action.payload.quantity)).pipe(
      map(order => ctx.dispatch(new AddOrderSuccess({ order }))),
      catchError(errorRes => ctx.dispatch(new AddOrderFailure({ error: new Error(errorRes.error.message) })))
    );
  }

  @Action(AddOrderSuccess)
  addSuccess(ctx: StateContext<AppStateModel>, action: AddOrderSuccess) {
    ctx.patchState({
      order: action.payload.order,
      error: null,
      loading: false
    });
  }

  @Action(AddOrderFailure)
  addFailure(ctx: StateContext<AppStateModel>, action: AddOrderFailure) {
    ctx.patchState({
      error: action.payload.error,
      loading: false
    });
  }

  @Action(ClearOrder)
  clear(ctx: StateContext<AppStateModel>) {
    ctx.setState(initialState);
  }
}
