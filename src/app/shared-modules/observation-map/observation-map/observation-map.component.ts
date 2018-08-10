import { Component, Input, AfterViewInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';

import { UserService, Role } from '../../../shared/service/user.service';
import { ObsMapOptions } from './structures/data/ObsMapOptions';
import { MapApiController } from './structures/controllers/MapApiController';
import { MapController } from './structures/controllers/MapController';
import { ObsMapListComponent } from './obs-map-list/obs-map-list';

let _municipalities = require('./municipalities.json');

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements AfterViewInit{
  @Input() id?: string;
  @Input() list?: boolean = false;
  @Input() mapHeight?: number = 400;

  @ViewChild(ObsMapListComponent)
  mapTaxonList : ObsMapListComponent

  private selectedInfo;

  private municipalities = _municipalities;

  /* Filters */
  private adminMode = false;
  private ownMode = false;
  private isAdmin = UserService.hasRole(Role.CMS_ADMIN);
  private isLoggedIn = UserService.loggedIn();

  constructor(private obsMapOptions:ObsMapOptions, private mapApiController:MapApiController, private mapController:MapController) {}

  ngAfterViewInit() {
    this.mapApiController.initialize();
    this.mapController.initializeMap(document.getElementById("map"));
    // Initialize mapOptions
    this.obsMapOptions.setOptions([
      ["id", this.id],
      ["list", this.list]
    ]);

    this.mapTaxonList.eventEmitter.addListener("change", (e)=>{
      this.onTableActivate(e);
    });

    // select municipality
    $('#select-municipality').change(() => {
      console.log($('#select-municipality').val());
      this.obsMapOptions.setOption("municipality", $('#select-municipality').val());
    });
  }

  adminModeChange() {
    this.obsMapOptions.setOption("adminMode", this.adminMode);
  }

  ownModeChange() {
    this.ownMode ? this.obsMapOptions.setOption("personToken", UserService.getToken()) : this.obsMapOptions.setOption("personToken", null);
  }

  onTableActivate(e) {
    if(e.type == "click"){
      this.selectedInfo = {
        "taxonVerbatim": e.row.unit.taxonVerbatim,
        "team": e.row.gathering.team,
        "scientificName": e.row.unit.linkings.taxon.scientificName,
        "municipalityDisplayname": e.row.gathering.interpretations ? e.row.gathering.interpretations.municipalityDisplayname : "N/A",
        "displayDateTime": e.row.gathering.displayDateTime,
        "id": e.row.unit.linkings.taxon.qname.substring(14,e.row.unit.linkings.taxon.qname.length)
      }
      this.mapController.zoomAt(
        [e.row.gathering.conversions.wgs84CenterPoint.lat, e.row.gathering.conversions.wgs84CenterPoint.lon],
        this.obsMapOptions.getOption("municipality") ? 10 : 7);
    }
  }
}
