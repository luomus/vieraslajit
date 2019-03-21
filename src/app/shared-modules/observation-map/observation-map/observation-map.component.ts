import { Component, Input, AfterViewInit, ViewChild, OnInit, ElementRef, ChangeDetectorRef, TemplateRef } from '@angular/core';
import * as $ from 'jquery';

import { UserService } from '../../../shared/service/user.service';
import { ObsMapOptions, ObsMapOption } from './services/data/ObsMapOptions';
import { MapApiService } from './services/MapApiService';
import { MapService } from './services/MapService';
import { ObsMapListComponent } from './obs-map-list/obs-map-list';
import { TaxonSearchComponent } from './taxon-search/taxon-search.component';
import { ObsMapData } from './services/data/ObsMapData';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements AfterViewInit, OnInit{
  @Input() id?: string;
  @Input() listEnabled?: boolean = false;
  @Input() taxonSearchEnabled?: boolean = false;
  @Input() municipalitySelectEnabled?: boolean = false;
  @Input() ownModeSelectorEnabled?: boolean = false;
  @Input() administrativeCheckboxes?: boolean = false;

  @Input() mapHeight: number = 400;

  @ViewChild('maprow') mapRow: ElementRef;

  @ViewChild(ObsMapListComponent)
  mapTaxonList : ObsMapListComponent;

  @ViewChild(TaxonSearchComponent)
  taxonSearch : TaxonSearchComponent

  bsModalRef: BsModalRef;

  selectedInfo;

  municipalities:Array<any> = [];
  isLoggedIn = UserService.loggedIn();

  constructor(private obsMapOptions:ObsMapOptions,
              private mapApiController:MapApiService,
              private mapController:MapService,
              private obsMapData: ObsMapData,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef) {}

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
    this.route.queryParams.subscribe(res => {
      this.onQueryParamWithCheckboxChange(
        res['user'],
        'ownCheck',
        this.ownModeSelectorEnabled,
        'personToken',
        UserService.getToken()
      );
      this.onQueryParamWithCheckboxChange(
        res['fiList'],
        'finnishList',
        this.administrativeCheckboxes,
        'fiList',
        strToBool(res['fiList'])
      );
      this.onQueryParamWithCheckboxChange(
        res['euList'],
        'euList',
        this.administrativeCheckboxes,
        'euList',
        strToBool(res['euList'])
      );
      this.onQueryParamWithCheckboxChange(
        res['plantPest'],
        'plantPest',
        this.administrativeCheckboxes,
        'plantPest',
        strToBool(res['plantPest'])
      );
    });

    // DYNAMIC MAP HEIGHT
    if (this.mapHeight === 0) {
      this.mapHeight = window.innerHeight - this.mapRow.nativeElement.offsetTop - 5;
      this.cd.detectChanges();
    }

    // INITIALIZE MAP
    this.mapController.initializeMap(document.getElementById("map"), this.bsModalRef);

    if(this.id && this.taxonSearchEnabled) {
      this.taxonSearch.fillValue('', this.id);
    }

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

  updateQueryParam(param, value) {
    let params = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
    params[param] = value;
    this.router.navigate([], {queryParams: params});
  }

  onOwnModeChange(e) {
    this.updateQueryParam('user', e.target.checked);
  }

  isAggregateMap() {
    return this.obsMapData.type == "geojson";
  }

  getObservationCount() {
    return this.obsMapData.observationCount;
  }

  onTableActivate(e) {
    if(e.type == "click"){
      this.updateSelectedInfoByObservation(e.row);
      const coordinates: [number, number] = [e.row.gathering.conversions.wgs84CenterPoint.lat, e.row.gathering.conversions.wgs84CenterPoint.lon];
      this.mapController.zoomAt(
        coordinates,
        this.obsMapOptions.getOption("municipality") ? 7 : 5);
      this.mapController.openPopup(coordinates);
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

  onFiListCheckbox(e) {
    this.updateQueryParam('fiList', e.target.checked);
  }

  onEuListCheckbox(e) {
    this.updateQueryParam('euList', e.target.checked);
  }

  onPlantPestCheckbox(e) {
    this.updateQueryParam('plantPest', e.target.checked);
  }

  onQueryParamWithCheckboxChange(param:string, checkboxId:string, selectorEnabled:boolean, option:ObsMapOption, optionValue:any) {
    const temp = strToBool(param);
    if (selectorEnabled) {
      updateCheckbox(checkboxId, temp);
    }
    temp ? this.obsMapOptions.setOption(option, optionValue) : this.obsMapOptions.setOption(option, null);
  }
}

function strToBool(str:string): boolean {
  return str === 'true';
}

function updateCheckbox(checkboxId:string, checked:boolean) {
  const checkbox = <HTMLInputElement> document.getElementById(checkboxId);
  checkbox.checked = checked;
}