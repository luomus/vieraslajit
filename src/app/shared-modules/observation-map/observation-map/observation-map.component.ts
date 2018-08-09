import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ObservationService } from '../../../shared/service/observation.service';
import { WarehouseQueryList } from '../../../shared/model/Warehouse';
import { PagedResult } from '../../../shared/model/PagedResult';
import { Subscription ,  Subscriber } from 'rxjs';
import { UserService, Role } from '../../../shared/service/user.service';
import * as G from 'geojson';

import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';

import * as LM from 'laji-map';
import LajiMap, { LajiMapOptions, TileLayerName, DataOptions, Data } from 'laji-map/lib/map';
import { LatLngExpression, PathOptions } from 'leaflet';
import { ObsMapOptions, ObsMapOption } from './ObsMapOptions';
import { ObsMapObservations } from './ObsMapObservations';
import { MapApiController } from './MapApiController';
import { MapController } from './MapController';

var _municipalities = require('./municipalities.json');

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements AfterViewInit{
  @Input() id?: string;
  @Input() list?: boolean = false;
  @Input() mapHeight?: number = 400;

  /* Used to populate the map with observations*/
  private idArray: Array<string>=[];
  private maxObservations: string = "200";
  private observations: Array<any> = [];
  private filteredObservations: Array<any> = [];

  /* LajiMap */
  private map:LajiMap;

  /* Map options */
  private mapCenter: LatLngExpression;
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

  constructor(private observationService: ObservationService, private translate: TranslateService, private obsMapOptions:ObsMapOptions,
    private obsMapObservations:ObsMapObservations, private mapApiController:MapApiController, private mapController:MapController) {

    /* Initialize MapOptions */
    this.obsMapOptions.setOptions([
      [<ObsMapOption>"id", this.id],
      [<ObsMapOption>"list", this.list],
      [<ObsMapOption>"mapHeight", this.mapHeight]
    ]);
  }

  ngAfterViewInit() {
    this.mapApiController.initialize();
    this.mapController.initializeMap(document.getElementById("map"));

    /* this.restartMap();

    // jQuery
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
      this.mapCenter = [
        65.2,
        27
      ]
      this.zoom = 1.4;
      this.renderMap();
    }); */
  }

/*   restartMap() {
    this.observations=[];
    this.idArray=[];
    this.idArray.push(this.id);

    if (this.id) {
      this.startIdMap();
    } else {
      this.startAllMap();
    }
  } */
/* 
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
  } */

 /*  populateObservationsByAll(max, callback) {
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

  getMapData():Data[] {
    let mapData=[];
    // Add observations map data
    this.filteredObservations
      .forEach((observation) => {
        // Use only data points with coordinates
        if(observation.gathering.conversions) {
          let name = observation.taxonVerbatim;
          let municipality = observation.gathering.interpretations.municipalityDisplayname || "N/A";
          let date = observation.gathering.displayDateTime;
          let notes = observation.unit.notes || "";
          
          let o: DataOptions = {
            featureCollection: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: this.adminMode?
                    [observation.gathering.conversions.wgs84CenterPoint.lon,
                      observation.gathering.conversions.wgs84CenterPoint.lat]:
                    [this.randomizeCoordinates(observation.gathering.conversions.wgs84CenterPoint.lon),
                      this.randomizeCoordinates(observation.gathering.conversions.wgs84CenterPoint.lat)],
                    radius: this.adminMode?10:3000
                  },
                  properties: {}
                }
              ]
            },
            getFeatureStyle: ():PathOptions=>{
              let opacity = Math.max(1 / ((new Date()).getFullYear() - parseInt(date.substring(0, 4)) + 2), 0.1);
              return {
                opacity: opacity,
                fillOpacity: 0.9 * opacity,
                color: "#f89525",
                fillColor: "#f89525",
                weight: 3
              };
            },
            getPopup: ():string=>{
              return name.charAt(0).toUpperCase() + name.substr(1) + " | " + date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4) + " | " + municipality + " <br> " + notes;
            }
          }
          mapData.push(o);
        }
      });
      return mapData;
  }

  randomizeCoordinates(coord){
    let accuracy = 0.01;
    return coord + (Math.random() * (accuracy - (-accuracy)) ) + (-accuracy);
  } */

  updateList() {
    this.filteredObservations.forEach(observationObject => {
      observationObject.taxonVerbatim = observationObject.unit.taxonVerbatim;
      observationObject.team = observationObject.gathering.team;
      observationObject.scientificName = observationObject.unit.linkings.taxon.scientificName;
      observationObject.municipalityDisplayname = observationObject.gathering.interpretations ? observationObject.gathering.interpretations.municipalityDisplayname : "N/A";
      observationObject.displayDateTime = observationObject.gathering.displayDateTime;
    });
  }

/*   renderMap() {
    $("#map").children().remove();
    this.map = new LM.default(this.mapOptions());
  }

  mapOptions(): LajiMapOptions{
    const options: LajiMapOptions = {
      rootElem: document.getElementById("map"),
      popupOnHover: false,
      center: this.mapCenter,
      zoom: this.zoom,
      zoomToData : this.zoomToData,
      tileLayerName: <TileLayerName>"openStreetMap",
      data: this.getMapData()
    };
    return options;
  } */

  onTableActivate(e) {
    /* if(e.type == "click"){
      this.selectedInfo = {
        "taxonVerbatim": e.row.unit.taxonVerbatim,
        "team": e.row.gathering.team,
        "scientificName": e.row.unit.linkings.taxon.scientificName,
        "municipalityDisplayname": e.row.gathering.interpretations ? e.row.gathering.interpretations.municipalityDisplayname : "N/A",
        "displayDateTime": e.row.gathering.displayDateTime,
        "id": e.row.unit.linkings.taxon.qname.substring(14,e.row.unit.linkings.taxon.qname.length)
      }

      this.mapCenter = [
        this.randomizeCoordinates(e.row.gathering.conversions.wgs84CenterPoint.lat),
        this.randomizeCoordinates(e.row.gathering.conversions.wgs84CenterPoint.lon) 
      ];
      // Zoom more if viewing a specific municipality
      if($('#select-municipality').val() != "all") {
        this.zoom = 10;
      } else {
        this.zoom = 7;
      }
      this.renderMap();
    } */
  }

  test() {
    /* this.filteredObservations = [];
    this.map.setData(this.getMapData()); */
    this.map.setCenter([
      65.2,
      27
    ])
    this.map.zoom = 10;
  }
}
