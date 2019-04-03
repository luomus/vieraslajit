import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationsRoutingModule } from './observations-routing.module';
import { ObservationsComponent } from './observations.component';
import { ObservationMapModule } from '@observation-map/observation-map.module';



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
