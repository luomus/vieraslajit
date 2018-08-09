import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { TaxonSearchComponent } from './observation-map/taxon-search/taxon-search.component';
import { ObsMapList } from './observation-map/obs-map-list/obs-map-list';
import { ObsMapObservations } from './observation-map/ObsMapObservations';
import { ObsMapOptions } from './observation-map/ObsMapOptions';
import { MapApiController } from './observation-map/MapApiController';
import { MapController } from './observation-map/MapController';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule
  ],
  declarations: [
    ObservationMapComponent,
    TaxonSearchComponent,
    ObsMapList
  ],
  providers: [
    ObsMapOptions,
    ObsMapObservations,
    MapController,
    MapApiController
  ],
  exports: [
    ObservationMapComponent
  ]
})
export class ObservationMapModule { }
