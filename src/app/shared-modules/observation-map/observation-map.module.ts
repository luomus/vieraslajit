import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { ObsMapListComponent } from './observation-map/obs-map-list/obs-map-list.component';
import { MapApiService } from './observation-map/services/MapApiService';
import { MapService } from './observation-map/services/MapService';
import { ObsMapOptions } from './observation-map/services/data/ObsMapOptions';
import { ObsMapData } from './observation-map/services/data/ObsMapData';
import { SpinnerModule } from '../spinner/spinner.module';
import { YkjService } from './observation-map/import-from-laji-front/ykj.service';
import { ObservationModalComponent } from './observation-map/observation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateModule } from '@ngx-translate/core';
import { ObservationMapPopupComponent } from './observation-map/observation-map-popup.component';
import { TimeSelectorComponent } from './observation-map/time-selector/time-selector.component';
import { SharedModule } from '../../shared/shared.module';
import { FilterMenuComponent } from './observation-map/filter-menu/filter-menu.component';
import { TaxonSearchModule } from '../taxon-search/taxon-search.module';
import { MapLegendComponent } from './observation-map/legend/map-legend.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule,
    SpinnerModule,
    ModalModule,
    TranslateModule,
    SharedModule,
    TaxonSearchModule
  ],
  declarations: [
    ObservationMapComponent,
    ObsMapListComponent,
    ObservationModalComponent,
    ObservationMapPopupComponent,
    TimeSelectorComponent,
    FilterMenuComponent,
    MapLegendComponent
  ],
  providers: [
    MapApiService,
    MapService,
    ObsMapOptions,
    ObsMapData,
    YkjService
  ],
  exports: [
    ObservationMapComponent,
    MapLegendComponent
  ]
})
export class ObservationMapModule { }
