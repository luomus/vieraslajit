import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ObservationMapComponent
  ],
  exports: [
    ObservationMapComponent
  ]
})
export class ObservationMapModule { }
