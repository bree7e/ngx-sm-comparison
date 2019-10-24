import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { AllOrderActions } from './actions';
import { OrderActionType, AppState, INITIAL_STATE } from '@ngx-sm/flux';

export const initalState: AppState = {
  ...INITIAL_STATE,
  title: 'Redux Observable',
};

/**
 * Редьюсер заказа
 * @param lastState текущее состояние хранилища
 * @param action действие над хранилищем.
 * Если FluxStandardAction, то в payload должно передаваться объекты
 * в той структуре, как она содержится в интерфейсе AppState. Получается не должны
 * передаваться вложенные сущности, только плоские.
 */
export const orderReducer: Reducer<AppState> = (
  lastState: AppState,
  action: AllOrderActions // FluxStandardAction<AppState>
): AppState => {
  switch (action.type) {
    case OrderActionType.ADD_ORDER:
      return {
        ...lastState,
        error: null,
        loading: true
      };
    case OrderActionType.ADD_ORDER_SUCCESS:
      return {
        ...lastState,
        order: action.payload.order,
        error: null,
        loading: false
      };
    case OrderActionType.ADD_ORDER_FAILURE:
      return {
        ...lastState,
        error: action.payload.error,
        loading: false
      };
    case OrderActionType.CLEAR_ORDER:
      return {
        ...initalState
      };
    default:
      return lastState;
  }
};
