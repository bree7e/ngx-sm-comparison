import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppService } from '../app.service';
import * as ProductActions from './actions';
import { AppState } from './reducer';
import { getQuantity } from './selectors';

@Injectable()
export class OrderEffects {
  constructor(
    private actions$: Actions,
    private _appService: AppService,
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
      mergeMap(([quantity, currentQuantity]) =>
        this._appService.addProduct(currentQuantity, quantity).pipe(
          map(order => ProductActions.addOrderSuccess({ order })),
          catchError(error => of(ProductActions.addOrderFailure({ error })))
        )
      )
    )
  );
}
