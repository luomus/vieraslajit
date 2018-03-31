import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import {StaticRoutingModule} from './static-routing.module';
import {routing} from './static.routing';
import {SharedModule} from '../shared/shared.module';

/**
 * Declares component and routes for viewing static content
 */

@NgModule({
  imports: [
    CommonModule,
    StaticRoutingModule,
    routing,
    SharedModule
  ],
  declarations: [StaticComponent]
})
export class StaticModule { }
