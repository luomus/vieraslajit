import { ObsMapObservations } from "../data/ObsMapObservations";
import { ObsMapOptions, ObsMapOption } from "../data/ObsMapOptions";
import { ObservationService } from "../../../../../shared/service/observation.service";
import { Injectable } from "../../../../../../../node_modules/@angular/core";
import { AreaService } from "../../../../../shared/service/area.service";

/* Listens to updates in obsMapOptions
    and updates obsMapObservations accordingly */

@Injectable()

export class MapApiController {
    
    constructor(private obsMapOptions:ObsMapOptions, private obsMapObservations:ObsMapObservations, private observationService: ObservationService, private areaService: AreaService) {}

    initialize() {
        /* Update observation list whenever there's a change in options */
        this.obsMapOptions.eventEmitter.addListener("change", ()=>{
            this.updateObservationList();
        });
    }

    getAreas() {
        return this.areaService.getMunicipalities("municipality");
    }

    private updateObservationList() {
        this.getObservations().subscribe((r)=>{
            this.obsMapObservations.removeAll();
            let observations = [];
            r.results.forEach(element => {
                if(this.obsMapOptions.getOption("adminMode"!)) {
                    element.gathering.conversions.wgs84CenterPoint.lon = this.randomizeCoordinates(element.gathering.conversions.wgs84CenterPoint.lon);
                    element.gathering.conversions.wgs84CenterPoint.lat = this.randomizeCoordinates(element.gathering.conversions.wgs84CenterPoint.lat);
                }
                observations.push(element);
            });
            this.obsMapObservations.addObservations(observations);
        });
    }

    private getObservations() {
        let query = {
            invasive: true,
            page: 1,
            pageSize: 200
        };
        if(this.obsMapOptions.getOption("id")) query["taxonId"] = this.obsMapOptions.getOption("id")
        if(this.obsMapOptions.getOption("personToken")) query["observerPersonToken"] = this.obsMapOptions.getOption("personToken");
        if(this.obsMapOptions.getOption("municipality")) query["finnishMunicipalityId"] = this.obsMapOptions.getOption("municipality");
        console.log(query);

        return this.observationService.getObservations(query);
    }

    private randomizeCoordinates(coord){
        let accuracy = 0.01;
        return coord + (Math.random() * (accuracy - (-accuracy)) ) + (-accuracy);
    }
}