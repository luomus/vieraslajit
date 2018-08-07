import { Component, OnInit, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ObservationService } from '../../../shared/service/observation.service';
import { WarehouseQueryList } from '../../../shared/model/Warehouse';
import { PagedResult } from '../../../shared/model/PagedResult';
import { Subscription } from 'rxjs/Subscription';
import { UserService, Role } from '../../../shared/service/user.service';

import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { Subscriber } from 'rxjs';

var _municipalities = require('./municipalities.json');

var LajiMap = require("laji-map").default;

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements OnInit{
  @Input() id?: string;
  @Input() list?: boolean = false;
  @Input() mapHeight?: number = 400;

  /* Used to populate the map with observations*/
  private idArray: Array<string>=[];
  private maxObservations: string = "200";
  private observations: Array<any> = [];
  private filteredObservations: Array<any> = [];

  /* LajiMap */
  private map;
  private mapData=[];

  private mapCenter: object;
  private zoom: number;
  private zoomToData: boolean;

  /* ListMode */
  columns = [];
  selectedInfo;

  /* Filters */
  private observationsInSelectedMun: Array<any> = [];
  private adminMode = false;
  private ownOnly = false;
  municipalities = _municipalities;
  isAdmin = UserService.hasRole(Role.CMS_ADMIN);
  isLoggedIn = UserService.loggedIn();

  constructor(private observationService: ObservationService, private translate: TranslateService) {
    this.columns = [
      { prop: 'taxonVerbatim', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
      { prop: 'municipalityDisplayname', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
      { prop: 'displayDateTime', name: this.translate.instant('observation.datetime'), draggable: false, resizeable: false }
    ];
    this.mapCenter = {
      "lat": 65.2,
      "lng": 27
    }
    this.zoom = 1.4;
    this.zoomToData = false;
  }

  ngOnInit() {
    
    this.restartMap();

    /* jQuery */
    $('#select-municipality').change(() => {
      this.observationsInSelectedMun=[];
      this.observations.forEach((observation)=>{
        if((observation.gathering.interpretations && observation.gathering.interpretations.municipalityDisplayname == $('#select-municipality').val()) || $('#select-municipality').val()=="all"){
          this.observationsInSelectedMun.push(observation);
        };
      });
      // temporarily declare filtered observations as all the observations in the muncipality that was chosen
      // in the future this will change with additional filters
      this.filteredObservations = this.observationsInSelectedMun;
      if(this.filteredObservations.length > 0) {this.zoomToData=true} else {
        this.zoomToData = false;
      }
      this.mapCenter = {
        "lat": 65.2,
        "lng": 27
      }
      this.zoom = 1.4;
      this.renderMap();
    });
  }

  restartMap() {
    this.observations=[];
    this.idArray=[];
    this.idArray.push(this.id);

    if (this.id) {
      this.startIdMap();
    } else {
      this.startAllMap();
    }
  }

  startIdMap() {
    this.populateObservationsById(this.idArray, this.maxObservations,()=>{
      this.filteredObservations = this.observations;
      if(this.list) this.updateList();
      this.renderMap();
    });
  }

  startAllMap() {
    if (this.ownOnly) {
      this.populateObservationsByPerson(UserService.getToken(), this.maxObservations, ()=>{
        this.filteredObservations = this.observations;
        if(this.list) this.updateList();
        this.renderMap();
      });
    } else {
    this.populateObservationsByAll(this.maxObservations, ()=>{
      this.filteredObservations = this.observations;
      if(this.list) this.updateList();
      this.renderMap();
    });
    }
  }

  populateObservationsByAll(max, callback) {
    this.observationService.getAllObservations(max, "1").subscribe(data => {
      this.observations= data.results;
      callback();
    });
  }

  populateObservationsById(idArray, max, callback) {
    let token;
    if(this.ownOnly) {
      token = UserService.getToken();
    }
    this.observationService.getObservationsById(idArray, max, "1", token).subscribe(data => {
      this.observations= data.results;
      callback();
    });
  }

  populateObservationsByPerson(token, max, callback) {
    this.observationService.getObservationsbyPersonToken(max, "1", token).subscribe(data => {
      this.observations= data.results;
      callback();
    });
  }

  generateMapData() {
    const _adminMode = this.adminMode;
    this.mapData=[];
    let coordinates = [];
    let municipality= "";
    let date= "";
    let isReliable: boolean = false;
    let notes="";

    this.filteredObservations
      .forEach((observation) => {
        if(observation.gathering.conversions) {
          if(_adminMode) {
            coordinates = [
              observation.gathering.conversions.wgs84CenterPoint.lon,
              observation.gathering.conversions.wgs84CenterPoint.lat
            ]
          } else {
            // client side randomization of coordinates for privacy reasons (not safe! Todo: client side randomization)
            let accuracy = 0.01;
            coordinates = [ this.randomizeCoordinates(observation.gathering.conversions.wgs84CenterPoint.lon), this.randomizeCoordinates(observation.gathering.conversions.wgs84CenterPoint.lat)];
          }
          municipality = observation.gathering.interpretations.municipalityDisplayname || "N/A";
          date = observation.gathering.displayDateTime;
          notes = observation.unit.notes || "";
          isReliable = observation.unit.recordBasis !== "HUMAN_OBSERVATION_UNSPECIFIED";
          const dataObject= this.returnFeatureCollectionAndPopup(observation.taxonVerbatim, this.returnFeatures(coordinates), municipality, date, notes, isReliable);
          this.mapData.push(dataObject);
        }
      });
  }

  randomizeCoordinates(coord){
    let accuracy = 0.01;
    return coord + (Math.random() * (accuracy - (-accuracy)) ) + (-accuracy);
  }

  returnFeatures (coordinates:Array<any>){
    let features = [];
    let rad = 3000;
    if(this.adminMode) {
      rad = 10;
    }
    features.push(
      {
        'type': 'Feature',
        "properties": {},
        'geometry': {
          'type': 'Point',
          'coordinates': coordinates,
          "radius": rad
        }
    })
    return features;
  }

  returnFeatureCollectionAndPopup(name:string, features:Array<any>,municipality:string, date:string, notes:string, isReliable:boolean){
    const _adminMode = this.adminMode;
    const dataObject= {
      featureCollection: {
        'type': 'FeatureCollection',
        'features': features
      },

      getFeatureStyle() {
        let color = "#f89525";
        let opacity = Math.max(1 / ((new Date()).getFullYear() - parseInt(date.substring(0, 4)) + 2), 0.1);
        let fillColor = color;
        let fillOpacity = opacity * 0.9;
        if(_adminMode) { opacity=1; fillOpacity=1; color="red"; fillColor="red"}

        if (isReliable) { color = "#41967b"; fillColor = "#41967b"; }

        return {
                opacity: opacity,
                fillOpacity: fillOpacity,
                color: color,
                fillColor: fillColor,
                weight: 3
        }
      },

      getPopup(){
        return name.charAt(0).toUpperCase() + name.substr(1) + " | " + date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4) + " | " + municipality + " <br> " + notes;
      }
    }
    return dataObject;
  }

  updateList() {
    this.filteredObservations.forEach(observationObject => {
      observationObject.taxonVerbatim = observationObject.unit.taxonVerbatim;
      observationObject.team = observationObject.gathering.team;
      observationObject.scientificName = observationObject.unit.linkings.taxon.scientificName;
      observationObject.municipalityDisplayname = observationObject.gathering.interpretations ? observationObject.gathering.interpretations.municipalityDisplayname : "N/A";
      observationObject.displayDateTime = observationObject.gathering.displayDateTime;
    });
  }

  /*  Re-loads the entire map
      Currently used for everything, since laji-map lacks support for updating the map */
  renderMap() {
    this.generateMapData();
    $("#map").children().remove();
    this.map = new LajiMap(this.mapOptions());
  }

  mapOptions(){
    const options = {
      rootElem: document.getElementById("map"),
      popupOnHover: false,
      center: this.mapCenter,
      zoom: this.zoom,
      zoomToData : this.zoomToData,
      tileLayerName: "openStreetMap",
      controls: {
      },
      data: this.mapData
    };
    return options;
  }

  onTableActivate(e) {
    if(e.type == "click"){
      console.log(e);
      this.selectedInfo = {
        "taxonVerbatim": e.row.unit.taxonVerbatim,
        "team": e.row.gathering.team,
        "scientificName": e.row.unit.linkings.taxon.scientificName,
        "municipalityDisplayname": e.row.gathering.interpretations ? e.row.gathering.interpretations.municipalityDisplayname : "N/A",
        "displayDateTime": e.row.gathering.displayDateTime,
        "id": e.row.unit.linkings.taxon.qname.substring(14,e.row.unit.linkings.taxon.qname.length)
      }

      this.mapCenter = {
        "lat": this.randomizeCoordinates(e.row.gathering.conversions.wgs84CenterPoint.lat),
        "lng": this.randomizeCoordinates(e.row.gathering.conversions.wgs84CenterPoint.lon) 
      };
      /* Zoom more if viewing a specific municipality */
      if($('#select-municipality').val() != "all") {
        this.zoom = 10;
      } else {
        this.zoom = 7;
      }
      this.renderMap();
    }
  }

  submitId() {
    this.id = $("#enter-id").val().toString();
    this.restartMap();
  }
}
