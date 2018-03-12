import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule, CollapseModule } from 'ngx-bootstrap';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';

import { routing } from './taxon.routing';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxonComparisonComponent } from './taxon-comparison/taxon-comparison.component';


@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    AccordionModule,
    CollapseModule
  ],
  declarations: [TaxonListComponent, TaxonCardComponent, TaxonComparisonComponent]
})
export class TaxonModule { }
