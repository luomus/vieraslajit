import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationsRoutingModule } from './observations-routing.module';
import { ObservationlistComponent } from './observationlist/observationlist.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../shared/api/api.service';
import {ObservationService} from '../shared/service/observation.service'
import { AllobservationsComponent } from './allobservations/allobservations.component';
import { AccordionModule, CollapseModule, TabsModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ObservationmapComponent } from './observationmap/observationmap.component';
import { ObservationModule } from '../observation/observation.module';


@NgModule({
  imports: [
    CommonModule,
    ObservationsRoutingModule,
    SharedModule,
    NgxDatatableModule,
    TabsModule.forRoot(),
    AccordionModule,
    CollapseModule,
    PaginationModule.forRoot(),
    TabsModule,
    FormsModule,
    ObservationModule
  ],
  declarations: [ObservationlistComponent, AllobservationsComponent, ObservationmapComponent],
  providers:[ApiService,ObservationService]
})
export class ObservationsModule { }
