import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../shared/service/observation.service';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})
export class ObservationComponent implements OnInit {

  private subTrans: Subscription;
  private data: PagedResult<WarehouseQueryList>;
  private observations: Array<WarehouseQueryList> = [];


  private testId: Array<string> = [];

  constructor(private observationService: ObservationService, private translate: TranslateService) { }

  ngOnInit() {
    this.testId.push("MX.52996");
    this.update();
  }

  update() {
    this.observationService.getObservationsById(this.testId).subscribe(data => {
      this.data = data;
      this.observations= data.results;
    });  
  } 


}
