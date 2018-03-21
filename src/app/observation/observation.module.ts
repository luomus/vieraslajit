import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationComponent } from './observation.component';
import { ObservationMapComponent } from './map/observation-map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ObservationComponent, ObservationMapComponent]
})
export class ObservationModule { }
