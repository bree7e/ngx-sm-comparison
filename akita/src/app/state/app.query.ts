import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import { AppStore } from './app.store';
import { AppState } from './app.model';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {
  public getTitle$ = this.select(state => state.title);

  constructor(protected store: AppStore) {
    super(store);
  }

}
