import {
    Component, OnDestroy, ElementRef, Inject, ViewEncapsulation,
    ViewChild, AfterViewInit, Output, NgZone, EventEmitter,
    ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, OnInit, Renderer2
} from '@angular/core';
import { FormService } from '../../shared/service/form.service';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import LajiForm from 'laji-form/lib/laji-form';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { TranslateService } from '@ngx-translate/core';
import { UserService, Role } from '../../shared/service/user.service';
import { DocumentService } from '../../shared/service/document.service';
import { FormFacade } from './form.facade';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'vrs-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements AfterViewInit, OnDestroy, OnInit {
    unsubscribe$ = new Subject<void>()

    @ViewChild('lajiform') formElem: ElementRef;
    @ViewChild('formName') formName: ElementRef;
    @ViewChild('formDesc') formDesc: ElementRef;

    private id: string;
    private documentId: string;
    private personToken: string;

    lajiFormWrapper: LajiForm;
    loggedIn = false;
    loginUrl: string;
    saving = false;

    constructor(@Inject(ElementRef) elementRef: ElementRef,
    private facade: FormFacade,
    private renderer: Renderer2,
    private apiClient: FormApiClient,
    private docService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private ngZone: NgZone) {
        this.loggedIn = UserService.loggedIn();
    }

    ngOnInit() {
        this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
    }

    ngAfterViewInit() {
        if (!this.loggedIn) return

        this.personToken = UserService.getToken();

        this.facade.data$.pipe(takeUntil(this.unsubscribe$), filter(a => a)).subscribe(this.initForm.bind(this));
        this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            this.id = params['formId'];
            this.documentId = params['documentId'];
            this.facade.loadData(this.id, this.documentId)
        });

        // TODO: not working rn
        this.translate.onLangChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.facade.loadData(this.id, this.documentId));
    }

    initForm(data) {
        this.renderer.setProperty(this.formName.nativeElement, 'innerHTML', data.title)
        this.renderer.setProperty(this.formDesc.nativeElement, 'innerHTML', data.description)
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
        this.lajiFormWrapper.destroy();
    }
}
