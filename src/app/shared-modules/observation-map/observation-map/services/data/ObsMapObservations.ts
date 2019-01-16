import { Injectable, EventEmitter } from "../../../../../../../node_modules/@angular/core";
import { ObservationMapModule } from "../../../observation-map.module";

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

export class ObsMapObservations {

    private observations:Array<any>;
    eventEmitter:EventEmitter<any> = new EventEmitter();

    constructor() {
        this.observations = [];
    }

    getObservations():VrsObservation[] {
        return this.observations;
    }

    addObservation(observation:VrsObservation) {
        this.observations.push(observation);
        this.eventEmitter.emit(this.observations);
    }

    addObservations(observations:Array<VrsObservation>) {
        observations.forEach(observation => {
            this.observations.push(observation);
        })
        this.eventEmitter.emit(this.observations);
    }

    pop() {
        return this.observations.pop;
    }

    removeAll() {
        this.observations = [];
        this.eventEmitter.emit(this.observations);
    }
}
