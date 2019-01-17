import * as LM from 'laji-map';
import LajiMap from 'laji-map/lib/map';
import { TileLayerName, Data, DataOptions } from 'laji-map/lib/map.defs';

import { ObsMapData, VrsObservation, ObsMapDataMeta } from "./data/ObsMapData";
import { ObsMapOptions } from './data/ObsMapOptions';
import { PathOptions } from 'leaflet';
import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
/* Listens to updates in obsMapObservations
    and updates the map accordingly */

@Injectable()

export class MapService {

    private map:LajiMap;

    eventEmitter:EventEmitter = new EventEmitter();

    constructor(private obsMapOptions:ObsMapOptions, private obsMapData:ObsMapData) {}

    initializeMap(e:HTMLElement) {
        this.map = new LM.default({
            rootElem: e,
            popupOnHover: false,
            center: [65.2, 27],
            zoom: 2,
            zoomToData: false,
            tileLayerName: <TileLayerName>"openStreetMap"
        });
        this.obsMapData.eventEmitter.subscribe((data: ObsMapDataMeta) => {
            // TODO: Unsubscribe
            if(data.type == 'observations') {
                if(this.obsMapOptions.getOption('municipality') &&
                this.obsMapOptions.getOption('municipality').length > 0 && data.payload.length > 0) {
                this.zoomAt([data.payload[0].gathering.conversions.wgs84CenterPoint.lat,
                            data.payload[0].gathering.conversions.wgs84CenterPoint.lon], 3);
                }
                this.map.setData(this.getMapData(data.payload));
            } else if (data.type == 'geojson') {
                console.log('returned geojson');
            }
        })
    }

    zoomAt(center:[number, number], zoomLevel:number) {
      this.map.setOptions({center: center, zoom: zoomLevel});
    }

    private getMapData(obs: VrsObservation[]):Data[] {
      let mapData=[];
      const geoJSON = this.getGeoJSONFromObservations(obs);

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
        getPopup: (data):string=>{
          let name = obs[data].unit.taxonVerbatim;
          let municipality = obs[data].gathering.interpretations.municipalityDisplayname || "";
          let date = obs[data].gathering.displayDateTime;
          let notes = obs[data].unit.notes || "";
          let reliability = obs[data].unit.quality.reliable ? "Luotettava <br>" : "";

          this.eventEmitter.emit('onPopup', obs[data]);

          return name.charAt(0).toUpperCase()
          + name.substr(1)+ " | "
          + date.substring(8, 10) + "."
          + date.substring(5, 7) + "."
          + date.substring(0, 4) + " | "
          + municipality + " <br> "
          + reliability
          + notes;
        }
      }

      mapData.push(dataOptions);
      return mapData;
    }

    getGeoJSONFromObservations(obs: VrsObservation[]) {
        let features = [];
        obs.forEach((o)=>{
            if(o.gathering.conversions) {
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
        });
        return {
            type: "FeatureCollection",
            features: features
          };
    }
}
