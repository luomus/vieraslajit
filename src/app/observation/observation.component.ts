import { Component, OnInit, Input } from '@angular/core';
import { ObservationService } from '../shared/service/observation.service';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnInit {

  @Input() id: string;
  private idArray: Array<string> = [];
  private observations: Array<WarehouseQueryList> = [];

  constructor(private observationService: ObservationService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    this.update();
  }

  update() {
    this.observationService.getObservationsById(this.idArray).subscribe(data => {
      this.observations= data.results;
    });  
  }



}
