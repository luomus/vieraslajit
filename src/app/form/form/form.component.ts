import {
  Component, OnDestroy, ElementRef, Inject, ViewEncapsulation,
  ViewChild, AfterViewInit, Output, NgZone, EventEmitter,
  ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { FormService } from '../../shared/service/form.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import LajiForm from 'laji-form/lib/laji-form';
import { FormApiClient } from '../../shared/api/FormApiClient';
import { TranslateService } from '@ngx-translate/core';
import { UserService, Role } from '../../shared/service/user.service';

@Component({
  selector: 'vrs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lajiform') formElem: ElementRef;
  @Output() onSubmit = new EventEmitter();
  @Output() onChange = new EventEmitter();

  private sub: Subscription;
  private subTrans: Subscription;
  private id: string;

  formData: any;
  lajiFormWrapper: any;
  reactElem: any;
  renderElem: any;
  lang: string;
  loggedIn = false;

  private _block = false;

  constructor(@Inject(ElementRef) elementRef: ElementRef,
    private formService: FormService, private apiClient: FormApiClient,
    private route: ActivatedRoute, private translate: TranslateService, private userService: UserService,
    private ngZone: NgZone, private cd: ChangeDetectorRef) {
      this.loggedIn = UserService.loggedIn();
  }

  ngAfterViewInit() {
    this.subTrans = this.translate.onLangChange.subscribe(() => this.onLangChange());
    this.sub = this.route.params.subscribe(params => {
      this.id = params['formId'];
      this.formService.getFormById(this.id, this.translate.currentLang).subscribe(data => {
        this.formData = data;
        console.log(data);
        this.ngZone.runOutsideAngular(() => {
          this.apiClient.lang = this.translate.currentLang;
          this.initFormData();
          this.initSchemaContext();
          this.apiClient.personToken = UserService.getToken();
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
            bottomOffset: 50
          });
        });
      });
    });
  }

  onLangChange() {
    this.lajiFormWrapper.setState({ lang: this.translate.currentLang });
    this.formService
      .getFormById(this.id, this.translate.currentLang)
      .subscribe(form => {
        form['formData'] = this.formData.formData;
        this.lang = this.translate.currentLang;
        this.formData = form;
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

  _onSettingsChange(settings: object) {
    console.log(settings);
  }

  _onChange(formData) {
    this.onChange.emit(formData);
  }

  submit() {
    if (this.lajiFormWrapper) {
      this.ngZone.runOutsideAngular(() => {
        this.lajiFormWrapper.submit();
      });
    }
  }

  _onSubmit(data) {
    this.ngZone.run(() => {
      this.onSubmit.emit({
        data: data,
        makeBlock: this.lajiFormWrapper.pushBlockingLoader,
        clearBlock: this.lajiFormWrapper.popBlockingLoader
      });
    });
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subTrans.unsubscribe();
  }

}
