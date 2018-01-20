import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { VrsRouterModule } from './vrs-router.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VrsRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
