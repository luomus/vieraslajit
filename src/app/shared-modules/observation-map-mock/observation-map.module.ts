import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationMapComponent } from './observation-map/observation-map.component';
import { MapLegendComponent } from './observation-map/legend/map-legend.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ObservationMapComponent,
    MapLegendComponent
  ],
  exports: [
    ObservationMapComponent,
    MapLegendComponent
  ]
})
export class ObservationMapModule { }
