import { Component, Input } from '@angular/core';

@Component({
  selector: 'vrs-observation-map',
  template: ''
})

export class ObservationMapComponent {
  @Input() id?: string;
  @Input() listMenuEnabled?: boolean = false;
  @Input() filterMenuEnabled?: boolean = false;

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