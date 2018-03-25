import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import {StaticRoutingModule} from './static-routing.module';

/**
 * Loads the required modules for the dynamic static page
 */

@NgModule({
  imports: [
    CommonModule,
    StaticRoutingModule
  ],
  declarations: [StaticComponent]
})
export class StaticModule { }
