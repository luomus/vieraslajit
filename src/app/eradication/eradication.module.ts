import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EradicationComponent } from './eradication.component';
import { OmnisearchComponent } from '../shared/omnisearch/omnisearch.component'

import { EradicationRoutingModule } from './eradication-routing.module';
import { SharedModule } from '../shared/shared.module';

/**
 * Declares routes and component concerning invasive species eradication instructions
 */
@NgModule({
  imports: [
    CommonModule,
    EradicationRoutingModule,
    SharedModule
  ],
  declarations: [EradicationComponent],
})
export class RemovalModule { }