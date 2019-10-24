import { Injectable } from '@angular/core';

import { applyTransaction, action } from '@datorama/akita';

import { AppStore } from './app.store';
import { AppQuery } from './app.query';
import { OrderActionType } from '@ngx-sm/flux';
import { ApiDataAccessService } from '@ngx-sm/api-data-access';


/**
 * Асинхронная логика и вызовы апдейтов должны быть инкапсулированы в сервисы.
 */
@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private _appStore: AppStore, // отправлять actions
    private _appQuery: AppQuery, // брать данные
    private _apiData: ApiDataAccessService,
  ) {}

  @action(OrderActionType.ADD_ORDER)
  public add(quantity: number): void {
    const currentValue = this._appQuery.getValue().order.quantity;
    this._appStore.setLoading(true);
    this._apiData.order(String(currentValue + quantity)).subscribe(
      order => {
        // Transactions are an optimization for performing multiple operations on the store
        // @see https://netbasal.gitbook.io/akita/entity-store/transactions
        applyTransaction(() => {
          this._appStore.update({ order });
          this._appStore.setLoading(false);
          this._appStore.setError(null);
        });
      },
      errorRes => {
        this._appStore.setLoading(false);
        this._appStore.setError(new Error(errorRes.error.message));
      }
    );
  }

  public reset(): void {
    this._appStore.clear();
    this._appStore.setError(null);
  }
}
