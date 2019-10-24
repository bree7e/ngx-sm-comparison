import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MobxAngularModule } from 'mobx-angular';
import { ApiDataAccessModule } from '@ngx-sm/api-data-access';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MobxAngularModule,
    ApiDataAccessModule.forRoot({ prefix: 'api' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
