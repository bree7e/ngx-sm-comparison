import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppQuery } from './state/app.query';
import { AppService } from './state/app.service';

/**
 * Работают либо в сторе, либо в сервисе, третьего не дано.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public state$ = this._orderQuery.select();
  // для единообразия не запрашивается явно
  // public error$ = this._orderQuery.selectError();
  public loading$ = this._orderQuery.selectLoading();
  public count: number;

  constructor(
    private _orderService: AppService,
    private _orderQuery: AppQuery
  ) {}

  onSubmit(): void {
    this._orderService.add(this.count);
  }

  clear(): void {
    this._orderService.reset();
  }
}
