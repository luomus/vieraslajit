import {
    Component, OnDestroy, ElementRef, Inject, ViewEncapsulation,
    ViewChild, AfterViewInit, Output, NgZone, EventEmitter,
    ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, OnInit, Renderer2
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import LajiForm from 'laji-form';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { TranslateService } from '@ngx-translate/core';
import { UserService, Role } from '../../shared/service/user.service';
import { DocumentService } from '../../shared/service/document.service';
import { FormFacade } from './form.facade';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
    selector: 'vrs-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FormFacade]
})
export class FormComponent implements AfterViewInit, OnDestroy, OnInit {
    unsubscribe$ = new Subject<void>()

    @ViewChild('lajiform', { static: false }) formElem: ElementRef;
    @ViewChild('formName', { static: false }) formName: ElementRef;
    @ViewChild('formDesc', { static: false }) formDesc: ElementRef;

    private id: string;
    private documentId: string;
    private personToken: string;

    lajiFormWrapper: LajiForm;
    loggedIn = false;
    loginUrl: string;
    saving = false;

    public prepopulatedName: string | undefined;

    constructor(@Inject(ElementRef) elementRef: ElementRef,
    private facade: FormFacade,
    private renderer: Renderer2,
    private apiClient: FormApiClient,
    private docService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private title: Title,
    private meta: Meta,
    private ngZone: NgZone) {
        this.loggedIn = UserService.loggedIn();
        const nav = this.router.getCurrentNavigation()
        if (nav.extras.state && nav.extras.state.name) {
            this.prepopulatedName = nav.extras.state.name
        }
    }

    ngOnInit() {
        const title = this.translate.instant('title.form') + this.translate.instant('title.post')
        this.title.setTitle(title)
        this.meta.updateTag({
            property: "og:title",
            content: title
        });
        this.meta.updateTag({
            property: "og:description",
            content: this.translate.instant('og.form.description')
        });
        this.meta.updateTag({
            property: "description",
            content: this.translate.instant('og.form.description')
        });
        this.meta.updateTag({
            property: "og:image",
            content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
        });

        this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
    }

    ngAfterViewInit() {
        if (!this.loggedIn) return

        this.personToken = UserService.getToken();

        this.facade.data$.pipe(takeUntil(this.unsubscribe$), filter(a => a)).subscribe(this.initForm.bind(this));
        this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            this.id = params['formId'];
            const id2: string = params['documentId']
            if (id2 && id2.substr(0, 2) === 'JX') {
                this.documentId = id2
                this.facade.loadDataWithDocument(this.id, this.documentId)
            } else if (id2 && id2.substr(0, 2) === 'MX') {
                this.facade.loadDataWithTaxon(this.id, id2)
            } else {
                this.facade.loadData(this.id)
            }
        });

        // TODO: not working rn
        // this.translate.onLangChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.facade.loadData(this.id, this.documentId));
    }

    initForm(data) {
        this.renderer.setProperty(this.formName.nativeElement, 'innerHTML', data.title)
        this.ngZone.runOutsideAngular(() => {
            data.uiSchemaContext = {};
            data.uiSchemaContext.formID = this.id;
            data.uiSchemaContext['creator'] = UserService.getUserId();
            data.uiSchemaContext.isAdmin = UserService.hasRole(Role.CMS_ADMIN);
            this.lajiFormWrapper = new LajiForm({
                staticImgPath: '/assets/images/laji-form',
                rootElem: this.formElem.nativeElement,
                schema: data.schema,
                uiSchema: data.uiSchema,
                uiSchemaContext: data.uiSchemaContext,
                formData: data.formData,
                validators: data.validators,
                warnings: data.warnings,
                onSubmit: this.onSubmit.bind(this),
                //onChange: this._onChange.bind(this),
                //onSettingsChange: this._onSettingsChange.bind(this),
                settings: undefined,
                apiClient: this.apiClient,
                lang: this.translate.currentLang,
                renderSubmit: false,
                topOffset: 50,
                bottomOffset: 50,
                showShortcutButton: false
            });
        });
    }

    submit() {
        if (this.lajiFormWrapper) {
            this.ngZone.runOutsideAngular(() => {
                this.lajiFormWrapper.submit();
            });
        }
    }

    onSubmit(data) {
        if (this.saving) {
            return;
        }
        this.saving = true;
        this.ngZone.run(() => {
            const formData = {
                ...data.formData,
                formID: this.id
            };
            const doc$ = this.documentId ?
            this.docService.updateDocument(this.documentId, formData, this.personToken) :
            this.docService.createDocument(this.personToken, formData);
            doc$.subscribe(
                (result) => {
                    this.router.navigate(['ilmoita'], {
                        queryParams: {
                            user: true
                        }
                    });
                },
                (error) => {
                    console.log('Error: ', error);
                    alert(error);
                    this.saving = false;
                }
            );
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
        if (this.lajiFormWrapper) this.lajiFormWrapper.destroy();
    }
}
