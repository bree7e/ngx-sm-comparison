import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApiDataAccessModule } from '@ngx-sm/api-data-access';

import { AppComponent } from './app.component';
import { OrderEffects } from './store/effects';
import { reducer } from './store/reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ state: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 // хранить 25 последних состояний
    }),
    EffectsModule.forRoot([OrderEffects]),
  
    ApiDataAccessModule.forRoot({ prefix: 'api' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
