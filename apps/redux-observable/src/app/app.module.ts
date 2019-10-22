import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  NgReduxModule,
  NgRedux,
  DevToolsExtension
} from '@angular-redux/store';
import { createEpicMiddleware } from 'redux-observable-es6-compat';
import { createLogger } from 'redux-logger';

import { AppComponent } from './app.component';
import { orderReducer, INITIAL_STATE, AppState } from './store/reducer';
import { OrderEpics } from './store/epics';
import { OrderActionsService } from './action.service';
import { AllOrderActions } from './store/actions';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgReduxModule],
  providers: [OrderActionsService, OrderEpics],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension,
    orderEpics: OrderEpics
  ) {
    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : [];
    /** @see https://github.com/redux-observable/redux-observable/issues/555 */
    const epicMiddleware = createEpicMiddleware<AllOrderActions, AllOrderActions, AppState, void>();
    const middleware = [createLogger(), epicMiddleware];
    ngRedux.configureStore(
      orderReducer,
      INITIAL_STATE,
      middleware,
      storeEnhancers
    );
    epicMiddleware.run(orderEpics.addOrder);
  }
}
