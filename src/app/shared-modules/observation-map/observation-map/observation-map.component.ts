import { Component, OnInit, Input } from '@angular/core';
import { ObservationService } from '../../../shared/service/observation.service';
import { WarehouseQueryList } from '../../../shared/model/Warehouse';
import { PagedResult } from '../../../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';

var LajiMap = require("laji-map").default;

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements OnInit{

  /* Used to populate the map with observations*/
  @Input() id: string;

  private idArray: Array<string>=[];
  private maxObservations: string = "200";
  private observations: Array<any> = [];

  /* LajiMap */
  private map;
  private mapData=[];

  constructor(private observationService: ObservationService) { }

  ngOnInit() {
    this.idArray.push(this.id);
    if (this.id) {
      this.populateObservationsById(this.idArray, this.maxObservations,()=>{
        this.setMapData();
        this.initializeMap();
      });
    } else if (true) {
      this.populateObservationsByAll(this.maxObservations, ()=>{
        this.setMapData();
        this.initializeMap();
      });
    } /*else {
      this.setMapData();
      this.initializeMap();
    }*/
  }

  populateObservationsByAll(max, callback) {
    this.observationService.getAllObservations(max, "1").subscribe(data => {
      this.observations= data.results;
      callback();
    });
  }

  populateObservationsById(idArray, max, callback) {
    this.observationService.getObservationsById(idArray, max, "1").subscribe(data => {
      this.observations= data.results;
      callback();
    });
  }

  setMapData() {

    let coordinates = [];
    let municipality= "";
    let date= "";
    let isReliable: boolean = false;
    let notes="";

    this.observations
      .forEach((observation) => {
        if(observation.gathering.conversions) {
          coordinates = [
            observation.gathering.conversions.wgs84CenterPoint.lon,
            observation.gathering.conversions.wgs84CenterPoint.lat
          ]
          municipality = observation.gathering.interpretations.municipalityDisplayname;
          date = observation.gathering.displayDateTime;
          notes = observation.unit.notes || "";
          isReliable = observation.unit.recordBasis !== "HUMAN_OBSERVATION_UNSPECIFIED";

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
        let opacity = 0.2 * (1 / ((new Date()).getFullYear() - parseInt(date.substring(0, 4))));
        let fillColor = "#f89525";
        let fillOpacity = opacity * 2;

        if (isReliable) {
          color = "#41967b";
          fillColor = "#41967b";
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
    this.map = new LajiMap(this.mapOptions());
    console.log(this.map);
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
