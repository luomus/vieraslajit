import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxonComponent } from './taxon.component';

import { routing } from './taxon.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [TaxonComponent]
})
export class TaxonModule { }
