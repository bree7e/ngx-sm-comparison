import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, withLatestFrom, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@ngx-sm/flux';
import { ApiDataAccessService } from '@ngx-sm/api-data-access';

import * as ProductActions from './actions';
import { getQuantity } from './selectors';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private _apiData: ApiDataAccessService,
    private _store: Store<AppState>
  ) {}

  /**
   * Ловит action из UI и обращается к сервису
   * Ответ сервиса оформляет одним из 2 action'ов
   */
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.addOrder),
      map(action => action.quantity),
      withLatestFrom(this._store.select(getQuantity)),
      switchMap(([quantity, currentQuantity]) =>
        this._apiData.order(String(currentQuantity + quantity)).pipe(
          map(order => ProductActions.addOrderSuccess({ order })),
          catchError(errorRes => of(ProductActions.addOrderFailure({ error: new Error(errorRes.error.message) })))
        )
      )
    )
  );
}
