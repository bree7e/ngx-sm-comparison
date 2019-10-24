import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { getState, getLoading } from './store/selectors';
import { AppState } from '@ngx-sm/flux';
import { addOrder, clearOrder } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public state$ = this._store.select(getState);
  public loading$ = this._store.select(getLoading);
  public count: number;

  constructor (private _store: Store<AppState>) {}

  onSubmit(): void {
    this._store.dispatch(addOrder({ quantity: this.count }));
  }

  clear(): void {
    this._store.dispatch(clearOrder());
  }
}
