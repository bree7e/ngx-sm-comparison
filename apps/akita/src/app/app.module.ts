import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { ApiDataAccessModule } from '@ngx-sm/api-data-access';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AkitaNgDevtools.forRoot({
      maxAge: 25
    }),
    ApiDataAccessModule.forRoot({ prefix: 'api' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
