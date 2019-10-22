import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AppService } from './app.service';
import { AppScanService } from './app-scan.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public state$ = this._appService.state$;
  public loading$ = this._appService.loading$;
  public count: number;

  constructor (private _appService: AppService) {}

  onSubmit(): void {
    this._appService.add(this.count);
  }

  clear(): void {
    this._appService.reset();
  }
}
