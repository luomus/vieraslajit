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

@Injectable()

export class ObsMapData {

    private data:Array<any>;
    eventEmitter:EventEmitter<any> = new EventEmitter();

    constructor() {
        this.data = [];
    }

    getObservations():VrsObservation[] {
        return this.data;
    }

    addObservation(observation:VrsObservation) {
        this.data.push(observation);
        this.eventEmitter.emit(this.data);
    }

    addObservations(observations:Array<VrsObservation>) {
        observations.forEach(observation => {
            this.data.push(observation);
        })
        this.eventEmitter.emit(this.data);
    }

    pop() {
        return this.data.pop;
    }

    removeAll() {
        this.data = [];
        this.eventEmitter.emit(this.data);
    }
}
