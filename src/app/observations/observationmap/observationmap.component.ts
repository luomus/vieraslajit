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
  id: string;
  private pageSize: string = "500";
  private observations: Array<any> = [];
  private mapData=[];
  
  constructor(private observationservice: ObservationService) { }

  ngOnInit() {
    this.initializeMap();
    this.update();
  }

  update(){
   
  }

  initializeMap() {       
    var LajiMap = require("laji-map").default;
    var map = new LajiMap(this.mapOptions());
  }

  mapOptions(){
    const options = {
      rootElem: document.getElementById("map"),
      popupOnHover: false,
      center: {
        "lat": 65.5,
        "lng": 27
      },
      zoom: 1,
      zoomToData : false,
      tileLayerName: "openStreetMap", 
      controls: {  
      }
    };
    return options;
  }


}
