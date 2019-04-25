import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StaticRoutingModule} from './static-routing.module';
import { TabsModule } from 'ngx-bootstrap';
import {SharedModule} from '../shared/shared.module';
import { SpinnerModule } from '../shared-modules/spinner/spinner.module';
import { StaticContainerComponent } from './static.container';

/**
 * Declares component and routes for viewing static content
 */

@NgModule({
  imports: [
    CommonModule,
    StaticRoutingModule,
    TabsModule,
    SharedModule,
    SpinnerModule
  ],
  declarations: [StaticContainerComponent]
})
export class StaticModule { }
