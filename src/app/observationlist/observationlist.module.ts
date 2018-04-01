import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationlistRoutingModule } from './observationlist-routing.module';
import { ObservationlistComponent } from './observationlist.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../shared/api/api.service';
import {ObservationService} from '../shared/service/observation.service'


@NgModule({
  imports: [
    CommonModule,
    ObservationlistRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [ObservationlistComponent],
  providers:[ApiService,ObservationService]
})
export class ObservationlistModule { }
