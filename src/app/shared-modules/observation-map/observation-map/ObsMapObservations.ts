import { EventEmitter } from "events";
import { Injectable } from "../../../../../node_modules/@angular/core";
import { ObservationMapModule } from "../observation-map.module";

@Injectable({
    providedIn: ObservationMapModule
})

export class ObsMapObservations {

    private observations:Array<any>;
    eventEmitter:EventEmitter = new EventEmitter();

    constructor() {
        this.observations = [];
    }

    getObservations() {
        return this.observations;
    }

    addObservation(observation:any) {
        this.observations.push(observation);
        this.eventEmitter.emit('change');
    }

    addObservations(observations:Array<any>) {
        observations.forEach(observation => {
            this.observations.push(observation);
        })
        this.eventEmitter.emit('change');
    }

    pop() {
        return this.observations.pop;
    }

    removeAll() {
        this.observations = [];
    }
}