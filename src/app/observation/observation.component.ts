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
  map;

  constructor(
    private observationService: ObservationService,
    public translate: TranslateService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    this.initializeMap();
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
      data: this.getMapData()
    };
    return options;
  }

  getMapData() {
    const observations=this.queryObservations();
    let coordinates = [];

    if (observations){
      
      //let coordinates = [];      
      observations.map(observation => {
        console.log(observation.gathering.conversions.wgs84CenterPoint.lon);
        //coordinates.push(observation.gathering.conversions.wgs84CenterPoint.lon);
        //coordinates.push(observation.gathering.conversions.wgs84CenterPoint.lat);
        coordinates = [
          observation.gathering.conversions.wgs84CenterPoint.lon,
          observation.gathering.conversions.wgs84CenterPoint.lat
        ]
        
      })
      console.log(coordinates);
      const dataObject= this.featuresToFeatureCollection(this.coordinatesToFeatures(coordinates));
      //console.log(dataObject);
      let dataArray = [];
      dataArray.push(dataObject);
      return dataArray;  
    }
  }

  coordinatesToFeatures (coordinates){
    const features = [];
    features.push(
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': coordinates
        }
    })
    return features;
  }
  
  featuresToFeatureCollection(features){
    const dataObject= {
    featureCollection: {
      'type': 'FeatureCollection',
      'features': features
    }
    }
    return dataObject;
  }

  queryObservations() {
    let observations=[];
    this.observationService.getObservationsById(this.idArray, this.pageSize).subscribe(data => {
      observations= data.results;
    });
    return observations;
  }   
  
}
 