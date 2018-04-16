import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationsRoutingModule } from './observations-routing.module';
import { ObservationlistComponent } from './observationlist/observationlist.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../shared/api/api.service';
import {ObservationService} from '../shared/service/observation.service'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AllobservationsComponent } from './allobservations/allobservations.component';

@NgModule({
  imports: [
    CommonModule,
    ObservationsRoutingModule,
    SharedModule,
    NgxDatatableModule,
    TabsModule.forRoot()
  ],
  declarations: [ObservationlistComponent, AllobservationsComponent],
  providers:[ApiService,ObservationService]
})
export class ObservationsModule { }
