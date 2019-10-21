import { Injectable } from '@angular/core';
import { Store, StoreConfig, action } from '@datorama/akita';
import { AppState } from './app.model';

const initialState: AppState = {
  title: 'Akita',
  order: {
    quantity: 0,
    price: 700
  }
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

  @action('[Order] Clear')
  clear(): void {
    this.update(initialState);
  }
}
