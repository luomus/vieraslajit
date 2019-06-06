import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ObservationService } from "app/shared/service/observation.service";
import { map } from "rxjs/operators";
import { UserService } from "app/shared/service/user.service";

@Component({
    selector: 'vrs-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    columns = [];
    observations$;

    loggedIn = false;
    loginUrl = '';

    constructor(private translate: TranslateService,
                private observationService: ObservationService) {
        this.columns = [
            { prop: 'unit.linkings.taxon.vernacularName.fi', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'gathering.interpretations.municipalityDisplayname', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'gathering.displayDateTime', name: this.translate.instant('observation.datetime'), draggable: false, resizeable: false }
          ];
    }

    ngOnInit() {
        this.loggedIn = UserService.loggedIn()
        this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname))
        
        const query = {
            observerPersonToken: UserService.getToken(),
            invasive: true,
            page: 1,
            pageSize: 10000,
            selected: [
                "unit.linkings.taxon.scientificName",
                "unit.linkings.taxon.vernacularName",
                "unit.linkings.taxon.qname",
                "unit.linkings.taxon.id",
                "gathering.conversions.wgs84CenterPoint.lat",
                "gathering.conversions.wgs84CenterPoint.lon",
                "gathering.displayDateTime",
                "gathering.interpretations.municipalityDisplayname",
                "gathering.team",
                "unit.quality",
                "gathering.gatheringId"
            ]
        }
        this.observations$ = this.observationService.getObservations(query)
        .pipe(
            map((r) => {
                console.log(r)
                return r.results
            })
        )
    }
}