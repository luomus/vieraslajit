import { Component } from '@angular/core';
import { StateService } from '../../state.service';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent {
  constructor(private state: StateService) {
    state.footerEnabled = false;
  }
}
