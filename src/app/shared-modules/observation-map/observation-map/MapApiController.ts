import { ObsMapObservations } from "./ObsMapObservations";
import { ObsMapOptions, ObsMapOption } from "./ObsMapOptions";
import { ObservationService } from "../../../shared/service/observation.service";
import { Injectable } from "../../../../../node_modules/@angular/core";
import { ObservationMapModule } from "../observation-map.module";

/* Listens to updates in obsMapOptions
    and updates obsMapObservations accordingly */

@Injectable({
    providedIn: ObservationMapModule
})

export class MapApiController {
    
    constructor(private obsMapOptions:ObsMapOptions, private obsMapObservations:ObsMapObservations, private observationService: ObservationService) {}

    initialize() {
        /* Update observation list whenever there's a change in options */
        this.obsMapOptions.eventEmitter.addListener("change", ()=>{
            this.updateObservationList();
        });
    }

    private updateObservationList() {
        this.getObservations().subscribe((r)=>{
            this.obsMapObservations.removeAll();
            let observations = [];
            r.results.forEach(element => {
                observations.push(element);
            });
            this.obsMapObservations.addObservations(observations);
        });
    }

    getObservations() {
        // TODO
        return this.observationService.getObservations({
            invasive: true,
            page: 1,
            pageSize: 200,
            // observerPersonToken: "",
            // taxonId: this.obsMapOptions.getOption(<ObsMapOption>"id")?this.obsMapOptions.getOption(<ObsMapOption>"id"):null
        });
    }
}