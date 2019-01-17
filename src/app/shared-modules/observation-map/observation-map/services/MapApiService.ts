import { ObsMapData } from "./data/ObsMapData";
import { ObsMapOptions, ObsMapOption } from "./data/ObsMapOptions";
import { ObservationService } from "../../../../shared/service/observation.service";
import { Injectable } from "@angular/core";
import { AreaService } from "../../../../shared/service/area.service";
import { YkjService } from "../import-from-laji-front/ykj.service";
import { environment } from "../../../../../environments/environment";

/* Listens to updates in obsMapOptions
    and updates obsMapObservations accordingly */

@Injectable()

export class MapApiService {

    constructor(private obsMapOptions:ObsMapOptions, private obsMapData:ObsMapData,
                private observationService: ObservationService,
                private areaService: AreaService,
                private ykjService: YkjService) {}

    initialize() {
        /* Update observation list whenever there's a change in options */
        this.obsMapOptions.eventEmitter.addListener("change", ()=>{
            if (this.obsMapOptions.getOption('aggregate')) {
                this.updateAggregate();
            } else {
                this.updateObservationList();
            }
        });
    }

    getAreas() {
        return this.areaService.getMunicipalities("municipality");
    }

    private updateAggregate() {
        this.ykjService.getGeoJson({
            collectionId: [environment.vierasCollection],
        }).subscribe((res) => {
            this.obsMapData.setData(res, 'geojson');
            console.log(res);
        })
    }

    private updateObservationList() {
        this.getObservations().subscribe((r)=>{
            this.obsMapData.removeData();
            let observations = [];
            r.results.forEach(element => {
                observations.push(element);
            });
            this.obsMapData.setData(observations, 'observations');
            this.obsMapOptions.loadState=false;
        });
    }

    private getObservations() {
        let query = {
            invasive: true,
            page: 1,
            pageSize: 20000,
            selected: [
                "unit.taxonVerbatim", "unit.linkings.taxon.scientificName",
                "unit.linkings.taxon.qname", "gathering.conversions.wgs84CenterPoint.lat",
                "gathering.conversions.wgs84CenterPoint.lon", "gathering.displayDateTime",
                "gathering.interpretations.municipalityDisplayname", "gathering.team",
                "unit.quality"
            ]
        };
        if(this.obsMapOptions.getOption("id")) query["taxonId"] = this.obsMapOptions.getOption("id")
        if(this.obsMapOptions.getOption("personToken")) query["observerPersonToken"] = this.obsMapOptions.getOption("personToken");
        if(this.obsMapOptions.getOption("municipality")) query["finnishMunicipalityId"] = this.obsMapOptions.getOption("municipality");

        this.obsMapOptions.loadState = true;
        this.obsMapData.removeData();
        return this.observationService.getObservations(query);
    }
}
