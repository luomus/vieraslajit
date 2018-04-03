import { Component, OnInit, Input } from '@angular/core';
import { ObservationService } from '../shared/service/observation.service';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-observation',
  templateUrl: './observation.component.html',
  styleUrls: ['./observation.component.scss']
})

export class ObservationComponent implements OnInit {
  @Input() id: string;
  private idArray: Array<string> = [];
  observations: Array<WarehouseQueryList> = [];
  private pageSize: string;
  private mapObservations;

  constructor(
    private observationService: ObservationService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    this.pageSize= "10000";
    this.update();
    this.initializeMap();
  }

  initializeMap() {
    const options = {
      rootElem: document.getElementById("map"),
      lang: this.translate.currentLang,
      popupOnHover: false,
      center: {
        "lat": 65.5,
        "lng": 27
      },
      zoom: 1,
      tileLayerName: "openStreetMap", 
      controls: {
        coordinates: true,
    	},
    };

    var LajiMap = require("laji-map").default;
    this.mapObservations = new LajiMap(options);
  }

  update() {
    this.observationService.getObservationsById(this.idArray, this.pageSize).subscribe(data => {
      this.observations= data.results;
    });
  }

}
