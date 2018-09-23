import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppService } from '../app.service';
import {
  AddOrder,
  AddOrderFailure,
  AddOrderSuccess,
  OrderActionTypes
} from './actions';
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
  @Effect()
  addProduct$: Observable<
    AddOrderSuccess | AddOrderFailure
  > = this.actions$.pipe(
    ofType(OrderActionTypes.ADD_ORDER),
    map((action: AddOrder) => action.payload.quantity),
    withLatestFrom(this._store.select(getQuantity)),
    mergeMap(([quantity, currentQuantity]) =>
      this._appService.addProduct(currentQuantity, quantity).pipe(
        map(order => new AddOrderSuccess({ order })),
        catchError(error => of(new AddOrderFailure({ error })))
      )
    )
  );
}
