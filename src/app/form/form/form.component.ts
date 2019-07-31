import {
    Component, OnDestroy, ElementRef, Inject, ViewEncapsulation,
    ViewChild, AfterViewInit, Output, NgZone, EventEmitter,
    ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, OnInit
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

  private id: string;
  private documentId: string;
  private personToken: string;
  private edit = false;

  formData: any;
  documentData: any;
  lajiFormWrapper: any;
  loggedIn = false;
  loginUrl: string;
  saving = false;

  constructor(@Inject(ElementRef) elementRef: ElementRef,
              private facade: FormFacade,
              private formService: FormService,
              private apiClient: FormApiClient,
              private docService: DocumentService,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              private userService: UserService,
              private ngZone: NgZone,
              private cd: ChangeDetectorRef,
              private el: ElementRef) {
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
      if (this.documentId) this.edit = true;
    });

    // TODO: not working rn
    this.translate.onLangChange.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.facade.loadData(this.id, this.documentId));
  }

  initForm(data) {
      this.formData = data;
      this.setFormDescription();
      this.ngZone.runOutsideAngular(() => {
          this.apiClient.lang = this.translate.currentLang;
          this.initSchemaContext();
          this.apiClient.personToken = this.personToken;
          this.lajiFormWrapper = new LajiForm({
            staticImgPath: '/assets/images/laji-form',
            rootElem: this.formElem.nativeElement,
            schema: this.formData.schema,
            uiSchema: this.formData.uiSchema,
            uiSchemaContext: this.formData.uiSchemaContext,
            formData: this.formData.formData,
            validators: this.formData.validators,
            warnings: this.formData.warnings,
            onSubmit: this._onSubmit.bind(this),
            onChange: this._onChange.bind(this),
            onSettingsChange: this._onSettingsChange.bind(this),
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

  private initSchemaContext() {
    this.formData.uiSchemaContext = {};
    this.formData.uiSchemaContext.formID = this.id;
    this.formData.uiSchemaContext['creator'] = UserService.getUserId();
    this.formData.uiSchemaContext.isAdmin = UserService.hasRole(Role.CMS_ADMIN);
  }

  private setFormDescription() {
    document.getElementById('formName').textContent = this.formData.title;
    document.getElementById('formDesc').innerHTML = this.formData.description;
  }

  _onSettingsChange(settings: object) {
    console.log(settings);
  }

  _onChange(formData) {
    this.formData.formData = formData;
  }

  submit() {
    if (this.lajiFormWrapper) {
      this.ngZone.runOutsideAngular(() => {
        this.lajiFormWrapper.submit();
      });
    }
  }

  _onSubmit(data) {
    if (this.saving) {
        return;
    }
    this.saving = true;
    this.ngZone.run(() => {
      const formData = {
          ...data.formData,
          formID: this.id
      };
      const doc$ = this.edit ?
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
  }
}
