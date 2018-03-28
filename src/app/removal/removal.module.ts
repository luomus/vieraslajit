import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemovalComponent } from './removal.component';
import { OmnisearchComponent } from '../shared/omnisearch/omnisearch.component'

import { RemovalRoutingModule } from './removal-routing.module';
import { SharedModule } from '../shared/shared.module';

/**
 * Declares routes and component concerning invasive species eradication instructions
 */
@NgModule({
  imports: [
    CommonModule,
    RemovalRoutingModule,
    SharedModule
  ],
  declarations: [RemovalComponent],
})
export class RemovalModule { }