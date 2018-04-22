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

  private idArray: Array<string>=[];
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
  setMapData() {

    let coordinates = [];
    let municipality= "";
    let date= "";

    this.observations
      .forEach((observationObject) => {
        coordinates = [
          observationObject.gathering.conversions.wgs84CenterPoint.lon,
          observationObject.gathering.conversions.wgs84CenterPoint.lat
        ]
        municipality = observationObject.gathering.interpretations.municipalityDisplayname;
        date = observationObject.gathering.displayDateTime;

        const dataObject= this.returnFeatureCollectionAndPopup(this.returnFeatures(coordinates),municipality,date);
        this.mapData.push(dataObject);
      });
  }

  returnFeatures (coordinates:Array<any>){
    let features = [];
    features.push(
      {
        'type': 'Feature',
        "properties": {},
        'geometry': {
          'type': 'Point',
          'coordinates': coordinates,
          "radius": 5000
        }
    })
    return features;
  }
  
  returnFeatureCollectionAndPopup(features:Array<any>,municipality:string, date:string){
    const dataObject= {
      featureCollection: {
        'type': 'FeatureCollection',
        'features': features
      },
      getPopup(){
        return municipality+ ", "+date;
      }
    }
    return dataObject;
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
      },
      data: this.mapData
    };
    return options;
  }


}
