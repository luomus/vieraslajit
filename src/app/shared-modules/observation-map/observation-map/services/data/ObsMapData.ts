import { Injectable, EventEmitter } from "@angular/core";

export interface VrsObservation {
    document?:any;
    gathering?: {
        conversions?:{wgs84CenterPoint: {lat:number, lon:number}},
        displayDateTime?:string;
        gatheringId?:string;
        interpretations?:{
            coordinateAccuracy?:number;
            municipalityDisplayname?:string;
            sourceOfCoordinates?:string;
        };
        unit?: Array<any>;
    };
    unit?: {
        abundanceString?:string,
        linkings?:any,
        recordBasis?:string,
        taxonVerbatim?:string,
        unitId?:string,
        notes?:string,
        quality?:any;
    };
}

type ObsMapDataType = 'observations' | 'geojson'

export interface ObsMapDataMeta {
    type: ObsMapDataType,
    payload: any
}

@Injectable()

export class ObsMapData {

    observationCount: number;
    private data: any;
    type: ObsMapDataType;
    eventEmitter:EventEmitter<ObsMapDataMeta> = new EventEmitter();

    constructor() {}

    setData(data, type: ObsMapDataType) {
        this.data = data;
        this.type = type
        this.eventEmitter.emit(this.getData())
    }

    getData():ObsMapDataMeta {
        return {
            type: this.type,
            payload: this.data
        };
    }

    removeData() {
        this.data = null;
        this.type = null;
        this.eventEmitter.emit(this.getData());
    }
}
