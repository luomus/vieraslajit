import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { TaxonSearchComponent } from './observation-map/taxon-search/taxon-search.component';
import { ObsMapListComponent } from './observation-map/obs-map-list/obs-map-list';
import { MapApiController } from './observation-map/structures/controllers/MapApiController';
import { MapController } from './observation-map/structures/controllers/MapController';
import { ObsMapOptions } from './observation-map/structures/data/ObsMapOptions';
import { ObsMapObservations } from './observation-map/structures/data/ObsMapObservations';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule
  ],
  declarations: [
    ObservationMapComponent,
    TaxonSearchComponent,
    ObsMapListComponent
  ],
  providers: [
    MapApiController,
    MapController,
    ObsMapOptions,
    ObsMapObservations
  ],
  exports: [
    ObservationMapComponent
  ]
})
export class ObservationMapModule { }
