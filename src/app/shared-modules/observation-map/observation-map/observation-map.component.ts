import { Component, OnInit, Input } from '@angular/core';
import { ObservationService } from '../../../shared/service/observation.service';
import { WarehouseQueryList } from '../../../shared/model/Warehouse';
import { PagedResult } from '../../../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements OnInit{
  @Input() id: string;

  private idArray: Array<string>=[];
  private pageSize: string = "200";
  private observations: Array<any> = [];
  private mapData=[];

  constructor(private observationService: ObservationService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    this.update();
  }

  update() {
    this.observationService.getObservationsById(this.idArray, this.pageSize, "1").subscribe(data => {
      this.observations= data.results;
      this.setMapData();
      this.initializeMap();
    });
  }

  setMapData() {

    let coordinates = [];
    let municipality= "";
    let date= "";
    let isReliable: boolean = false;
    let notes="";

    this.observations
      .forEach((observationObject) => {
        if(observationObject.gathering.conversions) {
          coordinates = [
            observationObject.gathering.conversions.wgs84CenterPoint.lon,
            observationObject.gathering.conversions.wgs84CenterPoint.lat
          ]
          municipality = observationObject.gathering.interpretations.municipalityDisplayname;
          date = observationObject.gathering.displayDateTime;
          notes = observationObject.unit.notes || "";
          isReliable = observationObject.unit.recordBasis !== "HUMAN_OBSERVATION_UNSPECIFIED";

          const dataObject= this.returnFeatureCollectionAndPopup(this.returnFeatures(coordinates), municipality, date, notes, isReliable);
          this.mapData.push(dataObject);
        }
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
          "radius": 50000
        }
    })
    return features;
  }

  returnFeatureCollectionAndPopup(features:Array<any>,municipality:string, date:string, notes:string, isReliable:boolean){
    const dataObject= {
      featureCollection: {
        'type': 'FeatureCollection',
        'features': features
      },

      getFeatureStyle() {
        let color = "#f89525";
        let opacity = 0.7;
        let fillColor = "#f89525";
        let fillOpacity = 0.3;

        if (isReliable) {
          color = "#41967b";
          fillColor = "#41967b";
        }
        if (date.substring(0, 4) <= "2008"){
          fillOpacity = 0.00;
        }
        if (date.substring(0, 4) == "2018"){
          opacity = 0.8;
          fillOpacity = 0.5;
        }

        return {
                opacity: opacity,
                fillOpacity: fillOpacity,
                color: color,
                fillColor: fillColor,
                weight: 3
        }
      },

      getPopup(){
        return date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4) + " " + municipality + "<br>" + notes;
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
        "lat": 65.2,
        "lng": 27
      },
      zoom: 1.4,
      zoomToData : false,
      tileLayerName: "openStreetMap",
      controls: {
      },
      data: this.mapData
    };
    return options;
  }

}
