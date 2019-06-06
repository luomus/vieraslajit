import { Component, OnInit, ChangeDetectorRef, NgZone } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ObservationService } from "app/shared/service/observation.service";
import { map } from "rxjs/operators";
import { UserService } from "app/shared/service/user.service";
import { DocumentService } from "app/shared/service/document.service";
import {TimeAgoPipe} from "angular2-moment"
import { environment } from "environments/environment.prod";

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
                private observationService: ObservationService,
                private documentService: DocumentService,
                private cdr: ChangeDetectorRef,
                private zone: NgZone) {
        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'municipality', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'dateBegin', name: this.translate.instant('gathering.eventDate.begin'), draggable: false, resizeable: false },
            { prop: 'dateEdited', name: this.translate.instant('document.modifiedDate'), draggable: false, resizeable: false, pipe: new TimeAgoPipe(this.cdr, this.zone) }
          ];
    }

    ngOnInit() {
        this.loggedIn = UserService.loggedIn()
        this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname))
        
        const query = {
            collectionID: 'HR.3051',
            selectedFields: [
                "dateEdited",
                "gatherings.municipality",
                "gatherings.dateBegin",
                "gatherings.units.identifications.taxon",
            ],
            pageSize: 10
        }
        this.observations$ = this.documentService.getDocuments(UserService.getToken(), query).pipe(
            map((res) => {
                const output = []
                for (const r of res.results) {
                    const o = {}
                    o['dateEdited'] = r.dateEdited
                    o['municipality'] = r.gatherings[0].municipality
                    o['dateBegin'] = r.gatherings[0].dateBegin
                    o['vernacularName'] = r.gatherings[0].units[0].identifications[0].taxon
                    output.push(o);
                }
                return output;
            })
        );
    }
}