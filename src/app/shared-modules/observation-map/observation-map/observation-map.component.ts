import { Component, Input, AfterViewInit, ViewChild, OnInit, ElementRef, ChangeDetectorRef, Renderer2, OnDestroy, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

import * as moment from 'moment';

import { UserService } from '../../../shared/service/user.service';
import { ObsMapOptions, ObsMapOption } from './services/data/ObsMapOptions';
import { MapApiService } from './services/MapApiService';
import { ObsMapListComponent } from './obs-map-list/obs-map-list.component';
import { ObsMapData } from './services/data/ObsMapData';
import { BsModalRef } from 'ngx-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from './services/MapService';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { TaxonSearchComponent } from 'app/shared-modules/taxon-search/taxon-search.component';
import { map, tap } from 'rxjs/operators';
import { TaxonService } from 'app/shared/service/taxon.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-observation-map',
  templateUrl: './observation-map.component.html',
  styleUrls: ['./observation-map.component.scss']
})

export class ObservationMapComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  @Input() id?: string;
  @Input() listMenuEnabled?: boolean = false;
  @Input() filterMenuEnabled?: boolean = false;
  @Input() showLegend?: boolean = true;
  @Input() set controls(c: boolean) {
    this.mapService.setControls(c)
  }
  @Input() mapHeight: number = 400;

  @ViewChild('maprow', { static: true }) mapRow: ElementRef;

  @ViewChild(ObsMapListComponent, { static: false })
  mapTaxonList : ObsMapListComponent;

  @ViewChild(TaxonSearchComponent, { static: false })
  taxonSearch : TaxonSearchComponent;

  @ViewChild(FilterMenuComponent, { static: false })
  filterMenu : FilterMenuComponent;

  bsModalRef: BsModalRef;

  municipalities:Array<any> = [];
  isLoggedIn = UserService.loggedIn();

  filterMenuHidden = true;
  listHidden = true;

  resizeUnlisten = () => {}

  constructor(private obsMapOptions:ObsMapOptions,
              private mapApiService:MapApiService,
              private mapService:MapService,
              private obsMapData: ObsMapData,
              private route: ActivatedRoute,
              private taxonService: TaxonService,
              private translate: TranslateService,
              private router: Router,
              private renderer: Renderer2,
              private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.mapApiService.getAreas().subscribe((r)=>{
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
        this.taxonService.getTaxon(res['taxonId'], this.translate.currentLang).subscribe(
          res => this.filterMenu.updateTaxon(res.vernacularName)
        )
        this.obsMapOptions.setOptionSilent("id", res['taxonId']);
      } else if (this.filterMenu) {
        this.filterMenu.updateTaxon(null);
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

  ngOnChanges(changes: SimpleChanges) {
    for (const prop in changes) {
      const change = changes[prop]
      if (prop == 'id' && !change.firstChange) {
        if (this.taxonSearch) this.taxonSearch.fillValue(this.id);
        this.obsMapOptions.setOption('id', this.id);
      }
    }
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

  onTimeChange(event: any[] | undefined) {
    if (!event) {
      this.updateQueryParam('time', undefined);
    }
    const startMoment = moment(event[0])
    const endMoment = moment(event[1])
    const start = startMoment.format("YYYY-MM-DD");
    const end = endMoment.format("YYYY-MM-DD");
    this.updateQueryParam('time', start + '/' + end);
  }

  onTaxonChange(event) {
    this.updateQueryParam("taxonId", event);
  }

  updateCheckbox(checkboxUpdateCallback:Function, checked:boolean) {
    checkboxUpdateCallback(checked);
  }

  getLajiLink() {
    const mapToLajiParam = {
        'taxonId': 'target',
        'time': 'time',
        'municipality': 'finnishMunicipalityId',
        'fiList': 'administrativeStatusId',
        'euList': 'administrativeStatusId',
        'plantPest': 'administrativeStatusId'
    }
    const mapToAdministrativeId = {
        'fiList': 'MX.nationallySignificantInvasiveSpecies',
        'euList': 'MX.euInvasiveSpeciesList',
        'plantPest': 'MX.quarantinePlantPest'
    }
    const params = this.route.snapshot.queryParams;
    let link = 'https://laji.fi/observation/map?invasive=true';
    for (const param in params) {
        if (!mapToLajiParam[param]) continue;
        const key = mapToLajiParam[param]
        let value = params[param]
        if (Object.keys(mapToAdministrativeId).includes(param)) {
            value = mapToAdministrativeId[param]
        }
        link += `&${key}=${value}`;
    }
    return link;
  }
}

function strToBool(str:string): boolean {
  return str === 'true';
}
