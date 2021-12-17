import LajiMap from 'laji-map';
import { TileLayerName, Data, DataOptions, GetFeatureStyleOptions, GetPopupOptions, Options, Lang } from 'laji-map/lib/map.defs';

import { ObsMapData, VrsObservation, ObsMapDataMeta } from "./data/ObsMapData";
import { ObsMapOptions } from './data/ObsMapOptions';
import { PathOptions } from 'leaflet';
import { Injectable, TemplateRef, ElementRef, ComponentFactoryResolver, Injector, OnDestroy } from '@angular/core';
import { EventEmitter } from 'events';
import { ObservationMapPopupComponent } from '../observation-map-popup.component';
import { BsModalRef } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
/* Listens to updates in obsMapObservations
and updates the map accordingly */

const countToOpacityMap = (a: number): number => .2 + .4 * (Math.min(500, a) / 500)
const obsIsConfirmed = obs => (
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
);

@Injectable()

export class MapService implements OnDestroy{

    private map: any;
    private modalRef: BsModalRef;
    private mapOptions: Options = {};
    private unsubscribe$ = new Subject<void>();

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private obsMapOptions:ObsMapOptions,
                private obsMapData:ObsMapData,
                private resolver: ComponentFactoryResolver,
                private injector: Injector,
                private translate: TranslateService) {}

    initializeMap(e:HTMLElement, modalRef: BsModalRef) {
        this.modalRef = modalRef
        this.map = new LajiMap({
            rootElem: e,
            popupOnHover: false,
            center: [65.2, 27],
            zoom: 2,
            zoomToData: false,
            tileLayerName: TileLayerName.maastokartta,
            draw: false,
            lang: this.translate.currentLang as Lang,
            ...this.mapOptions
        });
        this.map.tileLayer.setOpacity(0.4);
        this.obsMapData.eventEmitter.subscribe((data: ObsMapDataMeta) => {
            if(data.type == 'observations') {
                if(this.obsMapOptions.getOption('municipality') &&
                   this.obsMapOptions.getOption('municipality').length > 0 && data.payload.length > 0) {
                    this.zoomAt([data.payload[0].gathering.conversions.wgs84CenterPoint.lat,
                        data.payload[0].gathering.conversions.wgs84CenterPoint.lon], 6);
                    }
                    this.map.setData(this.getObservationMapData(this.getGeoJSONFromObservations(data.payload)));
            } else if (data.type == 'geojson') {
                this.map.setData(this.getAggregateMapData(data.payload));
            }
        })
        this.translate.onLangChange.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(lang => this.map.lang = lang)
    }

    setControls(c: boolean) {
        // @ts-ignore
        this.mapOptions.controls = c;
    }

    zoomAt(center:[number, number], zoomLevel:number) {
        this.map.setOptions({center: center, zoom: zoomLevel});
    }

    openPopup(unitId: string) {
        const index = this.map.data[0].featureCollection.features.findIndex(
            (f) => unitId === f.properties.unitId
        );
        const layer: any = this.map.getLayerByIdxTuple([0,index]);
        layer.fire("click", {latlng: layer.getCenter ? layer.Center() : layer.getLatLng()});
    }

    private getObservationMapData(geoJSON):Data[] {
        let mapData=[];
        const obs: any[] = this.obsMapData.getData().payload
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
            getPopup: (options: GetPopupOptions):string=>{
                const value = featureIndexToObservation[options.featureIdx]
                const name = value.unit.linkings.taxon.vernacularName.fi ? value.unit.linkings.taxon.vernacularName.fi : "";
                const municipality = value.gathering.interpretations ? value.gathering.interpretations.municipalityDisplayname : "";
                const date = value.gathering.displayDateTime ? value.gathering.displayDateTime : "";
                const notes = value.unit.notes ? value.unit.notes : "";
                const reliability = obsIsConfirmed(value) ? "Luotettava" : "";

                this.eventEmitter.emit('onPopup', value);

                const compFac = this.resolver.resolveComponentFactory(ObservationMapPopupComponent);
                const compRef = compFac.create(this.injector);
                compRef.instance.name = name;
                compRef.instance.municipality = municipality;
                compRef.instance.date = date;
                compRef.instance.notes = notes;
                compRef.instance.reliability = reliability;
                compRef.instance.taxonId = value.unit.linkings.taxon.id.substring(14);
                compRef.instance.observationId = value.document.documentId;
                compRef.instance.unitId = value.unit.unitId;
                compRef.instance.modalRef = this.modalRef;
                compRef.changeDetectorRef.detectChanges();
                return compRef.location.nativeElement;
            }
        }

        mapData.push(dataOptions);
        return mapData;
    }

    getAggregateMapData(geoJSONFeatures): DataOptions {
        return {
            cluster: false,
            featureCollection: {
                type: "FeatureCollection",
                features: geoJSONFeatures
            },
            getFeatureStyle: (options: GetFeatureStyleOptions):PathOptions=>{

                const opacity = countToOpacityMap(options.feature.properties.count);
                let p:PathOptions = {
                    color: "#f89525",
                    fillColor: "#f89525",
                    opacity: opacity,
                    fillOpacity: opacity
                }
                return p;
            },
            getPopup: (options: GetPopupOptions):string=>{
                return "Havaintoja: " + geoJSONFeatures[options.featureIdx].properties.count;
            }
        }
    }

    getGeoJSONFromObservations(obs: VrsObservation[]) {
        return {
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
        }
    }

    ngOnDestroy() {
        if (this.unsubscribe$) {
            this.unsubscribe$.next();
            this.unsubscribe$.complete();
        }
    }
}
