import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ObservationsRoutingModule } from './observations-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../shared/api/api.service';
import {ObservationService} from '../shared/service/observation.service';
import { AccordionModule, CollapseModule, TabsModule,AlertModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ObservationsComponent } from './observations.component';
import { ObservationMapModule } from '../shared-modules/observation-map/observation-map.module';



@NgModule({
  imports: [
    CommonModule,
    ObservationsRoutingModule,
    ObservationMapModule
  ],
  declarations: [ObservationsComponent],
  providers:[]
})
export class ObservationsModule { }
