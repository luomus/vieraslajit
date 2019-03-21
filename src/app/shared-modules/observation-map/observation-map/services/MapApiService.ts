import { ObsMapData } from "./data/ObsMapData";
import { ObsMapOptions, ObsMapOption } from "./data/ObsMapOptions";
import { ObservationService } from "../../../../shared/service/observation.service";
import { Injectable } from "@angular/core";
import { AreaService } from "../../../../shared/service/area.service";
import { YkjService } from "../import-from-laji-front/ykj.service";
import { environment } from "../../../../../environments/environment";
import { ApiService, LajiApi } from "../../../../shared/api/api.service";
import { WarehouseQueryInterface } from "../import-from-laji-front/WarehouseQueryInterface";

/* Listens to updates in obsMapOptions
    and updates obsMapObservations accordingly */

@Injectable()

export class MapApiService {

    constructor(private obsMapOptions:ObsMapOptions, private obsMapData:ObsMapData,
                private observationService: ObservationService,
                private areaService: AreaService,
                private ykjService: YkjService,
                private apiService: ApiService) {}

    initialize() {
        /* Update observation list whenever there's a change in options */
        this.obsMapOptions.eventEmitter.addListener("change", ()=>{
            this.getObservationCount().subscribe(res => {
                this.obsMapData.observationCount = res.total
                if (res.total > 2000) {
                    this.updateAggregate();
                } else {
                    this.updateObservationList();
                }
            });
        });
    }

    getAreas() {
        return this.areaService.getMunicipalities("municipality");
    }

    private getWarehouseQuery() {
        const query: WarehouseQueryInterface = {
            invasive: true
        }
        if (this.obsMapOptions.getOption("id")) query["taxonId"] = this.obsMapOptions.getOption("id");
        if (this.obsMapOptions.getOption("municipality")) query["area"] = this.obsMapOptions.getOption("municipality");
        if (this.obsMapOptions.getOption("personToken")) query["observerPersonToken"] = this.obsMapOptions.getOption("personToken");
        query["administrativeStatusId"] = [];
        if (this.obsMapOptions.getOption("fiList")) query["administrativeStatusId"].push('MX.nationallySignificantInvasiveSpecies');
        if (this.obsMapOptions.getOption("euList")) query["administrativeStatusId"].push('MX.euInvasiveSpeciesList');
        if (this.obsMapOptions.getOption("plantPest")) query["administrativeStatusId"].push('MX.quarantinePlantPest');
        return query;
    }

    private updateAggregate() {
        this.ykjService.getGeoJson({
            invasive: true,
            ...this.getWarehouseQuery()
        }, "10kmCenter").subscribe((res) => {
            this.obsMapData.setData(res, 'geojson');
            this.obsMapOptions.loadState=false;
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
            pageSize: 10000,
            selected: [
                "unit.taxonVerbatim", "unit.linkings.taxon.scientificName", "unit.linkings.taxon.qname",
                "unit.linkings.taxon.id", "gathering.conversions.wgs84CenterPoint.lat",
                "gathering.conversions.wgs84CenterPoint.lon", "gathering.displayDateTime",
                "gathering.interpretations.municipalityDisplayname", "gathering.team",
                "unit.quality", "gathering.gatheringId"
            ]
        };
        if(this.obsMapOptions.getOption("id")) query["taxonId"] = this.obsMapOptions.getOption("id")
        if(this.obsMapOptions.getOption("personToken")) query["observerPersonToken"] = this.obsMapOptions.getOption("personToken");
        if(this.obsMapOptions.getOption("municipality")) query["finnishMunicipalityId"] = this.obsMapOptions.getOption("municipality");
        query["administrativeStatusId"] = [];
        if (this.obsMapOptions.getOption("fiList")) query["administrativeStatusId"].push('MX.nationallySignificantInvasiveSpecies');
        if (this.obsMapOptions.getOption("euList")) query["administrativeStatusId"].push('MX.euInvasiveSpeciesList');
        if (this.obsMapOptions.getOption("plantPest")) query["administrativeStatusId"].push('MX.quarantinePlantPest');

        this.obsMapOptions.loadState = true;
        this.obsMapData.removeData();
        return this.observationService.getObservations(query);
    }

    private getObservationCount() {
        const query: WarehouseQueryInterface = {...this.getWarehouseQuery()}
        return this.apiService.warehouseQueryCountGet(LajiApi.Endpoints.warehousequerycount, "count", query)
    }
}
