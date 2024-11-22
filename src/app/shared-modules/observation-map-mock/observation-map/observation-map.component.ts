import { Component, Input } from '@angular/core';

export type DataDisplayMode = 'aggregate' | 'observation';

@Component({
  selector: 'vrs-observation-map',
  template: ''
})
export class ObservationMapComponent {
  @Input() id?: string;
  @Input() listMenuEnabled?: boolean = false;
  @Input() filterMenuEnabled?: boolean = false;
  @Input() controls: boolean = false;
  @Input() showLegend?: boolean = true;

  @Input() mapHeight: number = 400;

  constructor() {}

  onSelectMunicipality(event: any) {
  }

  updateQueryParam(param, value) {
  }

  onOwnModeChange(e) {
  }

  isAggregateMap() {
  }

  getObservationCount() {
  }

  onTableActivate(e) {
  }

  onFiListCheckbox(e) {
  }

  onEuListCheckbox(e) {
  }

  onPlantPestCheckbox(e) {
  }

  onQueryParamWithCheckboxChange(param:string, checkboxId:string, selectorEnabled:boolean, option:any, optionValue:any) {
  }

  onTimeChange(event) {
  }
}
