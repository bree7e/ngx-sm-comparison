import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';
import { AppState } from '@ngx-sm/flux';

import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {
  public getTitle$ = this.select(state => state.title);

  constructor(protected store: AppStore) {
    super(store);
  }

}
