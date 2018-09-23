import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { OrderEffects } from './store/effects';
import { orderReducer } from './store/reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ state: orderReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // хранить 25 последних состояний
    }),
    EffectsModule.forRoot([OrderEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
