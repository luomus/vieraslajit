import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import {StaticRoutingModule} from './static-routing.module';

/**
 * Declares component and routes for viewing static content
 */

@NgModule({
  imports: [
    CommonModule,
    StaticRoutingModule
  ],
  declarations: [StaticComponent]
})
export class StaticModule { }
