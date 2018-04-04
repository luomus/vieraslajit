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
  private idArray: Array<string>=[];
  private pageSize: string = "1000";
  private map
  observations: Array<any> = [];
  private mapData=[];
  private features = [];

  constructor(
    private observationService: ObservationService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    this.update();
  }

  update() {
    this.observationService.getObservationsById(this.idArray, this.pageSize).subscribe(data => {
      this.observations= data.results;
      this.setMapData();
      this.initializeMap();
    });
  }

  setMapData() {
    let coordinates = [];
    console.log(this.observations);

    this.observations
      .forEach((observationObject) => {
        console.log(JSON.parse(JSON.stringify(observationObject)));
        coordinates = [
          observationObject.gathering.conversions.wgs84CenterPoint.lon,
          observationObject.gathering.conversions.wgs84CenterPoint.lat
        ]
        this.setFeatures(coordinates);
        const dataObject= this.returnFeatureCollection(this.features);
        this.mapData.push(dataObject);
      });
  }

  setFeatures (coordinates){
    this.features.push(
      {
        'type': 'Feature',
        "properties": {},
        'geometry': {
          'type': 'Point',
          'coordinates': coordinates,
          "radius": 5000
        }
    })
  }
  
  returnFeatureCollection(features){
    const dataObject= {
    featureCollection: {
      'type': 'FeatureCollection',
      'features': features
    }
    }
    return dataObject;
  }

  initializeMap() {       
    var LajiMap = require("laji-map").default;
    this.map = new LajiMap(this.mapOptions());
  }

  mapOptions(){
    const options = {
      rootElem: document.getElementById("map"),
      lang: this.translate.currentLang,
      popupOnHover: false,
      /*center: {
        "lat": 65.5,
        "lng": 27
      },*/
      zoom: 1,
      zoomToData : true,
      tileLayerName: "openStreetMap", 
      controls: {  
      },
      data: this.mapData
    };
    return options;
  }

     
  
}
 