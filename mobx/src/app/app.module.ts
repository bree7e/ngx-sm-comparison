import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MobxAngularModule } from 'mobx-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MobxAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
