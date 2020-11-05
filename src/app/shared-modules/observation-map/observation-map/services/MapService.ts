import LajiMap from 'laji-map';
import { TileLayerName, Data, DataOptions, GetFeatureStyleOptions, GetPopupOptions, Options } from 'laji-map/lib/map.defs';

import { ObsMapData, VrsObservation, ObsMapDataMeta } from "./data/ObsMapData";
import { ObsMapOptions } from './data/ObsMapOptions';
import { PathOptions } from 'leaflet';
import { Injectable, TemplateRef, ElementRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { EventEmitter } from 'events';
import { ObservationMapPopupComponent } from '../observation-map-popup.component';
import { BsModalRef } from 'ngx-bootstrap';
/* Listens to updates in obsMapObservations
and updates the map accordingly */

@Injectable()

export class MapService {

    private map: any;
    private modalRef: BsModalRef;
    private mapOptions: Options = {};

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private obsMapOptions:ObsMapOptions,
                private obsMapData:ObsMapData,
                private resolver: ComponentFactoryResolver,
                private injector: Injector) {}

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
                // theres a type error here. avoiding it by casting any type
                this.map.setData(<any>this.getAggregateMapData(data.payload));
            }
        })
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

        let dataOptions: DataOptions = {
            featureCollection: geoJSON,
            cluster: {
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: true,
                singleMarkerMode: true,
                maxClusterRadius: 20
            },
            getFeatureStyle: (options: GetPopupOptions):PathOptions=>{
                if (options) {
                    const value = obs.find((v) => (v.unit.unitId == options.feature.properties.unitId))
                    //console.log(value)
                }
                let p:PathOptions = {
                    color: "#f89525",
                    fillColor: "#f89525",
                }
                return p;
            },
            getPopup: (options: GetPopupOptions):string=>{
                const value = obs.find((v) => (v.unit.unitId == options.feature.properties.unitId))
                const name = value.unit.linkings.taxon.vernacularName.fi ? value.unit.linkings.taxon.vernacularName.fi : "";
                const municipality = value.gathering.interpretations ? value.gathering.interpretations.municipalityDisplayname : "";
                const date = value.gathering.displayDateTime ? value.gathering.displayDateTime : "";
                const notes = value.unit.notes ? value.unit.notes : "";
                const reliability = value.unit.quality.reliable ? "Luotettava" : "";

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

    getAggregateMapData(geoJSONFeatures): DataOptions[] {
        let data: DataOptions[] = []
        data.push({
            featureCollection: {
                type: "FeatureCollection",
                features: geoJSONFeatures
            },
            getFeatureStyle: (options: GetFeatureStyleOptions):PathOptions=>{
                const opacity = Math.min(0.5, Math.max(0.1, options.feature.properties.count * 0.0025))
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
        })
        return data;
    }

    getGeoJSONFromObservations(obs: VrsObservation[]) {
        let features = [];
        obs.forEach((o)=>{
            if(o.gathering && o.gathering.conversions) {
                let f = {
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
                    };
                    features.push(f);
                }
            }
        );
        return {
            type: "FeatureCollection",
            features: features
        };
    }
}
