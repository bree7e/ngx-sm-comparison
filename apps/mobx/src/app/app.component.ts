import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AppStore } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public state = this._appStore.state;
  public count: number;

  constructor (private _appStore: AppStore) {}

  onSubmit(): void {
    this._appStore.add(this.count);
  }

  clear(): void {
    this._appStore.reset();
  }
}
