import { Component, ChangeDetectionStrategy } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { AppState } from '@ngx-sm/flux';
import { OrderActionsService } from './action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @select(state => state) readonly state$: Observable<AppState>;
  @select() readonly loading$: Observable<boolean>;
  // readonly state$ = this.$; // this.state$ = ngRedux.select(); в конструкторе
  public count: number;

  constructor(private _orderActionsService: OrderActionsService) {}

  onSubmit(): void {
    this._orderActionsService.add(this.count);
  }

  clear(): void {
    this._orderActionsService.clear();
  }
}
