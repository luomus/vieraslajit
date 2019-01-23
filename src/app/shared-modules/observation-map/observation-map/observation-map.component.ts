import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from '../../../shared/service/user.service';
import { ObsMapOptions, ObsMapOption } from './services/data/ObsMapOptions';
import { MapApiService } from './services/MapApiService';
import { MapService } from './services/MapService';
import { ObsMapListComponent } from './obs-map-list/obs-map-list';
import { TaxonSearchComponent } from './taxon-search/taxon-search.component';

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements AfterViewInit, OnInit{
  @Input() id?: string;
  @Input() listEnabled?: boolean = false;
  @Input() mapHeight?: number = 400;
  @Input() taxonSearchEnabled?: boolean = false;
  @Input() municipalitySelectEnabled?: boolean = false;
  @Input() ownModeSelectorEnabled?: boolean = false;
  @Input() ownModeEnabled?: boolean = false;

  @ViewChild(ObsMapListComponent)
  mapTaxonList : ObsMapListComponent;

  @ViewChild(TaxonSearchComponent)
  taxonSearch : TaxonSearchComponent

  selectedInfo;

  municipalities:Array<any> = [];
  isLoggedIn = UserService.loggedIn();

  constructor(private obsMapOptions:ObsMapOptions, private mapApiController:MapApiService, private mapController:MapService) {}

  ngOnInit() {
    this.mapApiController.initialize();
    this.mapApiController.getAreas().subscribe((r)=>{
      r.results.forEach(element => {
        this.municipalities.push(element);
      });
      this.municipalities.sort((a, b)=>{
        // Sort in alphabetical order
        let nameA = a.name;
        let nameB = b.name;
        if(nameA > nameB) return 1;
        if(nameA < nameB) return -1;
        return 0;
      });
    });
    this.mapController.eventEmitter.addListener('onPopup', (o)=>{
      if(this.obsMapOptions.getOption("list")) {
        this.updateSelectedInfoByObservation(o);
      }
    });
  }

  ngAfterViewInit() {
    this.mapController.initializeMap(document.getElementById("map"));
    // Initialize mapOptions
    let options: Array<[ObsMapOption, any]> = [
      ["id", this.id],
      ["list", this.listEnabled],
      ["taxonSearch", this.taxonSearchEnabled],
    ]
    if(this.id && this.taxonSearchEnabled) {
      this.taxonSearch.fillValue('', this.id);
    }
    if(this.ownModeEnabled) options.push(["personToken", UserService.getToken()])
    this.obsMapOptions.setOptions(options);

    if(this.mapTaxonList) this.mapTaxonList.eventEmitter.addListener("change", (e)=>{
      this.onTableActivate(e);
    });

    if(this.taxonSearch) this.taxonSearch.eventEmitter.addListener("change", (id)=>{
      this.obsMapOptions.setOption("id", id);
    })

    // select municipality
    $('#select-municipality').change(() => {
      this.obsMapOptions.setOption("municipality", $('#select-municipality').val());
    });
  }

  ownModeChange() {
    this.ownModeEnabled ? this.obsMapOptions.setOption("personToken", UserService.getToken()) : this.obsMapOptions.setOption("personToken", null);
  }

  isAggregateMap() {
      const is_aggregate = this.obsMapOptions.getOption("aggregate")
      return !!is_aggregate;
  }

  onTableActivate(e) {
    if(e.type == "click"){
      this.updateSelectedInfoByObservation(e.row);
      this.mapController.zoomAt(
        [e.row.gathering.conversions.wgs84CenterPoint.lat, e.row.gathering.conversions.wgs84CenterPoint.lon],
        this.obsMapOptions.getOption("municipality") ? 7 : 5);
    }
  }

  updateSelectedInfoByObservation(o) {
    this.selectedInfo = {
      "taxonVerbatim": o.unit.taxonVerbatim,
      "team": o.gathering.team,
      "scientificName": o.unit.linkings.taxon.scientificName,
      "municipalityDisplayname": o.gathering.interpretations ? o.gathering.interpretations.municipalityDisplayname : "N/A",
      "displayDateTime": o.gathering.displayDateTime,
      "id": o.unit.linkings.taxon.qname.substring(14,o.unit.linkings.taxon.qname.length),
      "reliability": o.unit.quality.realiable ? "Luotettava" : ""
    }
  }
}
