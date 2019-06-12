import {
    Component, OnDestroy, ElementRef, Inject, ViewEncapsulation,
    ViewChild, AfterViewInit, Output, NgZone, EventEmitter,
    ChangeDetectorRef, ChangeDetectionStrategy, SimpleChanges, OnInit
} from '@angular/core';
import { FormService } from '../../shared/service/form.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import LajiForm from 'laji-form/lib/laji-form';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { TranslateService } from '@ngx-translate/core';
import { UserService, Role } from '../../shared/service/user.service';
import { DocumentService } from '../../shared/service/document.service';
import { AlertService } from '../../shared/service/alert.service';

@Component({
  selector: 'vrs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('lajiform') formElem: ElementRef;

  private sub: Subscription;
  private onLangChange: Subscription;
  private id: string;
  private documentId: string;
  private personToken: string;
  private edit = false;

  formData: any;
  documentData: any;
  lajiFormWrapper: any;
  lang: string;
  loggedIn = false;
  loginUrl: string;
  saving = false;

  constructor(@Inject(ElementRef) elementRef: ElementRef,
    private formService: FormService, private apiClient: FormApiClient, private docService: DocumentService,
    private route: ActivatedRoute, private router: Router, private translate: TranslateService,
    private userService: UserService, private ngZone: NgZone, private cd: ChangeDetectorRef,
    private el: ElementRef, private alertService: AlertService) {
    this.loggedIn = UserService.loggedIn();
  }

  ngOnInit() {
      this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
  }

  ngAfterViewInit() {
    this.onLangChange = this.translate.onLangChange.subscribe(() => this.langChange());
    if (this.loggedIn) {
      this.personToken = UserService.getToken();
      this.sub = this.route.params.subscribe(params => {
        this.id = params['formId'];
        this.documentId = params['documentId'];
        if (this.documentId) {
          this.initFormWithDocument();
        } else {
          this.initForm();
        }
      });
    }
  }

  initForm() {
    this.formService.getFormById(this.id, this.translate.currentLang).subscribe(data => {
      this.formData = data;
      this.setFormDescription();
      this.ngZone.runOutsideAngular(() => {
        this.apiClient.lang = this.translate.currentLang;
        this.initFormData();
        this.initSchemaContext();
        this.apiClient.personToken = this.personToken;
        this.lajiFormWrapper = new LajiForm({
          staticImgPath: '/static/lajiForm/',
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
    });
  }

  initFormWithDocument() {
    this.formService.loadFormWithDocument(this.id, this.translate.currentLang, this.documentId, this.personToken).subscribe(() => {
      this.edit = true;
      this.initForm();
    });
  }

  langChange() {
    this.lajiFormWrapper.setState({ lang: this.translate.currentLang });
    this.formService
      .getFormById(this.id, this.translate.currentLang)
      .subscribe(form => {
        form['formData'] = this.formData.formData;
        this.lang = this.translate.currentLang;
        this.formData = form;
        this.setFormDescription();
        this.lajiFormWrapper.setState({
          schema: this.formData.schema,
          uiSchema: this.formData.uiSchema,
          formData: this.formData.formData,
          validators: this.formData.validators,
          warnings: this.formData.warnings
        });
      });
  }
  private initSchemaContext() {
    this.formData.uiSchemaContext = {};
    this.formData.uiSchemaContext.formID = this.id;
    this.formData.uiSchemaContext['creator'] = UserService.getUserId();
    this.formData.uiSchemaContext.isAdmin = UserService.hasRole(Role.CMS_ADMIN);
  }

  private initFormData() {
    if (!this.formData.formData) {
      this.formData.formData = { gatheringEvent: { leg: [UserService.getUserId()] } };
    }
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
      this.formData.formData['formID'] = this.id;
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
      const doc$ = this.edit ?
        this.docService.updateDocument(this.documentId, this.formData.formData, this.personToken) :
        this.docService.createDocument(this.personToken, this.formData.formData);
      doc$.subscribe(
        (result) => {
          this.alertService.sendAlert(true);
          this.router.navigate(['ilmoita'], {
              queryParams: {
                user: true
              }
          });
        },
        (error) => {
          console.log('Error');
          console.log(error);
          alert(error);
          this.saving = false;
        }
      );
    });
  }

  ngOnDestroy() {
    this.onLangChange ? this.onLangChange.unsubscribe() : null;
    this.sub ? this.sub.unsubscribe() : null;
  }

}
