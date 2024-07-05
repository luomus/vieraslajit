import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker'
import { RouterModule } from '@angular/router';
import { ObsMapListComponent } from './observation-map/obs-map-list/obs-map-list.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { defineLocale, fiLocale } from 'ngx-bootstrap/chronos';
defineLocale('fi', fiLocale);

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule,
    SpinnerModule,
    ModalModule,
    TranslateModule,
    SharedModule,
    TaxonSearchModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
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
    YkjService
  ],
  exports: [
    ObservationMapComponent,
    MapLegendComponent
  ]
})
export class ObservationMapModule {
  constructor(private bsLocaleService: BsLocaleService){
    this.bsLocaleService.use('fi');
  }
}
