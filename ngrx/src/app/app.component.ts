import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getState, getLoading } from './store/selectors';
import { AppState } from './store/reducer';
import { AddOrder, ClearOrder } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public state$ = this._store.select(getState);
  public loading$ = this._store.select(getLoading);
  public count: number;

  constructor (private _store: Store<AppState>) {}

  onSubmit(): void {
    this._store.dispatch(new AddOrder({ quantity: this.count }));
  }

  clear(): void {
    this._store.dispatch(new ClearOrder());
  }
}
