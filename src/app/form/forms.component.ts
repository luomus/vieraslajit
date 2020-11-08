import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, TemplateRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "app/shared/service/user.service";
import { FormsFacade } from "./forms.facade";
import { Title, Meta } from "@angular/platform-browser";
import { environment } from "environments/environment";

@Component({
    selector: 'vrs-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {
    columns = [];
    documents$;

    @ViewChild('modifiedCell', { static: true }) modifiedCell: TemplateRef<any>;
    @ViewChild('editCell', { static: true }) editCell: TemplateRef<any>;

    loggedIn = false;
    loginUrl = '';

    constructor(private translate: TranslateService,
                private title: Title,
                private meta: Meta,
                private facade: FormsFacade) {}

    ngOnInit() {
        const title = this.translate.instant('title.forms') + this.translate.instant('title.post');
        this.title.setTitle(title)
        this.meta.updateTag({
            name: "og:title",
            content: title
        });
        this.meta.updateTag({
            name: "og:description",
            content: this.translate.instant('og.forms.description')
        });
        this.meta.updateTag({
            name: "og:image",
            content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
        });

        this.columns = [
            { prop: 'vernacularName', name: this.translate.instant('forms.list.vernacularName'), draggable: false, resizeable: false },
            { prop: 'municipality', name: this.translate.instant('forms.list.municipality'), draggable: false, resizeable: false },
            { prop: 'dateBegin', name: this.translate.instant('forms.list.dateTime'), draggable: false, resizeable: false },
            { prop: 'dateEdited', name: this.translate.instant('forms.list.edited'), draggable: false, resizeable: false, cellTemplate: this.modifiedCell},
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
