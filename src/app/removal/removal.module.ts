import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemovalComponent } from './removal.component';
import { OmnisearchComponent } from '../shared/omnisearch/omnisearch.component'

import { routing } from './removal.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [RemovalComponent],
})
export class RemovalModule { }