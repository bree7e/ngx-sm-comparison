import { Component } from '@angular/core';

import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddOrder, ClearOrder } from './store/actions';
import { AppStateModel, AppState } from './store/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(AppState) state$: Observable<AppStateModel>;
  @Select(AppState.getLoading) loading$: Observable<boolean>;
  public count: number;

  constructor(private _store: Store) {}

  onSubmit(): void {
    this._store.dispatch(new AddOrder(this.count));
  }

  clear(): void {
    this._store.dispatch(new ClearOrder());
  }
}
