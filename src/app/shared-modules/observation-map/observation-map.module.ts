import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { TaxonSearchComponent } from './observation-map/taxon-search/taxon-search.component';
import { ObsMapListComponent } from './observation-map/obs-map-list/obs-map-list';
import { MapApiService } from './observation-map/services/MapApiService';
import { MapService } from './observation-map/services/MapService';
import { ObsMapOptions } from './observation-map/services/data/ObsMapOptions';
import { ObsMapObservations } from './observation-map/services/data/ObsMapObservations';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule,
    SpinnerModule
  ],
  declarations: [
    ObservationMapComponent,
    TaxonSearchComponent,
    ObsMapListComponent
  ],
  providers: [
    MapApiService,
    MapService,
    ObsMapOptions,
    ObsMapObservations
  ],
  exports: [
    ObservationMapComponent
  ]
})
export class ObservationMapModule { }
