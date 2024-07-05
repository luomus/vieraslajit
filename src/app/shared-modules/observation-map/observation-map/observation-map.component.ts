import { Component, Input, AfterViewInit, ViewChild, OnInit, ElementRef, ChangeDetectorRef, Renderer2, OnDestroy, OnChanges, SimpleChanges, SimpleChange, HostListener, ComponentFactoryResolver, Injector } from '@angular/core';

import { UserService } from '../../../shared/service/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { map, tap, switchMap, take, delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subscription } from 'rxjs';
import { AreaService } from 'app/shared/service/area.service';
import LajiMap, { Lang, Options, TileLayerName, Data, DataOptions, GetPopupOptions, GetFeatureStyleOptions } from 'laji-map';
import { observationBaseQuery, ObservationService } from 'app/shared/service/observation.service';
import { WarehouseQueryInterface } from './import-from-laji-front/WarehouseQueryInterface';
import { YkjService } from './import-from-laji-front/ykj.service';
import { PathOptions } from 'leaflet';
import { ObservationMapPopupComponent } from './observation-map-popup.component';
import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/compiler';

interface QueryParams {
    own?: boolean,
    fiList?: boolean,
    euList?: boolean,
    plantPest?: boolean,
    taxonId?: string,
    municipality?: string,
    time?: string
}

export interface Observation {
    document?: any;
    gathering?: {
        conversions?: { wgs84CenterPoint: { lat: number, lon: number }},
        displayDateTime?: string;
        gatheringId?: string;
        interpretations?: {
            coordinateAccuracy?: number;
            municipalityDisplayname?: string;
            sourceOfCoordinates?: string;
        };
        unit?: Array<any>;
    };
    unit?: {
        abundanceString?: string,
        linkings?: any,
        recordBasis?: string,
        taxonVerbatim?: string,
        unitId?: string,
        notes?: string,
        quality?: any;
    };
}

const strToBool = (str: string): boolean => str === 'true';
const countToOpacityMap = (a: number): number => .2 + .4 * (Math.min(500, a) / 500)
const obsIsConfirmed = obs => (
    obs.unit.interpretations && obs.unit.interpretations.recordQuality && (
        (
            obs.unit.interpretations.recordQuality === 'EXPERT_VERIFIED'
            || obs.unit.interpretations.recordQuality === 'COMMUNITY_VERIFIED'
        )
        || (
            obs.document.linkings.collectionQuality === 'PROFESSIONAL'
            && !(
                obs.unit.interpretations.recordQuality === 'UNCERTAIN'
                || obs.unit.interpretations.recordQuality === 'ERRONEUS'
            )
        )
    )
);

const getGeoJSONFromObservations = (obs: Observation[]) => ({
    type: "FeatureCollection",
    features: obs.filter(
        o => o.gathering && o.gathering.conversions
    ).map(o => ({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates:
            [o.gathering.conversions.wgs84CenterPoint.lon,
                o.gathering.conversions.wgs84CenterPoint.lat]
            },
        properties: {
            unitId: o.unit.unitId
        }
    }))
});

const getObservationMapData = (obs: any[], geoJSON: any, modalRef: BsModalRef, resolver: ComponentFactoryResolver, injector: Injector): Data[] => {
    let mapData=[];
    const featureIndexToObservation = geoJSON.features.map(
        feature => obs.find(
            (v) => v.unit.unitId == feature.properties.unitId
        )
    );
    const featureIndexIsReliable = featureIndexToObservation.map(
        obsIsConfirmed
    );

    let dataOptions: DataOptions = {
        featureCollection: geoJSON,
        cluster: {
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: true,
            singleMarkerMode: true,
            maxClusterRadius: 20
        },
        getClusterStyle: (childCount: number, featureIdxs: number[], cluster): PathOptions => {
            let color = '#cccccc';
            let fillColor = '#cccccc';
            if (featureIdxs.find(idx => featureIndexIsReliable[idx])) {
                color = '#f89525';
                fillColor = '#f89525';
            }
            return {
                color,
                fillColor,
                opacity: 1,
                fillOpacity: 1
            };
        },
        getPopup: (options: GetPopupOptions): string => {
            const value = featureIndexToObservation[options.featureIdx]
            const name = value.unit.linkings.taxon.vernacularName.fi ? value.unit.linkings.taxon.vernacularName.fi : "";
            const municipality = value.gathering.interpretations ? value.gathering.interpretations.municipalityDisplayname : "";
            const date = value.gathering.displayDateTime ? value.gathering.displayDateTime : "";
            const notes = value.unit.notes ? value.unit.notes : "";
            const reliability = obsIsConfirmed(value) ? "Luotettava" : "";

            // TODO what is this for???
            //this.eventEmitter.emit('onPopup', value);

            const compFac = resolver.resolveComponentFactory(ObservationMapPopupComponent);
            const compRef = compFac.create(injector);
            compRef.instance.name = name;
            compRef.instance.municipality = municipality;
            compRef.instance.date = date;
            compRef.instance.notes = notes;
            compRef.instance.reliability = reliability;
            compRef.instance.taxonId = value.unit.linkings.taxon.id.substring(14);
            compRef.instance.observationId = value.document.documentId;
            compRef.instance.unitId = value.unit.unitId;
            compRef.instance.modalRef = modalRef;
            compRef.changeDetectorRef.detectChanges();
            return compRef.location.nativeElement;
        }
    }

    mapData.push(dataOptions);
    return mapData;
}

const getAggregateMapData = (geoJSONFeatures: any[]): DataOptions => ({
    cluster: false,
    featureCollection: {
        type: "FeatureCollection",
        features: geoJSONFeatures
    },
    getFeatureStyle: (options: GetFeatureStyleOptions): PathOptions=>{

        const opacity = countToOpacityMap(options.feature.properties.count);
        let p: PathOptions = {
            color: "#f89525",
            fillColor: "#f89525",
            opacity: opacity,
            fillOpacity: opacity
        }
        return p;
    },
    getPopup: (options: GetPopupOptions): string => {
        return "Havaintoja: " + geoJSONFeatures[options.featureIdx].properties.count;
    }
});

@Component({
    selector: 'vrs-observation-map',
    templateUrl: './observation-map.component.html',
    styleUrls: ['./observation-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservationMapComponent implements AfterViewInit, OnDestroy, OnChanges {
    @Input() id?: string;
    @Input() listMenuEnabled?: boolean = false;
    @Input() filterMenuEnabled?: boolean = false;
    @Input() showLegend?: boolean = true;
    @Input() controls? = false;
    @Input() mapHeight: number = 400;

    @ViewChild('maprow', { static: true }) mapRow: ElementRef;
    @ViewChild('map', { static: true }) mapElement: ElementRef;
    @ViewChild(FilterMenuComponent, { static: false }) filterMenu : FilterMenuComponent;

    bsModalRef: BsModalRef;
    isLoggedIn = UserService.loggedIn();
    filterMenuHidden = true;
    filterControl = new FormControl({
        own: false,
        fiList: false,
        euList: false,
        plantPest: false,
        taxonId: "",
        municipality: "",
        time: ""
    });
    listHidden = true;
    resizeUnlisten: () => void;
    municipalities$: Observable<any[]>;
    map: any;
    modalRef: BsModalRef<any>;
    observations: Observation[];
    subscription = new Subscription();
    mapType: 'aggregate' | 'observation';
    count: number;

    constructor(
        private route: ActivatedRoute,
        private translate: TranslateService,
        private router: Router,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private areaService: AreaService,
        private observationService: ObservationService,
        private ykjService: YkjService,
        private resolver: ComponentFactoryResolver,
        private injector: Injector
    ) {
        this.municipalities$ = this.areaService.getMunicipalities("municipality").pipe(
            map(res => res.results),
            map(res =>
                res.sort((a, b)=>{
                    // Sort in alphabetical order
                    let nameA = a.name;
                    let nameB = b.name;
                    if(nameA > nameB) return 1;
                    if(nameA < nameB) return -1;
                    return 0;
                })
            )
        );
    }

    ngAfterViewInit() {
        this.onWindowResize();

        const mapOptions: Options = {};

        this.map = new LajiMap({
            rootElem: this.mapElement.nativeElement,
            popupOnHover: false,
            center: [65.2, 27],
            zoom: 2,
            zoomToData: false,
            tileLayerName: TileLayerName.maastokartta,
            draw: false,
            lang: this.translate.currentLang as Lang,
            controls: this.controls,
            ...mapOptions
        });
        this.map.tileLayer.setOpacity(0.4);

        this.subscription.add(
            this.filterControl.valueChanges.pipe(
                tap(value => {
                    const params = {};
                    Object.entries(value).forEach(([key, value]) => {
                        params[key] = value ? value : undefined;
                    });
                    // yielding is necessary here for the checkbox state to update immediately
                    setTimeout(() => {
                        this.router.navigate([], {
                            relativeTo: this.route,
                            queryParamsHandling: 'merge',
                            queryParams: params
                        });
                    });
                })
            ).subscribe()
        );

        this.route.queryParams.pipe(
            take(1)
        ).subscribe(params => {
            if (Object.keys(params).length > 0) {
                this.filterMenuHidden = false;
                this.cdr.markForCheck();
            }
        });

        this.subscription.add(
            this.route.queryParams.pipe(
                tap((res: QueryParams) => {
                    this.filterControl.setValue({...this.filterControl.getRawValue(), ...res});
                    this.cdr.detectChanges(); // necessary to prevent "Expression has changed after checked"
                }),
                delay(0), // once again yielding to make sure checkbox updates...
                          // why does angular make me do this ??
                          // i wish i was writing elm
                map((res: QueryParams) => {
                    const query: WarehouseQueryInterface = { ...observationBaseQuery };
                    const taxonId = this.id ?? res.taxonId;
                    if (taxonId) { query.taxonId = [taxonId]; }
                    if (res.municipality) { query.area = [res.municipality]; }
                    if (res.own) { query.observerPersonToken = UserService.getToken(); }
                    if (res.time) { query.time = [res.time]; }
                    const adminStatuses = [];
                    if (res.fiList) { adminStatuses.push("MX.controllingRisksOfInvasiveAlienSpecies") }
                    if (res.euList) { adminStatuses.push("MX.euInvasiveSpeciesList") }
                    if (res.plantPest) { adminStatuses.push("MX.quarantinePlantPest") }
                    if (adminStatuses.length > 0) { query.administrativeStatusId = adminStatuses; }
                    return query;
                }),
                switchMap(query => {
                    return this.observationService.getObservationCount(query).pipe(map(res => ({res, query})));
                }),
                tap(({res, query}) => this.count = res.total),
                switchMap(
                    ({res, query}) => res.total > 2000
                        ? this.getAggregate$(query).pipe(
                            tap((res: any) => {
                                this.map.setData(getAggregateMapData(res));
                                this.observations = undefined;
                                this.mapType = 'aggregate';
                            })
                        )
                        : this.getObservationList$(query).pipe(
                            tap((res: any) => {
                                if (
                                    query.area?.length > 0
                                    && res.results.length > 0
                                ) {
                                    const center = [
                                        res.results[0].gathering.conversions.wgs84CenterPoint.lat,
                                        res.results[0].gathering.conversions.wgs84CenterPoint.lon
                                    ];
                                    const zoomLevel = 6;
                                    this.map.setOptions({center: center, zoom: zoomLevel});
                                }
                                const geojson = getGeoJSONFromObservations(res.results);
                                this.map.setData(
                                    getObservationMapData(res.results, geojson, this.modalRef, this.resolver, this.injector)
                                );
                                this.observations = res.results;
                                this.mapType = 'observation';
                            })
                        )
                ),
                tap(_ => this.cdr.markForCheck())
            ).subscribe()
        );

        // todo unsub
        this.translate.onLangChange.subscribe(lang => this.map.lang = lang);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['mapHeight'] && changes['mapHeight'].currentValue === 0) {
            this.resizeUnlisten?.();
            this.resizeUnlisten = this.renderer.listen(window, 'resize', this.updateMapHeight.bind(this));
            this.updateMapHeight();
        }
    }

    ngOnDestroy() {
        this.resizeUnlisten?.();
        this.subscription.unsubscribe();
    }

    updateQueryParam(param, value) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
            queryParams: { [param]: value ? value : undefined }
        });
    }

    onTableActivate(e) {
        if (e.type !== "click") {
            return;
        }
        this.route.queryParamMap.pipe(take(1)).subscribe(params => {
            const municipality = params.get("municipality");
            const center: [number, number] = [e.row.gathering.conversions.wgs84CenterPoint.lat, e.row.gathering.conversions.wgs84CenterPoint.lon];
            const zoomLevel = municipality ? 7 : 5;
            this.map.setOptions({center: center, zoom: zoomLevel});
        });

        // open popup
        const index = this.map.data[0].featureCollection.features.findIndex(
            (f) => e.row.unit.unitId === f.properties.unitId
        );
        const layer: any = this.map.getLayerByIdxTuple([0,index]);
        layer.fire("click", {latlng: layer.getCenter ? layer.Center() : layer.getLatLng()});
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

    onFilterMenuClose() {
        this.filterMenuHidden = true;
        this.cdr.markForCheck();
    }

    @HostListener("window:resize")
    onWindowResize() {
        if (window.innerWidth < 768) {
            this.filterMenuHidden = true;
            this.listHidden = true;
            this.cdr.markForCheck();
        }
    }

    private getAggregate$(query: WarehouseQueryInterface): Observable<any> {
        return this.ykjService.getGeoJson(query, "10kmCenter");
    }

    private getObservationList$(query: WarehouseQueryInterface): Observable<any> {
        return this.observationService.getObservations({
            ...query,
            selected: [
                "unit.linkings.taxon.scientificName", "unit.linkings.taxon.vernacularName",
                "unit.linkings.taxon.id", "gathering.conversions.wgs84CenterPoint.lat",
                "gathering.conversions.wgs84CenterPoint.lon", "gathering.displayDateTime",
                "gathering.interpretations.municipalityDisplayname", "gathering.team",
                "unit.quality", "gathering.gatheringId", "document.documentId", "unit.unitId",
                "unit.interpretations.recordQuality", "document.linkings.collectionQuality"
            ]
        })
    }

    private updateMapHeight() {
        this.mapHeight = window.innerHeight - this.mapRow.nativeElement.offsetTop;
        this.cdr.detectChanges();
    }
}

