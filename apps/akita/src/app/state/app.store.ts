import { Injectable } from '@angular/core';
import { Store, StoreConfig, action } from '@datorama/akita';
import { AppState, INITIAL_STATE, OrderActionType } from '@ngx-sm/flux';

const initialState: AppState = {
  ...INITIAL_STATE,
  title: 'Akita',
};

export function createInitialState(): AppState {
  return initialState;
}

/**
 * Все хранилища очень маленькие
 * error и loading сделаны встроенными сущностями
 * В хранилище могут быть методы на основе setState() или update()
 * Декоратор @action используется для отладки через redux dev tools
 * @see https://netbasal.gitbook.io/akita/enhancers/devtools
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState());
  }

  @action(OrderActionType.CLEAR_ORDER)
  clear(): void {
    this.update(initialState);
  }
}
