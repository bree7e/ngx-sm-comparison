import { Injectable } from '@angular/core';

import { applyTransaction, action, applyAction } from '@datorama/akita';

import { AppStore } from './app.store';
import { AppQuery } from './app.query';
import { AppDataService } from 'src/app/app.data.service';

/**
 * Асинхронная логика и вызовы апдейтов должны быть инкапсулированы в сервисы.
 */
@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private _appStore: AppStore, // отправлять actions
    private _appQuery: AppQuery, // брать данные
    private _appDataService: AppDataService, // backend
  ) {}

  @action({ type: 'Add product to order' })
  public add(quantity: number): void {
    const currentValue = this._appQuery.getSnapshot().order.quantity;
    this._appStore.setLoading(true);
    this._appDataService.addProduct(currentValue, quantity).subscribe(
      order => {
        // Transactions are an optimization for performing multiple operations on the store
        // @see https://netbasal.gitbook.io/akita/entity-store/transactions
        applyTransaction(() => {
          this._appStore.setState(state => ({...state, order }));
          this._appStore.setLoading(false);
          this._appStore.setError(null);
        });
      },
      error => {
        this._appStore.setLoading(false);
        this._appStore.setError(error);
      }
    );
  }

  public reset(): void {
    this._appStore.clear();
    this._appStore.setError(null);
  }
}
