import { Component, Input, AfterViewInit, ViewChild, OnInit, ElementRef, ChangeDetectorRef, Renderer2, OnDestroy } from '@angular/core';

import { UserService } from '../../../shared/service/user.service';
import { ObsMapOptions, ObsMapOption } from './services/data/ObsMapOptions';
import { MapApiService } from './services/MapApiService';
import { ObsMapListComponent } from './obs-map-list/obs-map-list';
import { TaxonSearchComponent } from './taxon-search/taxon-search.component';
import { ObsMapData } from './services/data/ObsMapData';
import { BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { MapService } from './services/MapService';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements AfterViewInit, OnInit, OnDestroy{
  @Input() id?: string;
  @Input() listMenuEnabled?: boolean = false;
  @Input() filterMenuEnabled?: boolean = false;
  @Input() lajiLinkEnabled?: boolean = true;

  @Input() mapHeight: number = 400;

  @ViewChild('maprow') mapRow: ElementRef;

  @ViewChild(ObsMapListComponent)
  mapTaxonList : ObsMapListComponent;

  @ViewChild(TaxonSearchComponent)
  taxonSearch : TaxonSearchComponent;

  @ViewChild(FilterMenuComponent)
  filterMenu : FilterMenuComponent;

  bsModalRef: BsModalRef;

  municipalities:Array<any> = [];
  isLoggedIn = UserService.loggedIn();

  filterMenuHidden = false;
  listHidden = false;

  resizeUnlisten = () => {}

  constructor(private obsMapOptions:ObsMapOptions,
              private mapApiController:MapApiService,
              private mapService:MapService,
              private obsMapData: ObsMapData,
              private route: ActivatedRoute,
              private router: Router,
              private renderer: Renderer2,
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
  }

  ngAfterViewInit() {
    if (window.innerWidth < 768) {
      this.filterMenuHidden = true;
      this.listHidden = true;
    }
    this.route.queryParams.subscribe(res => {
      this.onQueryParamWithCheckboxChange(
        res['user'],
        this.filterMenu && this.filterMenu.updateOwnMode,
        true,
        'personToken',
        UserService.getToken()
      );
      this.onQueryParamWithCheckboxChange(
        res['fiList'],
        this.filterMenu && this.filterMenu.updateFiList,
        true,
        'fiList',
        strToBool(res['fiList'])
      );
      this.onQueryParamWithCheckboxChange(
        res['euList'],
        this.filterMenu && this.filterMenu.updateEuList,
        true,
        'euList',
        strToBool(res['euList'])
      );
      this.onQueryParamWithCheckboxChange(
        res['plantPest'],
        this.filterMenu && this.filterMenu.updatePlantPest,
        true,
        'plantPest',
        strToBool(res['plantPest'])
      );
      if (res['taxonId']) {
        this.filterMenu.updateTaxon(res['taxonId']);
        this.obsMapOptions.setOptionSilent("id", res['taxonId']);
      } else {
        this.obsMapOptions.setOptionSilent("id", null);
      }
      if (res['municipality']) {
        this.filterMenu.updateMunicipality(res['municipality']);
        this.obsMapOptions.setOptionSilent("municipality", res['municipality']);
      } else {
        this.obsMapOptions.setOptionSilent("municipality", null);
      }
      if (res['time']) {
        this.obsMapOptions.setOptionSilent("time", res['time']);
        this.filterMenu.updateTime(res["time"]);
      } else {
        this.obsMapOptions.setOptionSilent("time", null);
      }
      this.obsMapOptions.emitChange();
    });

    // DYNAMIC MAP HEIGHT
    if (this.mapHeight === 0) {
      this.resizeUnlisten = this.renderer.listen(window, 'resize', () => {
        this.mapHeight = window.innerHeight - this.mapRow.nativeElement.offsetTop;
        this.cd.detectChanges();
      });
      this.mapHeight = window.innerHeight - this.mapRow.nativeElement.offsetTop;
      this.cd.detectChanges();
    }

    // INITIALIZE MAP
    this.mapService.initializeMap(document.getElementById("map"), this.bsModalRef);

    if(this.id) {
      if (this.taxonSearch) this.taxonSearch.fillValue(this.id);
      this.obsMapOptions.setOption('id', this.id);
    }

    if(this.mapTaxonList) this.mapTaxonList.eventEmitter.addListener("change", (e)=>{
      this.onTableActivate(e);
    });
  }

  ngOnDestroy() {
    this.resizeUnlisten();
  }

  onSelectMunicipality(val) {
    val ? this.updateQueryParam("municipality", val) : this.updateQueryParam("municipality", null);
  }

  updateQueryParam(param, value) {
    let params = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
    params[param] = value;
    this.router.navigate([], {queryParams: params});
  }

  onOwnModeChange(e) {
    this.updateQueryParam('user', e);
  }

  isAggregateMap() {
    return this.obsMapData.type == "geojson";
  }

  getObservationCount() {
    return this.obsMapData.observationCount;
  }

  onTableActivate(e) {
    if(e.type == "click"){
      const coordinates: [number, number] = [e.row.gathering.conversions.wgs84CenterPoint.lat, e.row.gathering.conversions.wgs84CenterPoint.lon];
      this.mapService.zoomAt(
        coordinates,
        this.obsMapOptions.getOption("municipality") ? 7 : 5);
      this.mapService.openPopup(e.row.unit.unitId);
    }
  }

  onFiListCheckbox(e) {
    this.updateQueryParam('fiList', e);
  }

  onEuListCheckbox(e) {
    this.updateQueryParam('euList', e);
  }

  onPlantPestCheckbox(e) {
    this.updateQueryParam('plantPest', e);
  }

  onQueryParamWithCheckboxChange(param:string, checkboxUpdateCallback:Function, selectorEnabled:boolean, option:ObsMapOption, optionValue:any) {
    const temp = strToBool(param);
    if (selectorEnabled && checkboxUpdateCallback) {
      this.updateCheckbox(checkboxUpdateCallback, temp);
    }
    temp ? this.obsMapOptions.setOptionSilent(option, optionValue) : this.obsMapOptions.setOptionSilent(option, null);
  }

  onTimeChange(event) {
    this.updateQueryParam('time', event);
  }

  onTaxonChange(event) {
    this.updateQueryParam("taxonId", event);
  }

  updateCheckbox(checkboxUpdateCallback:Function, checked:boolean) {
    checkboxUpdateCallback(checked);
  }
}

function strToBool(str:string): boolean {
  return str === 'true';
}
