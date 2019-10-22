import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ApiDataAccessModule } from '@ngx-sm/api-data-access';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ApiDataAccessModule.forRoot({ prefix: 'api' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
