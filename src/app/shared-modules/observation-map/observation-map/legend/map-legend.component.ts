import { Component, Input } from '@angular/core';

@Component({
  selector: 'vrs-map-legend',
  templateUrl: './map-legend.component.html',
  styleUrls: ['./map-legend.component.scss']
})

export class MapLegendComponent {
  @Input() isAggregateMode = true;
}
