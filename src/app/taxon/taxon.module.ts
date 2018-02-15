import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';

import { routing } from './taxon.routing';
import { SharedModule } from '../shared/shared.module';
import { TaxonGridComponent } from './taxon-grid/taxon-grid.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    SharedModule
  ],
  declarations: [TaxonListComponent, TaxonCardComponent, TaxonGridComponent]
})
export class TaxonModule { }
