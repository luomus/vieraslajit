import * as LM from 'laji-map';
import LajiMap, { TileLayerName, Data, DataOptions } from '../../../../../node_modules/laji-map/lib/map.d';

import { ObsMapObservations } from "./ObsMapObservations";
import { ObsMapOptions } from './ObsMapOptions';
import { PathOptions } from '../../../../../node_modules/@types/leaflet';
import { Injectable } from '../../../../../node_modules/@angular/core';
import { ObservationMapModule } from '../observation-map.module';

/* Listens to updates in obsMapObservations
    and updates the map accordingly */

@Injectable({
    providedIn: ObservationMapModule
})

export class MapController {

    private map:LajiMap;

    constructor(private obsMapOptions:ObsMapOptions, private obsMapObservations:ObsMapObservations) {}

    initializeMap(e:HTMLElement) {
        this.map = new LM.default({
            rootElem: e,
            popupOnHover: false,
            center: [65.2, 27],
            zoom: 2,
            zoomToData: false,
            tileLayerName: <TileLayerName>"openStreetMap"
        });
        this.obsMapObservations.eventEmitter.addListener('change', ()=>{
            this.map.setData(this.getMapData());
        });
    }

    private getMapData():Data[] {
        let mapData=[];
        /* Add observations map data */
        this.obsMapObservations.getObservations()
          .forEach((observation) => {
            /* Use only data points with coordinates */
            if(observation.gathering.conversions) {
              let name = observation.unit.taxonVerbatim;
              let municipality = observation.gathering.interpretations.municipalityDisplayname || "N/A";
              let date = observation.gathering.displayDateTime;
              let notes = observation.unit.notes || "";
              
              let o: DataOptions = {
                featureCollection: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: this.obsMapOptions.getOption("adminMode")?
                        [observation.gathering.conversions.wgs84CenterPoint.lon,
                          observation.gathering.conversions.wgs84CenterPoint.lat]:
                        [this.randomizeCoordinates(observation.gathering.conversions.wgs84CenterPoint.lon),
                          this.randomizeCoordinates(observation.gathering.conversions.wgs84CenterPoint.lat)],
                        radius: this.obsMapOptions.getOption("adminMode")?10:3000
                      },
                      properties: {}
                    }
                  ]
                },
                getFeatureStyle: ():PathOptions=>{
                  let opacity = Math.max(1 / ((new Date()).getFullYear() - parseInt(date.substring(0, 4)) + 2), 0.1);
                  return {
                    opacity: opacity,
                    fillOpacity: 0.9 * opacity,
                    color: "#f89525",
                    fillColor: "#f89525",
                    weight: 3
                  };
                },
                getPopup: ():string=>{
                  return name.charAt(0).toUpperCase() + name.substr(1) + " | " + date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4) + " | " + municipality + " <br> " + notes;
                }
              }
              mapData.push(o);
            }
          });
          return mapData;
      }

    private randomizeCoordinates(coord){
        let accuracy = 0.01;
        return coord + (Math.random() * (accuracy - (-accuracy)) ) + (-accuracy);
    }
}