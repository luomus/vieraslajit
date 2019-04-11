import * as LM from 'laji-map';
import LajiMap from 'laji-map/lib/map';
import { TileLayerName, Data, DataOptions, GetFeatureStyleOptions, GetPopupOptions } from 'laji-map/lib/map.defs';

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

    private map:LajiMap;
    private modalRef: BsModalRef;

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private obsMapOptions:ObsMapOptions,
                private obsMapData:ObsMapData,
                private resolver: ComponentFactoryResolver,
                private injector: Injector) {}

    initializeMap(e:HTMLElement, modalRef: BsModalRef) {
        this.modalRef = modalRef
        this.map = new LM.default({
            rootElem: e,
            popupOnHover: false,
            center: [65.2, 27],
            zoom: 2,
            zoomToData: false,
            tileLayerName: TileLayerName.maastokartta,
            tileLayerOpacity: 0.4
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

    zoomAt(center:[number, number], zoomLevel:number) {
        this.map.setOptions({center: center, zoom: zoomLevel});
    }

    openPopup(coordinates: [number, number]) {
        // HACK
        const index = this.map.data[0].featureCollection.features.findIndex(
            (f) => coordinates[0] === f.geometry.coordinates[1] && coordinates[1] === f.geometry.coordinates[0]
        );
        const layer: any = this.map.getLayerByIdxTuple([0,index]);
        layer.fire("click", {latlng: layer.getCenter ? layer.Center() : layer.getLatLng()});
    }

    private getObservationMapData(geoJSON):Data[] {
        let mapData=[];
        const obs = this.obsMapData.getData().payload

        let dataOptions: DataOptions = {
            featureCollection: geoJSON,
            cluster: {
                spiderfyOnMaxZoom: true,
                showCoverageOnHover: true,
                singleMarkerMode: true,
                maxClusterRadius: 20
            },
            getFeatureStyle: ():PathOptions=>{
                let p:PathOptions = {
                    color: "#f89525",
                    fillColor: "#f89525",
                }
                return p;
            },
            getPopup: (options: GetPopupOptions):string=>{
                const feature = options.featureIdx;
                const name = obs[feature].unit.linkings.taxon.vernacularName.fi;
                const municipality = obs[feature].gathering.interpretations.municipalityDisplayname || "";
                const date = obs[feature].gathering.displayDateTime;
                const notes = obs[feature].unit.notes || "";
                const reliability = obs[feature].unit.quality.reliable ? "Luotettava <br>" : "";

                this.eventEmitter.emit('onPopup', obs[feature]);

                const compFac = this.resolver.resolveComponentFactory(ObservationMapPopupComponent);
                const compRef = compFac.create(this.injector);
                compRef.instance.name = name;
                compRef.instance.municipality = municipality;
                compRef.instance.date = date;
                compRef.instance.notes = notes;
                compRef.instance.reliability = reliability;
                compRef.instance.taxonId = obs[feature].unit.linkings.taxon.id.substring(14);
                compRef.instance.observationId = obs[feature].gathering.gatheringId.substring(14);
                compRef.instance.modalRef = this.modalRef;
                compRef.changeDetectorRef.detectChanges();
                return compRef.location.nativeElement;
            }
        }

        mapData.push(dataOptions);
        return mapData;
    }

    getAggregateMapData(geoJSONFeatures): LM.DataOptions[] {
        let data: LM.DataOptions[] = []
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
                        properties: {}
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
