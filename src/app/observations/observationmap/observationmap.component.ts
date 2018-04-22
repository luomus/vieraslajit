import { Component, OnInit, Input } from '@angular/core';
import { ObservationService } from '../../shared/service/observation.service';
import { WarehouseQueryList } from '../../shared/model/Warehouse';
import { PagedResult } from '../../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'vrs-observationmap',
  templateUrl: './observationmap.component.html',
  styleUrls: ['./observationmap.component.scss']
})
export class ObservationmapComponent implements OnInit {
  @Input() id: string;

  private pageSize: string = "500";
  private observations: Array<any> = [];
  private mapData=[];

  constructor(private observationservice: ObservationService) { }

  ngOnInit() {
    this.update();
  }
  update(pageNumber:string="1"){
    this.observationservice.getAllObservations(this.pageSize,pageNumber).subscribe(data => {
      this.observations = data.results;
   
    });
  }


}
