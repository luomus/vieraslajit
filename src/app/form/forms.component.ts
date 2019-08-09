import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, TemplateRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "app/shared/service/user.service";
import { FormsFacade } from "./forms.facade";

@Component({
    selector: 'vrs-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    columns = [];
    documents$;

    @ViewChild('modifiedCell') modifiedCell: TemplateRef<any>;
    @ViewChild('editCell') editCell: TemplateRef<any>;

    loggedIn = false;
    loginUrl = '';

    constructor(private translate: TranslateService,
                private facade: FormsFacade) {}

    ngOnInit() {
        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('taxon.name'), draggable: false, resizeable: false },
            { prop: 'municipality', name: this.translate.instant('document.location'), draggable: false, resizeable: false },
            { prop: 'dateBegin', name: this.translate.instant('gathering.eventDate.begin'), draggable: false, resizeable: false },
            { prop: 'dateEdited', name: this.translate.instant('document.modifiedDate'), draggable: false, resizeable: false, cellTemplate: this.modifiedCell},
            { name: '', draggable: false, resizeable: false, cellTemplate: this.editCell}
          ];
        this.loggedIn = UserService.loggedIn()
        this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname))

        this.documents$ = this.facade.documents$;
        this.facade.loadDocuments();
    }

    getEmptyMessage() {
        return this.translate.instant('datatable.observations.empty')
    }
}
