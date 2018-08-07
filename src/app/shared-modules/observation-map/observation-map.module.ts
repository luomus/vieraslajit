import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule
  ],
  declarations: [
    ObservationMapComponent
  ],
  exports: [
    ObservationMapComponent
  ]
})
export class ObservationMapModule { }
