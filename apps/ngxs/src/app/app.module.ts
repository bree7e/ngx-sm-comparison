import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ApiDataAccessModule } from '@ngx-sm/api-data-access';

import { AppComponent } from './app.component';
import { AppState } from './store/state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxsModule.forRoot([AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ApiDataAccessModule.forRoot({ prefix: 'api' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
