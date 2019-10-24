import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { AddOrder, ClearOrder } from './store/actions';
import { AppState } from './store/state';
import { AppState as AppStateModel } from '@ngx-sm/flux'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @Select(AppState) state$: Observable<AppStateModel>;
  @Select(AppState.getLoading) loading$: Observable<boolean>;
  public count: number;

  constructor(private _store: Store) {}

  onSubmit(): void {
    this._store.dispatch(new AddOrder({ quantity: this.count }));
  }

  clear(): void {
    this._store.dispatch(new ClearOrder());
  }
}
