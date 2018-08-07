import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { TaxonSearchComponent } from './observation-map/taxon-search/taxon-search.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule
  ],
  declarations: [
    ObservationMapComponent,
    TaxonSearchComponent
  ],
  exports: [
    ObservationMapComponent
  ]
})
export class ObservationMapModule { }
